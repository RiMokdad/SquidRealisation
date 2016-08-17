import { Component } from "@angular/core";
import { BlockInfos} from "./../Util/BlockInfos";
import { Decoder } from "./../Util/Decoder";
import { ToolboxManager } from "./../Toolbox/toolboxManager";
import { Workspace } from "./../BlocklyWrapper/Workspace";
import { Requests } from "../Request/server_request"
import {Messages} from "./../Util/Messages";
import {EventHandler} from "./../Util/EventHandler";

declare var Ac:any;

@Component({
    selector: "editor",
    templateUrl: "SquidModules/Editor/editor.view.html"
}) 
export class EditorComponent {

    decoder: Decoder;
    tagsSearch: string;
    placeholderTags: string;
    toolboxManager: ToolboxManager;

    //autocomplete object
    ac;



    constructor() {
        EventHandler.SetEditorComponent(this);
        this.toolboxManager = new ToolboxManager();
        this.decoder = new Decoder();
        this.placeholderTags = "tags1, tags2,...";
        this.tagsSearch = "";
    }

    OnLoad() {
        Workspace.Inject("blocklyDiv", false, this.toolboxManager.GetToolbox());
        Workspace.BindDecoder(this.decoder);
        const id = this.GetBlockIdInUrl();
        if (id != null) {
            this.RestoreBlock(id);
        } else {
            Workspace.Initialize();
        }
        this.ac = new Ac();
        this.Refresh();
    }

    Clear() {
        Workspace.Clear();
    }

    Save() {
        //TODO insert local save
        this.SaveDecoderToServer();
        
    }

    Supress() {
        //TODO insert code to supress a decoder onto the server 
        const deleteConfirmed = () => {
            this.decoder = new Decoder();
            Workspace.BindDecoder(this.decoder);
            Messages.Alert("Décodeur supprimé");
        };

        const deletion = () => {
            Requests.DeleteDecoder(this.decoder, deleteConfirmed);
        };

        Requests.FindUsages(this.decoder.Id, deletion);
      
    }

    Refresh() {       
        //TODO insert code for toolbox management
        //TODO Call to server for updating blocks informations
        Workspace.UpdateToolbox(this.toolboxManager.GetToolbox(true));
        const callback = (map) => {
            this.toolboxManager.UpdateBlocksInfos(map);
            //create or update autocompletion
            this.ac.SetTagsAutoComplete(this.toolboxManager.GetTagsList.bind(this.toolboxManager));
            this.ac.SetCategoryAutoComplete(this.toolboxManager.GetCategoryList.bind(this.toolboxManager));
            this.ac.SetSearchBarAutoComplete(this.toolboxManager.GetTagsList.bind(this.toolboxManager));
        };

        Requests.GetCategories(callback);
        Workspace.UpdateToolbox(this.toolboxManager.GetToolbox()); 

        //TESTS DELETE       
    }

    SearchTag() {
        this.toolboxManager.UpdateResearch(this.tagsSearch);
        Workspace.UpdateToolbox(this.toolboxManager.GetToolbox());
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
        if (Workspace.IsADecoder()) {
            Workspace.CompleteDecoder(this.decoder);
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


    RestoreBlock();
    RestoreBlock(name: string);
    RestoreBlock(id: number);
    public RestoreBlock(param1?: any) {
        const callback = () => {
            if (typeof (param1) == "number") {
                this.decoder.Id = param1;
            }
            else if (typeof (param1) == "string") {
                this.decoder.Name = param1;           
            }
            Workspace.RestoreBlocks(this.decoder); 
        };

        //console.log(this.decoder);
        Requests.GetDecoderDef(param1, this.decoder, callback);
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