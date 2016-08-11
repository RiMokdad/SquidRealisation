/**
 * Decoder is a structure that represents Blockly's decoder and contains all important informations
 * to use it in all contexts of the application without going back to Blockly.
 * This is the object that will be saved to the server.
 */
import { BlockInfos } from "./BlockInfos";

export class Decoder {
    Id: number;
    Name: string;
    Version: string;
    Category: string;
    Tags: string;
    Xml: string;
    Code: string;
    FrenchSpec: string;
    Editable: boolean;

    constructor();
    constructor(Id: number, Name: string, Version: string, Category: string, Tags: string, Xml: string, Code: string, FrenchSpec: string, Editable: boolean);

    constructor(Id?: any, Name?: string, Version?: string, Category?: string, Tags?: string, Xml?: string, Code?: string, FrenchSpec?: string, Editable?: boolean) {
        this.Id         = Id || null;
        this.Name       = Name || "Decoder";
        this.Version    = Version || "0.0";
        this.Category   = Category || "";
        this.Tags       = Tags || "";
        this.Xml        = Xml || "";
        this.Code       = Code || "";
        this.FrenchSpec = FrenchSpec || "";
        this.Editable   = Editable || true;
    }

    static fromBlockInfos(bi: BlockInfos) {
        return new Decoder(bi.id, bi.name, bi.version, null, bi.tags, null, null, null, bi.editable);
    }

    static copy(decoder: Decoder) {
        return new Decoder(decoder.Id,
            decoder.Name,
            decoder.Version,
            decoder.Category,
            decoder.Tags,
            decoder.Xml,
            decoder.Code,
            decoder.FrenchSpec,
            decoder.Editable);
    }

}