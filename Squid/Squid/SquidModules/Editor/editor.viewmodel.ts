import { Component } from "@angular/core";
import { BlockInfos} from "./../Util/BlockInfos";
import { ToolboxManager } from "./../Toolbox/toolboxManager";
import { Workspace } from "./../BlocklyWrapper/Workspace";

@Component({
    selector: "editor",
    templateUrl: "SquidModules/Editor/editor.view.html"
}) 
export class EditorComponent {
    decoder = new BlockInfos();
    category: string;

    tagsSearch = "";
    placeholderTags = "tags1, tags2,...";
    toolboxManager: ToolboxManager;
    
    workspace: Workspace;

    private initialized_ = false;

    Init() {
        if (!this.initialized_) {
            this.toolboxManager = new ToolboxManager();
            const xmlTb = this.toolboxManager.toolboxHTML;
            this.workspace = Workspace.Inject("blocklyDiv", false, xmlTb);
            this.initialized_ = true;
        }
    }

    Clear() {
        //TODO insert code for clearing workspace
    }

    Save() {
        //TODO insert code for saving decodeur onto the web
        if (this.workspace.IsADecoder()) {
            this.decoder = this.workspace.GetBlockInfos();
            this.decoder.id = null; //Call to the server for saving the current block
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
        var blocksInformations = new Array<BlockInfos>();
        //TODO Call to server for updating blocks informations
        this.toolboxManager.UpdateBlocksInfos(blocksInformations);
        this.toolboxManager.UpdateCategories();
        this.workspace.UpdateToolbox(this.toolboxManager.toolboxHTML);
    }

    SearchTag() {
        this.toolboxManager.UpdateResearch(this.tagsSearch.split(","));
        this.workspace.UpdateToolbox(this.toolboxManager.toolboxHTML);
    }

    OpenTab() {
        window.open(this.GetBaseUrl());
    }

    SaveDecoderToServer() {
        const bool = this.workspace.SaveAsDecoderToServer();
        alert(bool);
    }

    private GetBaseUrl(): string {
        return "index.html";
    }

    private GetBlockIdInUrl(): number {
        return parseInt(window.location.href.split("#")[1]);
    }

    private SetUrl() {
        window.location.href = `index.html${this.decoder.id ? `#${this.decoder.id}` : ""}`;
    }
}