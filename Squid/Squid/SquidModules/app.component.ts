import { Component } from "@angular/core";
import { EditorComponent } from "./Editor/editor.viewmodel";
import { SpecComponent } from "./Spec_And_Code/spec.viewmodel";

@Component({
    selector: "decoder",
    templateUrl: "SquidModules/main.view.html",
    directives: [EditorComponent, SpecComponent]
})
export class DecoderComponent {
    
}