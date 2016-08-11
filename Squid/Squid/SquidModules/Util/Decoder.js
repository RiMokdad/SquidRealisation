"use strict";
var Decoder = (function () {
    function Decoder(Id, Name, Version, Category, Tags, Xml, Code, FrenchSpec, Editable) {
        this.Id = Id || null;
        this.Name = Name || "Decoder";
        this.Version = Version || "0.0";
        this.Category = Category || "";
        this.Tags = Tags || "";
        this.Xml = Xml || "";
        this.Code = Code || "";
        this.FrenchSpec = FrenchSpec || "";
        this.Editable = Editable || true;
    }
    Decoder.fromBlockInfos = function (bi) {
        return new Decoder(bi.id, bi.name, bi.version, null, bi.tags, null, null, null, bi.editable);
    };
    Decoder.copy = function (decoder) {
        return new Decoder(decoder.Id, decoder.Name, decoder.Version, decoder.Category, decoder.Tags, decoder.Xml, decoder.Code, decoder.FrenchSpec, decoder.Editable);
    };
    return Decoder;
}());
exports.Decoder = Decoder;
//# sourceMappingURL=Decoder.js.map