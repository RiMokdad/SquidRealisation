"use strict";
/**
 * Decoder is a structure that represents Blockly's decoder and contains all important informations
 * to use it in all contexts of the application without going back to Blockly.
 * This is the object that will be saved to the server.
 */
var BlockInfos_1 = require("./BlockInfos");
var Decoder = (function () {
    function Decoder(Name, Tags, Category, Version, Id, BlockyDef, Code, FrenchSpec, Editable) {
        if (Name instanceof Decoder) {
            this.update(Name);
        }
        else {
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
    Decoder.fromBlockInfos = function (bi) {
        return new Decoder(bi.name, bi.tags, bi.category, bi.version, bi.id, null, null, null, bi.editable);
    };
    /**
     * Convert a decoder to a BlockInfos loosing parameters, code, and spec
     * @param decoder
     */
    Decoder.toBlockInfos = function (decoder) {
        return new BlockInfos_1.BlockInfos(decoder.Name, null, decoder.Tags, decoder.Category, decoder.Version, decoder.Id, decoder.Editable);
    };
    Decoder.ObjectToDecoder = function (object) {
        return new Decoder(object.Name, object.Tags, object.Category, object.Version, object.Id, object.BlocklyDef, object.Code, object.FrenchSpec, object.Editable);
    };
    Decoder.copy = function (decoder) {
        return new Decoder(decoder);
    };
    Decoder.prototype.update = function (decoder) {
        this.Id = decoder.Id || this.Id;
        this.Name = decoder.Name || this.Name;
        this.Version = decoder.Version || this.Version;
        this.Category = decoder.Category || this.Category;
        this.Tags = decoder.Tags || this.Tags;
        this.BlocklyDef = decoder.BlocklyDef || this.BlocklyDef;
        this.Code = decoder.Code || this.Code;
        this.FrenchSpec = decoder.FrenchSpec || this.FrenchSpec;
        this.Editable = (decoder.Editable !== undefined ? decoder.Editable : this.Editable);
    };
    /**
 * Parse a string as a value wether it is in variable or it is a value
 * @param valOrVar
 * @param variables
 */
    Decoder.ParseVarToVal = function (valOrVar, variables) {
        var val = parseInt(valOrVar); //If parsable as a numeric value, parse it
        if (isNaN(val)) {
            val = variables[valOrVar]; //Or copy it from a variable content
        }
        return val;
    };
    Decoder.RetrieveDecodedPart = function (source, variables) {
        var notThisTuple = false;
        function Parse(valOrVar) {
            var val = Decoder.ParseVarToVal(valOrVar, variables);
            if (val == null) {
                notThisTuple = true;
            }
            return val;
        }
        var num = new Array();
        var blocks = source.getElementsByTagName("block");
        for (var i = 0; i < blocks.length; i++) {
            var type = blocks[i].getAttribute("type");
            var children = void 0;
            var start = 0;
            var end = 0;
            notThisTuple = false; //Flag it as a valuable block at the beginning of parsing
            switch (type) {
                case "decodebytes":
                case "decodeHexa":
                    children = blocks[i].childNodes;
                    for (var j = 0; j < children.length; j++) {
                        var child = children[j];
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
                    for (var j = 0; j < children.length; j++) {
                        var child = children[j];
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
                    for (var j = 0; j < children.length; j++) {
                        var child = children[j];
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
    };
    return Decoder;
}());
exports.Decoder = Decoder;
//# sourceMappingURL=Decoder.js.map