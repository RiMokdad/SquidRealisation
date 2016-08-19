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
    BlocklyDef: string;
    Code: string;
    FrenchSpec: string;
    Editable: boolean;

    constructor();

    constructor(decoder: Decoder);

    constructor(Name: string,
        Tags: string,
        Category: string,
        Version: string,
        Id: number,
        BlocklyDef: string,
        Code: string,
        FrenchSpec: string,
        Editable: boolean);

    constructor(Name?: any,
        Tags?: string,
        Category?: string,
        Version?: string,
        Id?: number,
        BlockyDef?: string,
        Code?: string,
        FrenchSpec?: string,
        Editable?: boolean) {
        if (Name instanceof Decoder) {
            this.update(Name);
        } else {
            this.Id = Id || null;
            this.Name = Name || "Decoder";
            this.Version = Version || "0.0";
            this.Category = Category || "";
            this.Tags = Tags || "";
            this.BlocklyDef = BlockyDef || "";
            this.Code = Code || "";
            this.FrenchSpec = FrenchSpec || "";
            this.Editable = (Editable !== false); //thus me make true the default case
        }
    }

    /**
     * Convert a BlockInfo into a decoder loosing
     * @param bi
     */
    static fromBlockInfos(bi: BlockInfos) {
        return new Decoder(bi.name, bi.tags, bi.category, bi.version, bi.id, null, null, null, bi.editable);
    }

    /**
     * Convert a decoder to a BlockInfos loosing parameters, code, and spec
     * @param decoder
     */
    static toBlockInfos(decoder: Decoder) : BlockInfos {
        return new BlockInfos(decoder.Name,
            null,
            decoder.Tags,
            decoder.Category,
            decoder.Version,
            decoder.Id,
            decoder.Editable);
    }

    static copy(decoder: Decoder) {
        return new Decoder(decoder);
    }

    update(decoder: Decoder) {
        this.Id = decoder.Id || this.Id;
        this.Name = decoder.Name || this.Name;
        this.Version = decoder.Version || this.Version;
        this.Category = decoder.Category || this.Category;
        this.Tags = decoder.Tags || this.Tags;
        this.BlocklyDef = decoder.BlocklyDef || this.BlocklyDef;
        this.Code = decoder.Code || this.Code;
        this.FrenchSpec = decoder.FrenchSpec || this.FrenchSpec;
        this.Editable = decoder.Editable || this.Editable;
    }

}