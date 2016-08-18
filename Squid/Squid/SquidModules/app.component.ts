import { Component } from "@angular/core";
import { EditorComponent } from "./Editor/editor.viewmodel";
import { ConfigSetComponent, InventorySetComponent } from "./Variables/variables_set.viewmodel";

@Component({
    selector: "decoder",
    templateUrl: "SquidModules/main.view.html",
    directives: [
        EditorComponent,
        ConfigSetComponent,
        InventorySetComponent
        ]
})
export class DecoderComponent {

}