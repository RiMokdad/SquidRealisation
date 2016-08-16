﻿import { Component } from "@angular/core";
import { BlockInfos} from "./../Util/BlockInfos";
import { Decoder } from "./../Util/Decoder";
import { ToolboxManager } from "./../Toolbox/toolboxManager";
import { Workspace } from "./../BlocklyWrapper/Workspace";
import { Requests } from "../Request/server_request"
import {Messages} from "./../Util/Messages";

declare var Ac:any;

@Component({
    selector: "editor",
    templateUrl: "SquidModules/Editor/editor.view.html"
}) 
export class EditorComponent {

    decoder = new Decoder();
    //loading = this.OnLoad();

    tagsSearch = "";
    placeholderTags = "tags1, tags2,...";
    toolboxManager = new ToolboxManager();

    private initialized_ = false;

    Clear() {
        Workspace.Clear();
    }

    Save() {
        //TODO insert local save
        this.SaveDecoderToServer();
        
    }

    Supress() {
        //TODO insert code to supress a decoder onto the server 

        Requests.FindUsages(this.decoder.Id);
        const deletion = () => {
            this.decoder = new Decoder();
            alert("Décodeur supprimé");
        };
        Requests.DeleteDecoder(this.decoder, deletion);
    }

    Refresh() {
        //TODO insert code for toolbox management
        //TODO Call to server for updating blocks informations
        Workspace.UpdateToolbox(this.toolboxManager.GetToolbox(true));
        Requests.GetCategories(this.toolboxManager.UpdateBlocksInfos.bind(this.toolboxManager));
        Workspace.UpdateToolbox(this.toolboxManager.GetToolbox());
        //TESTS autocomplete
        //Ac.RefreshTags();
    }

    SearchTag() {
        this.toolboxManager.UpdateResearch(this.tagsSearch);
        Workspace.UpdateToolbox(this.toolboxManager.GetToolbox());
    }

    OpenTab() {
        window.open(this.GetBaseUrl());
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

    public RestoreBlock(id: number) {
        const callback = () => {
            //console.log(this.decoder);
            Workspace.RestoreBlocks(this.decoder);
        };
        console.log(this.decoder);
        Requests.GetDecoderDef(id, this.decoder, callback);
        return null;      
    }

    /* Url based methods */
    private GetBaseUrl(): string {
        return "index.html";
    }

    private GetBlockIdInUrl(): number {
        return parseInt(window.location.hash.substring(1));
    }

    private SetUrl() {
        window.location.hash = this.decoder.Id ? ((this.decoder.Id as any) as string) : "";
    }

    public OnLoad() {
        var id = this.GetBlockIdInUrl();
        if (id !== null) {
            this.RestoreBlock(id);
        }
        else {
            Workspace.InitializeWorkspace();
        }
    }

}

/**
 * Things to do on with the workspace on load of the window
 * @returns {} 
 */
window.onload = () => {
    var tbMan = new ToolboxManager();
    Workspace.Inject("blocklyDiv", false, tbMan.GetToolbox());
    if (window.location.hash !== "") {
        //alert("chargera le bloc");

    }
    //setTimeout(Ac.SetTagsAutocomplete(),1000);
}