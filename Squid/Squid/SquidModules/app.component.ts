import { Component } from "@angular/core";
import { EditorComponent } from "./Editor/editor.viewmodel";

@Component({
    selector: "decoder",
    templateUrl: "SquidModules/main.view.html",
    directives: [EditorComponent]
})
export class DecoderComponent {
    
}

window.onload = () => {
    var url = window.URL;
    var urlSplit = url.toString().split("#");
    console.log(urlSplit[0] + " " + urlSplit[1]);
    console.log("I WROTE SOMETHING");
};