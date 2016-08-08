"use strict";
var BLOCKS = [
    [
        { name: "Briques de base", colour: 250 },
        ["compute", "execute", "switch", "case", "default", "check_frame_length", "custom_controls_if"]
    ],
    [
        { name: "Blocks de décodage", colour: 270 },
        ["decodebytes", "decodeboolean", "decodesignedinterger", "decodeunsignedinteger"]
    ],
    [
        { name: "sep", gap: 8 }, []
    ],
    [
        { name: "Mes décodeurs", colour: 180 },
        []
    ],
    [
        { name: "Recherche", colour: 200 },
        []
    ]
];
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
var ToolboxManager = (function () {
    function ToolboxManager() {
        this.toolboxHTML = document.createElement("xml");
        this.CreateCategories(BLOCKS);
    }
    ToolboxManager.prototype.CreateCategories = function (blocks) {
        for (var i = 0; i < blocks.length; i++) {
            var name_1 = blocks[i][0].name;
            if (name_1 == "sep") {
                var gap = blocks[i][0].gap;
                var sep = document.createElement("sep");
                sep.setAttribute("gap", gap);
                this.toolboxHTML.appendChild(sep);
            }
            else {
                var colour = blocks[i][0].colour;
                var category = document.createElement("category");
                category.setAttribute("name", name_1);
                category.setAttribute("colour", colour);
                for (var j = 0; j < blocks[i][1].length; j++) {
                    var block = document.createElement("block");
                    block.setAttribute("type", blocks[i][1][j]);
                    category.appendChild(block);
                }
                this.toolboxHTML.appendChild(category);
            }
        }
    };
    ToolboxManager.prototype.UpdateBlocksInfos = function (blocksInfos) {
        //TODO insert code to update the BlocksInformations 
    };
    ToolboxManager.prototype.UpdateCategories = function () {
        //TODO insert code the nesting categories 
    };
    ToolboxManager.prototype.UpdateResearch = function (tags) {
        //TODO insert code for research
        if (typeof (tags) == "string") {
        }
        else {
        }
    };
    return ToolboxManager;
}());
exports.ToolboxManager = ToolboxManager;
//# sourceMappingURL=toolboxManager.js.map