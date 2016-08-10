/**
 * Decoder is a construction of an object that represents Blockly's decoder and contains all important informations
 * to use it in all contexts of the application without going back to Blockly.
 * This is the object that will be saved to the server.
 */
"use strict";
var Decoder = (function () {
    function Decoder(Id, Name, Version, Category, Tags, Xml, Code, FrenchSpec, Editable) {
        this.Id = Id;
        this.Name = Name;
        this.Version = Version;
        this.Category = Category;
        this.Tags = Tags;
        this.Xml = Xml;
        this.Code = Code;
        this.FrenchSpec = FrenchSpec;
        this.Editable = Editable;
    }
    return Decoder;
}());
exports.Decoder = Decoder;
//# sourceMappingURL=Decoder.js.map