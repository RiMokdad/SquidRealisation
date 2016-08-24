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
    private currentSwitch = 0;

    constructor() {
        this.decoder = null;
        this.decoderList = new Array<Decoder>();
        this.toolboxMan = SingleAccess.GetToolboxManager();
        this.decoder = new Decoder();
        this.Init();
    }

    private Init() {
        this.decoder.Id = -1;
        this.decoder.FrenchSpec = "L'ensemble des données de la spec du décodeur est affiché ici" +
            "\nCliquez à gauche sur un décodeur pour afficher ses specifications ainsi que la specification des modules dont il dépend. " +
            "\nUn clic sur une specification ouvre la définition si possible.";
        this.decoder.Code = "L'ensemble du code du décodeur est affiché ici." +
            "\nCliquez à gauche sur un décodeur pour afficher son code ainsi que le code des décodeurs dont il dépend" +
            "\nUn clic sur du code ouvre la définition si disponible.";
        this.decoder.Name = "Nom de mon décodeur";
        this.decoder.Tags = "Les tags pour effectuer des recherches";
        this.decoder.Category = "Des catégories pour pouvoir ranger le bloc";
        this.decoder.Editable = false;
        this.DisplaySpec();
    }

    Switch() {
        const code = document.getElementsByClassName("switch-wrapper");

        this.switch(this.currentSwitch, code);

        this.currentSwitch++;
        this.currentSwitch %= code.length;

    }

    private switch(currentSwitch: number, elements: NodeList) {
        const nbEntries = elements.length;

        for (let i = 0; i < nbEntries; i++) {
            const side = elements[i] as HTMLElement;
            if ((i % nbEntries) === this.currentSwitch) {
                side.style.visibility = "visible";
                side.style.transform = "rotateY(360deg)";
            } else {
                side.style.visibility = "hidden";
                side.style.transform = "rotateY(180deg)";
            }
        }
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