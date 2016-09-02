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
    static toBlockInfos(decoder: Decoder): BlockInfos {
        return new BlockInfos(decoder.Name,
            null,
            decoder.Tags,
            decoder.Category,
            decoder.Version,
            decoder.Id,
            decoder.Editable);
    }

    static ObjectToDecoder(object: any): Decoder {
        return new Decoder(object.Name,
            object.Tags,
            object.Category,
            object.Version,
            object.Id,
            object.BlocklyDef,
            object.Code,
            object.FrenchSpec,
            object.Editable
        );
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
        this.Editable = (decoder.Editable !== undefined ? decoder.Editable : this.Editable);
    }

    /**
 * Parse a string as a value wether it is in variable or it is a value
 * @param valOrVar
 * @param variables
 */
    static ParseVarToVal(valOrVar: string, variables: Array<number>): number {
        let val = parseInt(valOrVar);   //If parsable as a numeric value, parse it
        if (isNaN(val)) {
            val = variables[valOrVar];  //Or copy it from a variable content
        }
        return val;
    }

    static RetrieveDecodedPart(source: HTMLElement, variables: Array<number>): Array<[number, number]> {
        let notThisTuple = false;
        function Parse(valOrVar: string) {
            const val = Decoder.ParseVarToVal(valOrVar, variables);
            if (val == null) {
                notThisTuple = true;
            }
            return val;
        }

        const num = new Array<[number, number]>();
        const blocks = source.getElementsByTagName("block");
        for (let i = 0; i < blocks.length; i++) {
            const type = blocks[i].getAttribute("type");
            let children: any;
            let start: any = 0;
            let end: any = 0;

            notThisTuple = false;   //Flag it as a valuable block at the beginning of parsing

            switch (type) {
                case "decodebytes":
                case "decodeHexa":
                    children = blocks[i].childNodes;
                    for (let j = 0; j < children.length; j++) {
                        const child = children[j] as HTMLElement;
                        switch (child.getAttribute("name")) {
                            case "start":
                            case "BEGIN":
                                start = Parse(child.innerText);
                                break;
                            case "end":
                            case "END":
                                end = Parse(child.innerText);
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                case "decodeboolean":
                    children = blocks[i].childNodes;
                    for (let j = 0; j < children.length; j++) {
                        const child = children[j] as HTMLElement;
                        switch (child.getAttribute("name")) {
                            case "BYTEPOS":
                                start = Parse(child.innerText) + start;
                                break;
                            case "BITPOS":
                                start = start + (Parse(child.innerText) % 8) / 10;
                                break;
                            default:
                                break;
                        }
                    }

                    end = start + 0.1;

                    break;
                case "decodesignedinteger":
                case "decodeunsignedinteger":
                    children = blocks[i].childNodes;
                    for (let j = 0; j < children.length; j++) {
                        const child = children[j] as HTMLElement;
                        switch (child.getAttribute("name")) {
                            case "MSBYTE":
                                start = Parse(child.innerText) + start;
                                break;
                            case "MSBIT":
                                start = start + (Parse(child.innerText) % 8) / 10;
                                break;
                            case "LSBYTE":
                                end = Parse(child.innerText) + end;
                                break;
                            case "LSBIT":
                                end = end + (Parse(child.innerText) % 8) / 10;
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                default:
                    notThisTuple = true;
                    break;
            }

            if (!notThisTuple)
                num.push([start, end]);
        }
        return num;
    }
}