import { Component } from "@angular/core";
import { EditorComponent } from "./Editor/editor.viewmodel";

@Component({
    selector: "decoder",
    templateUrl: "SquidModules/main.view.html",
    directives: [EditorComponent]
})
export class DecoderComponent {
    
}