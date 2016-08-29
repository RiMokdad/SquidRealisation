import { Component} from "@angular/core";
//import {Observable} from "@reactivex/rxjs/es6/Observable.js"

import { BlockInfos} from "./../Util/BlockInfos";
import { Decoder } from "./../Util/Decoder";

import { Messages } from "./../Util/Messages";
import { EventHandler, SingleAccess } from "./../Util/EventHandler";
import { Onglet } from "./../Util/Onglet";

import { ToolboxManager } from "./../Toolbox/toolboxManager";
import { Workspace } from "./../BlocklyWrapper/Workspace";
import { ConfigSetComponent, InventorySetComponent } from "../Variables/variables_set.viewmodel";

import { Requests } from "../Request/server_request";
import { ServerNotifications } from "../SignalR/signalr_methods";


declare var Ac: any;
declare var $: any;

export enum RefreshState {
    UP_TO_DATE,
    PENDING,
    OUT_DATED
}

@Component({
    selector: "editor",
    templateUrl: "SquidModules/Editor/editor.view.html",
    directives: [ConfigSetComponent, InventorySetComponent]
})
export class EditorComponent {

    decoder: Decoder;
    workspace: Workspace;
    tagsSearch: string;
    placeholderTags: string;
    toolboxManager: ToolboxManager;
    refreshState: RefreshState;
    serverNotifications: ServerNotifications;
    variablesShown: boolean;

    //autocomplete object
    ac;

    constructor() {
        EventHandler.SetEditorComponent(this);
        this.serverNotifications = new ServerNotifications();
        this.toolboxManager = SingleAccess.GetToolboxManager();
        this.decoder = new Decoder();
        this.placeholderTags = "tags1, tags2,...";
        this.tagsSearch = "";
        this.refreshState = RefreshState.OUT_DATED;
        this.ToggleVariables(true);
    }

    /**
     * Loaded after the whole page has been loaded
     */
    OnLoad() {
        this.workspace = Workspace.Inject("blocklyDiv", false, this.toolboxManager.GetToolbox());
        this.workspace.BindDecoder(this.decoder);
        this.decoder.Id = Onglet.GetBlockIdInUrl();

        if (this.decoder.Id) {
            if (this.decoder.Id === -1) {
                this.LoadModeEncapsulateBlock();
                this.decoder.Id = null;
            } else {
                this.LoadModeBloc();
            }
        } else {
            this.LoadModeFromScratch();
        }

        this.ac = new Ac();
        const updatevar = (variables) => {
            SimpleVariables.UpdateVariables(variables);
        };
        //Requests.ReloadVariables(updatevar);
        this.pollRefresh();
    }

    private LoadModeBloc() {
        this.RestoreBlock(this.decoder.Id);
    }

    private LoadModeFromScratch() {
        this.workspace.Initialize();
    }

    private LoadModeEncapsulateBlock() {
        this.workspace.Initialize(window.localStorage[Onglet.GetBaseUrl()]);
        Onglet.SetUrlDefault();
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
        Onglet.SetUrl(this.decoder);
    }

    /**
     * Supress on the server the decoder currently in the editor if it has already been saved once.
     */
    Supress() {
        const deleteConfirmed = () => {
            this.Clear();
            this.decoder = new Decoder();
            this.workspace.BindDecoder(this.decoder);
            Onglet.SetUrl(this.decoder);
            Messages.Notify("Décodeur supprimé");
        };

        const deletion = () => {
            Requests.DeleteDecoder(this.decoder, deleteConfirmed);
        };

        Requests.FindUsages(this.decoder.Id, deletion);
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
        Requests.GetBlocksInfos(success, fail);
    }

    /**
     * Update the toolbox with results of the research. You can search multiple tags
     */
    SearchTag() {
        this.toolboxManager.UpdateResearch(this.tagsSearch);
        this.workspace.UpdateToolbox(this.toolboxManager.GetToolbox());

        //test spec 
        //Requests.FindDescendants(this.decoder);

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
            let decoder: BlockInfos;
            switch (typeof(param1)) {
            case "string":
                decoder = this.toolboxManager.GetDecoderByName(param1);
                break;
            case "number":
                decoder = this.toolboxManager.GetDecoderById(param1);
                break;
            default:
                Messages.Alert("Impossible de charger ce décodeur");
                return;
            }

            Onglet.OpenTab(decoder);
        } else {
            Onglet.OpenTab();
        }
    }

    // not in the right file
    ToggleVariables(show?: boolean): boolean {
        if (show != null) {
            this.variablesShown = show;
        }
        if (!this.variablesShown) { //If not visible, show variables
            $("#variables").removeClass("variables-close");
            $("#editor").removeClass("edition-window-full");

            $("#variables").addClass("variables-open");
            $("#editor").addClass("edition-window-reduce");
        } else {
            $("#variables").removeClass("variables-open");
            $("#editor").removeClass("edition-window-reduce");

            $("#variables").addClass("variables-close");
            $("#editor").addClass("edition-window-full");
        }
        if(this.workspace)
            this.workspace.Resize();
        return (this.variablesShown = !this.variablesShown);
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
        const updateurl = () => {
            Onglet.SetUrl(this.decoder);
        };
        if (this.workspace.IsADecoder()) {
            this.workspace.CompleteDecoder(this.decoder);
            this.decoder.Tags = this.decoder.Tags.replace(/\s/g, "");

            const fail = (txt) => {
                console.log(txt);
                Messages.Alert("Erreur lors de la sauvegarde\nCause possible :\n" +
                    "Le nom de votre décodeur est déjà pris par un autre décodeur.\n" +
                    "\nAfficher la console pour voir les détails de l'erreur.");
            };
            if (!this.decoder.Editable) {
                this.decoder.Code = this.decoder.FrenchSpec = null;
            }
            Requests.SaveDecoder(this.decoder, updateurl, fail);

        } else {
            alert("Un des problèmes suivants se pose:" +
                "\n - Vous avez plus d'un bloc" +
                "\n - Le bloc n'est pas un bloc décodeur de base" +
                "\n - Vous n'avez rien à sauvegarder");
        }
        //test
        Requests.SaveVariables(SimpleVariables.GetVariablesAsJson());
    }

    /**
     * Restore the block with the given id
     * @param id
     */
    RestoreBlock(id: number) {
        const callback = (decoder) => {
            this.decoder.update(Decoder.ObjectToDecoder(decoder));
            this.workspace.RestoreBlocks(this.decoder);
            this.workspace.CompleteDecoder(this.decoder);

            if (!this.decoder.Editable) {
                this.workspace.SetVisible(false);
                Messages.Alert("Le décodeur n'est pas éditable, il reste consultable dans la section 'Spécifications'");
                return;
            } else {
                this.workspace.SetVisible(true);

                Messages.Alert(`Le décodeur ${decoder.Name} a été rechargé.`);
                Onglet.SetUrl(this.decoder);
            }
        };

        Requests.GetDecoderDef(id, this.decoder, callback);
        return null;
    }
}

/**
 * Things to do with the workspace on load of the window
 * @returns {} 
 */
window.onload = () => {
    EventHandler.OnLoad();
};