"use strict";
var BLOCKS = [
    [
        { name: "Briques de base", colour: 250 },
        ["compute", "execute", "switch", "case", "default", "check_frame_length", "custom_controls_if"]
    ],
    [
        { name: "Blocks de décodage", colour: 270 },
        ["decodebytes", "decodeboolean", "decodesignedinteger", "decodeunsignedinteger"]
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