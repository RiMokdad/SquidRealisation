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
        const id = this.GetBlockIdInUrl();
        if (id != null) {
            this.RestoreBlock(id);
        } else {
            this.workspace.Initialize();
        }
        this.ac = new Ac();
        this.pollRefresh();
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

    Save() {
        //TODO insert local save
        this.SaveDecoderToServer();
        
    }

    Supress() {
        //TODO insert code to supress a decoder onto the server 
        const deleteConfirmed = () => {
            this.decoder = new Decoder();
            this.workspace.BindDecoder(this.decoder);
            Messages.Alert("Décodeur supprimé");
        };

        const deletion = () => {
            Requests.DeleteDecoder(this.decoder, deleteConfirmed);
        };

        Requests.FindUsages(this.decoder.Id, deletion);
        this.Clear();
    }

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
        };

        const fail = () => {
            this.refreshState = RefreshState.OUT_DATED;
        };
        this.refreshState = RefreshState.PENDING;
        Requests.GetCategories(success, fail);
    }

    SearchTag() {
        this.toolboxManager.UpdateResearch(this.tagsSearch);
        this.workspace.UpdateToolbox(this.toolboxManager.GetToolbox());
    }

    OpenTab();
    OpenTab(name: string);
    OpenTab(id: number);
    OpenTab(param1?: any) {
        if (param1) {
            if (typeof (param1) == "string") {
                this.RestoreBlock(param1);
            }
            else if (typeof (param1) == "number") {
                window.open(this.GetBaseUrl() + "#" + param1);
            }
        }
        else {
            window.open(this.GetBaseUrl());
        }
    }

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

    RestoreBlock(id: number) {
        const callback = () => {
            this.decoder.Id = id;
            this.workspace.RestoreBlocks(this.decoder);
        };
        Requests.GetDecoderDef(id, this.decoder, callback);
        return null;      
    }

    /* Url based methods */
    private GetBaseUrl(): string {
        return "index.html";
    }

    private GetBlockIdInUrl(): number {
        return parseInt(window.location.hash.substring(1)) || null;
    }

    private SetUrl() {
        window.location.hash = this.decoder.Id ? `${this.decoder.Id}` : "";
    }
    

}

/**
 * Things to do on with the workspace on load of the window
 * @returns {} 
 */
window.onload = () => {
    EventHandler.OnLoad();
}