import { Component } from "@angular/core";

import { BlockInfos} from "./../Util/BlockInfos";
import { Decoder } from "./../Util/Decoder";

import { Onglet } from "./../Util/Onglet";
import { Messages } from "./../Util/Messages";
import { EventHandler } from "./../Util/EventHandler";

import { Requests } from "../Request/server_request";

declare var Ac: any;

@Component({
    selector: "spec",
    templateUrl: "SquidModules/Spec_And_Code/spec.view.html"
})
export class SpecComponent {
    decoder: Decoder;
    decoderList: Array<Decoder>;

    constructor() {
        this.decoder = null;      
        this.decoderList = new Array<Decoder>();
        this.decoder_test();
    }

    decoder_test() {
        this.decoder = new Decoder("Test",
            "tag",
            "Cat",
            "1.2",
            8,
            "<>",
            "Some code",
            "Some Spec,\n\twith indent",
            false);
        this.decoderList.push(this.decoder);
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

    SetDecoder(decoder: Decoder) {
        this.decoder = decoder;
    }
}