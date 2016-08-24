import { Component } from "@angular/core";

import { BlockInfos} from "./../Util/BlockInfos";
import { Decoder } from "./../Util/Decoder";
import { ToolboxManager, BlocksCat } from "../Toolbox/ToolboxManager";

import { Onglet } from "./../Util/Onglet";
import { Messages } from "./../Util/Messages";
import { EventHandler, SingleAccess } from "./../Util/EventHandler";

import { Requests } from "../Request/server_request";

declare var Ac: any;

@Component({
    selector: "spec",
    templateUrl: "SquidModules/Spec_And_Code/spec.view.html"
})
export class SpecComponent {
    decoder: Decoder;
    decoderList: Array<Decoder>;
    toolboxMan: ToolboxManager;

    constructor() {
        this.decoder = null;
        this.decoderList = new Array<Decoder>();
        this.toolboxMan = SingleAccess.GetToolboxManager();
        this.decoder = new Decoder();
        this.Init();
    }

    private Init() {
        this.decoder.Id = -1;
        this.decoder.FrenchSpec = " L'ensemble des données de la spec du décodeur est affiché ici" +
            "\nCliquez à gauche sur un décodeur pour afficher ses specifications ainsi que la specification des modules dont il dépend. \n" +
            "Un clic sur une specification ouvre la définition si possible.";
        this.decoder.Code = "L'ensemble du code du décodeur est affiché ici." +
            "\nCLiquez à gauche sur un décodeur pour afficher son code ainsi que le code des décodeurs dont il dépend" +
            "\nUn clic sur du code ouvre la définition si disponible."
        this.decoder.Name = "Nom de mon décodeur";
        this.decoder.Tags = "Les tags pour effectuer des recherches";
        this.decoder.Category = "Des catégories pour pouvoir ranger le bloc";
        this.decoder.Editable = false;
        this.DisplaySpec();
    }

    Switch(step: number) {
        const code = document.getElementsByClassName("content-code");
        let upside :HTMLElement;
        let downside: HTMLElement;
        if (step == 0) {
            upside = code[0] as HTMLElement;
            downside = code[1] as HTMLElement;
        } else if (step == 1) {
            upside = code[1] as HTMLElement;
            downside = code[0] as HTMLElement;
        } else {
            return;
        }
        upside.style.transform = "rotateY(180deg)";
        upside.style.visibility = "hidden";
        downside.style.transform = "rotateY(360deg)";  
        downside.style.visibility = "visible";
    }

    Refresh() {

    }

    OpenTab(decoder?: Decoder) {
        if (decoder && decoder.Editable) {
            console.log(decoder);
            console.log(decoder.Editable);
            const bi = Decoder.toBlockInfos(decoder);
            Onglet.OpenTab(bi);
        } else {
            Messages.Notify("Not editable");
        }
    }

    Select(bi: BlockInfos) {
        const decoder = Decoder.fromBlockInfos(bi);
        this.SetDecoder(decoder);
    }

    SetDecoder(decoder: Decoder) {
        this.decoder = decoder;

        const func = () => {
            this.decoderList.length = 0;
            this.DisplaySpec();
        };
        Requests.GetDecoderDef(this.decoder.Id, this.decoder, func);
    }

    DisplaySpec() {

        if (this.decoder.Id !== -1) {
            const callback = (res) => {
                for (let i = 0; i < res.length; i++) {
                    this.decoderList.push(Decoder.ObjectToDecoder(res[i]));
                }
            };
            Requests.FindDescendants(this.decoder, callback);
        } else {
            this.decoderList.push(this.decoder);
        }
    }


}