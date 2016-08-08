import { Component } from "@angular/core";
import { BlockInfos} from "./../Toolbox/toolboxManager";
import { ToolboxManager } from "./../Toolbox/toolboxManager";

@Component({
    selector: "editor",
    templateUrl: "SquidModules/Editor/editor.view.html"
})
export class EditorComponent {
    name = "Editeur";
    Tags = "";
    placeholderTags = "tags1, tags2,...";
    toolboxManager = new ToolboxManager();

    Clear() {
        //TODO insert code for clearing workspace
    }

    Save() {
        //TODO insert code for saving decodeur onto the web
        //Call to the server for saving the current block
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
        this.toolboxManager.UpdateResearch(this.Tags.split(","));
        console.log(this.toolboxManager.toolboxHTML);
    }

    OpenTab() {
        //TODO insert code for opening a new tab
    }
    
}