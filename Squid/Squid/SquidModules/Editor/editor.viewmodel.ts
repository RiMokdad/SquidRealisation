﻿import { Component } from "@angular/core";
import { BlockInfos} from "./../Util/BlockInfos";
import { Decoder } from "./../Util/Decoder";
import { ToolboxManager } from "./../Toolbox/toolboxManager";
import { Workspace } from "./../BlocklyWrapper/Workspace";
import { Requests } from "../Request/server_request"
import {Messages} from "./../Util/Messages";

@Component({
    selector: "editor",
    templateUrl: "SquidModules/Editor/editor.view.html"
}) 
export class EditorComponent {

    decoder = new Decoder();

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
        //Verify existance 
        //Ask the list of direct depencies for function calls
        //Supress the block if the user really wants it
    }

    Refresh() {
        //TODO insert code for toolbox management
        const blocksInformations = new Array<BlockInfos>();
        //TODO Call to server for updating blocks informations
        Requests.GetCategories(this.toolboxManager.UpdateBlocksInfos.bind(this.toolboxManager));
        this.toolboxManager.UpdateBlocksInfos(blocksInformations);
        this.toolboxManager.UpdateCategories();
        Workspace.UpdateToolbox(this.toolboxManager.toolboxHTML);
    }

    SearchTag() {
        this.toolboxManager.UpdateResearch(this.tagsSearch.split(","));
        Workspace.UpdateToolbox(this.toolboxManager.toolboxHTML);
    }

    OpenTab() {
        window.open(this.GetBaseUrl());
    }

    private SaveDecoderToServer() {
        //TODO insert code for saving decodeur onto the web
        console.log("Saving");
        const wpDecoder = Workspace.GetDecoder();
        if (wpDecoder) {
            wpDecoder.Category = this.decoder.Category;
            wpDecoder.Tags = this.decoder.Tags;
            wpDecoder.Version = this.decoder.Version;
            Requests.SaveDecoder(wpDecoder);
        } else {
            alert("Un des problèmes suivants se pose:" +
                "\n - Vous avez plus d'un bloc" +
                "\n - Le bloc n'est pas un bloc décodeur de base" +
                "\n - Vous n'avez rien à sauvegarder");
        }
    }

    /* Url based methods */
    private GetBaseUrl(): string {
        return "index.html";
    }

    private GetBlockIdInUrl(): number {
        return parseInt(window.location.href.split("#")[1]);
    }

    private SetUrl() {
        window.location.href = `index.html${this.decoder.Id ? `#${this.decoder.Id}` : ""}`;
    }
}

/**
 * Things to do on with the workspace on load of the window
 * @returns {} 
 */
window.onload = () => {
    var tbMan = new ToolboxManager();
    Workspace.Inject("blocklyDiv", false, tbMan.toolboxHTML);
}