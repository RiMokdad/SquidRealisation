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
        this.decoder_test();  
    }

    decoder_test() {

        this.decoder.Id = 17;

        const func = () => {
            this.DisplaySpec();    
        };
        Requests.GetDecoderDef(17, this.decoder, func);

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
        const callback = (res) => {
           // this.decoderList.push(this.decoder);          
            for (let i = 0; i < res.length; i++) {
                this.decoderList.push(Decoder.ObjectToDecoder(res[i]));
            }
            console.log(this.decoder);
        };
        Requests.FindDescendants(this.decoder, callback);
    }


}