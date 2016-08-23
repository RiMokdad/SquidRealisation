"use strict";
/**
 * BlocksInfo holds all important information for a bloc to generate is call in
 * the toolbox. It's also a starting point is you want to know if you can ask the server
 * for the definition.
 */
var BlockInfos = (function () {
    function BlockInfos(name, parameters, tags, category, version, id, editable) {
        this.id = id || null;
        this.name = name || "Decodeur";
        this.parameters = parameters || "";
        if (tags) {
            if (typeof (tags) == "string") {
                this.tags = tags;
            }
            else {
                this.tags = tags.join(",");
            }
        }
        else {
            this.tags = "";
        }
        this.category = category || "";
        this.version = version || "0.0";
        this.editable = (editable !== false);
    }
    BlockInfos.prototype.CreateFlyout = function () {
        var elem = document.createElement("block");
        elem.setAttribute("type", "procedures_callnoreturn");
        elem.setAttribute("id", this.id);
        elem.setAttribute("gap", "16");
        var mutation = document.createElement("mutation");
        mutation.setAttribute("name", this.name);
        if (this.parameters !== "") {
            var params = this.parameters.split(',');
            for (var i = 0; i < params.length; i++) {
                var arg = document.createElement("arg");
                arg.setAttribute("name", params[i]);
                mutation.appendChild(arg);
            }
        }
        elem.appendChild(mutation);
        return elem;
    };
    BlockInfos.prototype.IsTagged = function (tags) {
        var innerTags = this.tags.split(",");
        if (typeof (tags) == "string") {
            //Parameter is a single string
            for (var i = 0; i < innerTags.length; i++) {
                if (innerTags[i] == tags) {
                    return true;
                }
            }
        }
        else {
            //Parameter is a tab of strings
            for (var j = 0; j < tags.length; j++) {
                for (var i = 0; i < innerTags.length; i++) {
                    if (innerTags[i] == tags[j]) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    BlockInfos.ObjectToBlockInfos = function (object) {
        return new BlockInfos(object.name, object.parameters, object.tags, object.category, object.version, object.id, object.editable);
    };
    return BlockInfos;
}());
exports.BlockInfos = BlockInfos;
//# sourceMappingURL=BlockInfos.js.map