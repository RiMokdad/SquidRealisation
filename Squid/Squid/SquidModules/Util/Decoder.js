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
        this.Editable = decoder.Editable || this.Editable;
    };
    return Decoder;
}());
exports.Decoder = Decoder;
//# sourceMappingURL=Decoder.js.map