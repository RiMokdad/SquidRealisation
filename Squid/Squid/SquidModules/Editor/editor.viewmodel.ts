import { Component } from "@angular/core";
import { BlockInfos} from "./../Util/BlockInfos";
import { ToolboxManager } from "./../Toolbox/toolboxManager";
import { Workspace } from "./../BlocklyWrapper/Workspace";

@Component({
    selector: "editor",
    templateUrl: "SquidModules/Editor/editor.view.html"
}) 
export class EditorComponent {
    name = "Editeur";
    tags = "";
    placeholderTags = "tags1, tags2,...";
    toolboxManager: ToolboxManager;
    decoder: BlockInfos;
    workspace: Workspace;

    private initialized_ = false;

    Init() {
        if (!this.initialized_) {
            this.toolboxManager = new ToolboxManager();
            var xmlTb = this.toolboxManager.toolboxHTML;
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
        //Call to server for updating blocks informations
        this.toolboxManager.UpdateBlocksInfos(blocksInformations);
    }

    SearchTag() {
        //TODO insert code for toolbox management
        this.toolboxManager.UpdateResearch(this.tags.split(","));
        console.log(this.toolboxManager.toolboxHTML);
    }

    OpenTab() {
        //TODO insert code for opening a new tab
    }

    SaveDecoderToServer() {
        var bool = this.workspace.SaveDecoderToServer();
        alert(bool);
    }
    
}