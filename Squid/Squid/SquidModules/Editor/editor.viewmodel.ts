import { Component } from "@angular/core";

@Component({
    selector: "editor",
    templateUrl: "SquidModules/Editor/editor.view.html"
})
export class EditorComponent {
    name = "Editeur";
    Tags = "";
    placeholderTags = "tags1, tags2,...";

    Clear() {
        //TODO insert code for clearing workspace
    }

    Save() {
        //TODO insert code for saving decodeur onto the web
    }

    Refresh() {
        //TODO insert code for toolbox management
    }

    SearchTag() {
        //TODO insert code for toolbox management
    }

    OpenTab() {
        //TODO insert code for opening a new tab
    }
}