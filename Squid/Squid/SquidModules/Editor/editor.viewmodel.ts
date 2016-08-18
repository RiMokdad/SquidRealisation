import { Component } from "@angular/core";
import { BlockInfos} from "./../Util/BlockInfos";
import { Decoder } from "./../Util/Decoder";
import { ToolboxManager } from "./../Toolbox/toolboxManager";
import { Workspace } from "./../BlocklyWrapper/Workspace";
import { Requests } from "../Request/server_request"
import { ServerNotifications } from "../SignalR/signalr_methods";
import { Messages } from "./../Util/Messages";
import { EventHandler } from "./../Util/EventHandler";

declare var Ac: any;

export enum RefreshState {
    UP_TO_DATE,
    PENDING,
    OUT_DATED
}

@Component({
    selector: "editor",
    templateUrl: "SquidModules/Editor/editor.view.html"
})
export class EditorComponent {

    decoder: Decoder;
    workspace: Workspace;
    tagsSearch: string;
    placeholderTags: string;
    toolboxManager: ToolboxManager;
    refreshState: RefreshState;
    serverNotifications: ServerNotifications;

    //autocomplete object
    ac;

    constructor() {
        EventHandler.SetEditorComponent(this);
        this.serverNotifications = new ServerNotifications();
        this.toolboxManager = new ToolboxManager();
        this.decoder = new Decoder();
        this.placeholderTags = "tags1, tags2,...";
        this.tagsSearch = "";
        this.refreshState = RefreshState.OUT_DATED;

    }

    /**
     * Loaded after the whole page has been loaded
     */
    OnLoad() {
        this.workspace = Workspace.Inject("blocklyDiv", false, this.toolboxManager.GetToolbox());
        this.workspace.BindDecoder(this.decoder);
        this.decoder.Id = this.GetBlockIdInUrl();

        if (this.decoder.Id) {
            this.LoadModeBloc();
        } else {
            this.LoadModeFromScratch();
        }

        this.ac = new Ac();
        this.pollRefresh();
    }

    private LoadModeBloc() {
        this.RestoreBlock(this.decoder.Id);
    }

    private LoadModeFromScratch() {
        this.workspace.Initialize();
    }

    private pollRefresh() {
        let time = 1000;
        switch (this.refreshState) {
        case RefreshState.OUT_DATED:
            this.Refresh();
            break;
        case RefreshState.PENDING:
            time = 4000;
            break;
        case RefreshState.UP_TO_DATE:
        default:
            break;
        }
        const func = () => { this.pollRefresh(); };
        window.setTimeout(func, time);
    }

    /**
     * Clear
     */
    Clear() {
        this.workspace.Clear();
        this.workspace.Initialize();
        this.SetUrl();
    }

    /**
     * Supress on the server the decoder currently in the editor if it has already been saved once.
     */
    Supress() {
        const deleteConfirmed = () => {
            this.decoder = new Decoder();
            this.workspace.BindDecoder(this.decoder);
            Messages.Notify("Décodeur supprimé");
        };

        const deletion = () => {
            Requests.DeleteDecoder(this.decoder, deleteConfirmed);
        };

        Requests.FindUsages(this.decoder.Id, deletion);
        this.Clear();
    }

    /**
     * Refresh the toolbox, called automatically but may be forced by the user
     */
    Refresh() {
        this.workspace.UpdateToolbox(this.toolboxManager.GetToolbox(true));
        const success = (list) => {
            // Update toolbox
            this.toolboxManager.UpdateBlocksInfos(list, true);
            this.workspace.UpdateToolbox(this.toolboxManager.GetToolbox());
            this.refreshState = RefreshState.UP_TO_DATE;
            //create or update autocompletion
            this.ac.SetTagsAutoComplete(this.toolboxManager.GetTagsList.bind(this.toolboxManager));
            this.ac.SetCategoryAutoComplete(this.toolboxManager.GetCategoryList.bind(this.toolboxManager));
            this.ac.SetSearchBarAutoComplete(this.toolboxManager.GetTagsList.bind(this.toolboxManager));

            Messages.Update();
        };

        const fail = () => {
            this.refreshState = RefreshState.OUT_DATED;
        };
        this.refreshState = RefreshState.PENDING;
        Requests.GetCategories(success, fail);
    }

    /**
     * Update the toolbox with results of the research. You can search multiple tags
     */
    SearchTag() {
        this.toolboxManager.UpdateResearch(this.tagsSearch);
        this.workspace.UpdateToolbox(this.toolboxManager.GetToolbox());
    }


    /**
     * Open a new tab in the from sratch mode
     */
    OpenTab();
    /**
     * Open a new tab with the bloc named after the string given in parameter in the editor
     * @param name
     */
    OpenTab(name: string);
    /**
     * Open a new tab with the bloc with the given id in the editor
     * @param id
     */
    OpenTab(id: number);
    OpenTab(param1?: any) {
        if (param1) {
            let decoder = null;
            if (typeof (param1) == "string") {
                decoder = this.toolboxManager.GetDecoderByName(param1);
            } else if (typeof (param1) == "number") {
                decoder = this.toolboxManager.GetDecoderById(param1);
            }

            if (decoder) {
                window.open(EditorComponent.CreateIdUrl(decoder.id));
                return;
            } else {
                Messages.Alert("Impossible de charger ce décodeur");
            }
        }

        window.open(EditorComponent.GetBaseUrl());
    }


    /**
     * Binding for save
     */
    Save() {
        //TODO insert local save
        this.SaveDecoderToServer();

    }

    /**
     * Saves the decoder to the server
     */
    private SaveDecoderToServer() {
        if (this.workspace.IsADecoder()) {
            this.workspace.CompleteDecoder(this.decoder);
            this.decoder.Tags = this.decoder.Tags.replace(/\s/g, "");
            Requests.SaveDecoder(this.decoder);
            this.SetUrl();
        } else {
            alert("Un des problèmes suivants se pose:" +
                "\n - Vous avez plus d'un bloc" +
                "\n - Le bloc n'est pas un bloc décodeur de base" +
                "\n - Vous n'avez rien à sauvegarder");
        }
    }

    /**
     * Restore the block with the given id
     * @param id
     */
    RestoreBlock(id: number) {
        const callback = (decoder) => {
            decoder.Id = id;
            this.workspace.RestoreBlocks(decoder);
            Messages.Alert(`Le bloc ${decoder.Name} a été rechargé.`);
            this.workspace.CompleteDecoder(decoder);
        };
      
        Requests.GetDecoderDef(id, this.decoder, callback);
        this.SetUrl();
        
        return null;
    }

    /* ============ URL OPERATIONS ============== */

    /**
     * Gives the base url of this page.
     */
    static GetBaseUrl(): string {
        return "index.html";
    }

    /**
     * Create the good url for loading a decoder with the given id 
     * @param id
     */
    static CreateIdUrl(id: number): string {
        return EditorComponent.GetBaseUrl() + "#" + id;
    }
    /**
     * Get the id after the hash in the url
     * @return return the id as a number, or null if there is no id
     */
    private GetBlockIdInUrl(): number {
        return parseInt(window.location.hash.substring(1)) || null;
    }

    /**
     * Set the hash of this page to the decoder id
     */
    private SetUrl() {
        window.location.hash = this.decoder.Id ? `${this.decoder.Id}` : "";
    }
}

/**
 * Things to do with the workspace on load of the window
 * @returns {} 
 */
window.onload = () => {
    EventHandler.OnLoad();
};