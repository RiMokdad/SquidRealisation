/**
 * Decoder is a construction of an object that represents Blockly's decoder and contains all important informations
 * to use it in all contexts of the application without going back to Blockly.
 * This is the object that will be saved to the server.
 */
"use strict";
var Decoder = (function () {
    function Decoder(id, name, version, category, tags, xmlDefinition, generatedCode, frenchSpec, editable) {
        this.id = id;
        this.name = name;
        this.version = version;
        this.category = category;
        this.tags = tags;
        this.xmlDefinition = xmlDefinition;
        this.generatedCode = generatedCode;
        this.frenchSpec = frenchSpec;
        this.editable = editable;
    }
    return Decoder;
}());
exports.Decoder = Decoder;
//# sourceMappingURL=Decoder.js.map