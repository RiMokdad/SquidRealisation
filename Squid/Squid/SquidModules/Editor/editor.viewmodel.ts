import { Component } from "@angular/core";
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
        Workspace.GetInstance().Clear();
    }

    Save() {
        //TODO insert code for saving decodeur onto the web
        const wpDecoder = Workspace.GetInstance().GetDecoder();
        if (wpDecoder) {
            wpDecoder.Category = this.decoder.Category;
            wpDecoder.Id = this.decoder.Id;
            wpDecoder.Tags = this.decoder.Tags;
            wpDecoder.Version = this.decoder.Version;

            //TODO send wpDecoder
            this.decoder.Id = null; //Call to the server for saving the current block
        }
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
        //this.toolboxManager.UpdateBlocksInfos(blocksInformations);
        //this.toolboxManager.UpdateCategories();
        //Workspace.GetInstance().UpdateToolbox(this.toolboxManager.toolboxHTML);
    }

    SearchTag() {
        this.toolboxManager.UpdateResearch(this.tagsSearch.split(","));
        Workspace.GetInstance().UpdateToolbox(this.toolboxManager.toolboxHTML);
    }

    OpenTab() {
        window.open(this.GetBaseUrl());
    }

    private SaveDecoderToServer() {
        const bool = Workspace.GetInstance().SaveAsDecoderToServer();
        alert(bool);
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