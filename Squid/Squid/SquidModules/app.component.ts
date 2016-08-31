import { Component } from "@angular/core";
import { EditorComponent } from "./Editor/editor.viewmodel";
import { ConfigSetComponent, InventorySetComponent } from "./Variables/variables_set.viewmodel";
import { SpecComponent } from "./Spec_And_Code/spec.viewmodel";
import { OnInit } from "@angular/core/index";

declare var shortcut: any;

@Component({
    selector: "decoder",
    templateUrl: "SquidModules/main.view.html",
    directives: [
        EditorComponent,
        SpecComponent
    ]
})
export class DecoderComponent implements OnInit {
    activDiv: Node;
    private backgrounds = [
        "grunge.jpg", "paintings.jpg", "brush-iron.jpg", "droplets-leafs.jpg", "metal-grunge.jpg", "sun-reflections.jpg"
    ];
    private idx = 0;


    ngOnInit(): void {
        this.Select(0);
        shortcut.add("Alt+E", () => { this.Select(0); });
        shortcut.add("Alt+S", () => { this.Select(1); });
        shortcut.add("Alt+C", () => { this.Select(1); });
        shortcut.add("Alt+B", () => { this.ChangeBackground(); });
        
    }

    ChangeBackground() {
        const background = document.getElementsByClassName("background")[0] as HTMLElement;
        this.idx = (this.idx + 1) % this.backgrounds.length;
        background.style.backgroundImage = "url('../Content/backgrounds/" + this.backgrounds[this.idx] + "')";
    }

    Select(num: number) {
        num = num || 0;
        const container = document.getElementsByClassName("main-content")[0] as HTMLElement;
        if (container) {
            const children = container.children;
            for (let i = 0; i < children.length; i++) {
                const child = children[i] as HTMLElement;

                if (num !== i) {
                    setTimeout(() => { child.style.display = "none"; }, 200);
                    child.style.visibility = "hidden";
                    child.style.opacity = "0";
                } else {
                    child.style.display = "block";
                    child.style.visibility = "visible";
                    child.style.opacity = "1";
                }
            }
        }
    }
}