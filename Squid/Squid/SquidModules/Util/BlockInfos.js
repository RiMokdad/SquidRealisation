"use strict";
/**
 * BlocksInfo holds all important information for a bloc to generate is call in
 * the toolbox. It's also a starting point is you want to know if you can ask the server
 * for the definition.
 */
var BlockInfos = (function () {
    function BlockInfos(id, name, parameters, tags, version, editable) {
        this.id = id;
        this.name = name;
        this.parameters = parameters;
        this.tags = tags;
        this.version = version;
        if (editable !== false) {
            this.editable = true;
        }
        else {
            this.editable = false;
        }
    }
    BlockInfos.prototype.CreateFlyout = function () {
        var elem = document.createElement("block");
        elem.setAttribute("type", "procedures_defnoreturn");
        elem.setAttribute("id", this.id);
        elem.setAttribute("gap", "16");
        var mutation = document.createElement("mutation");
        mutation.setAttribute("name", this.name);
        for (var item in this.parameters) {
            var arg = document.createElement("arg");
            arg.setAttribute("name", item);
            mutation.appendChild(arg);
        }
        elem.appendChild(mutation);
        return elem;
    };
    BlockInfos.prototype.IsTagged = function (tags) {
        if (typeof (tags) == "string") {
            //Parameter is a single string
            for (var i = 0; i < this.tags.length; i++) {
                if (this.tags[i] == tags) {
                    return true;
                }
            }
        }
        else {
            //Parameter is a tab of strings
            for (var j = 0; j < tags.length; j++) {
                for (var i = 0; i < this.tags.length; i++) {
                    if (this.tags[i] == tags[j]) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    return BlockInfos;
}());
exports.BlockInfos = BlockInfos;
//# sourceMappingURL=BlockInfos.js.map