import { Component } from "@angular/core";
import { EditorComponent } from "./Editor/editor.viewmodel";
import { ConfigSetComponent, InventorySetComponent } from "./Variables/variables_set.viewmodel";
import { SpecComponent } from "./Spec_And_Code/spec.viewmodel";
import { OnInit } from "@angular/core/index";

@Component({
    selector: "decoder",
    templateUrl: "SquidModules/main.view.html",
    directives: [
        EditorComponent,
        ConfigSetComponent,
        InventorySetComponent
        ]
})
export class DecoderComponent implements OnInit {
    activDiv: Node;

    ngOnInit(): void {
        this.Select(0);
    }

    Select(num: number) {
        num = num || 0;
        const container = document.getElementsByClassName("main-content")[0] as HTMLElement;
        if (container) {
            const children = container.children;
            for (let i = 0; i < children.length; i++) {
                const child = children[i] as HTMLElement;
                
                if (num !== i) {
                    child.style.visibility = "hidden";
                    child.style.opacity = "0";
                } else {
                    child.style.visibility = "visible";
                    child.style.opacity = "1";
                }
            }
        }
    }
}