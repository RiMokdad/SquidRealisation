"use strict";
var BlockInfos_1 = require("../Util/BlockInfos");
var Workspace_1 = require("./../BlocklyWrapper/Workspace");
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
    ]
];
var BlocksCat = (function () {
    function BlocksCat(cat, blocks) {
        this.category = cat;
        this.blocks = blocks || new Array();
    }
    return BlocksCat;
}());
exports.BlocksCat = BlocksCat;
var ToolboxManager = (function () {
    function ToolboxManager() {
        this.toolboxHTML = document.createElement("xml");
        this.CreateCategories(BLOCKS);
        this.BlocksInformations = new Array();
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
        //Add user created decoders
        this.decoders = document.createElement("category");
        this.decoders.setAttribute("name", "Mes décodeurs");
        this.decoders.setAttribute("colour", "180");
        this.toolboxHTML.appendChild(this.decoders);
        //Add researched decoders
        this.research = document.createElement("category");
        this.research.setAttribute("name", "Recherches");
        this.research.setAttribute("colour", "200");
        this.toolboxHTML.appendChild(this.research);
    };
    /*UpdateBlocksInfos(blocksInfos: BlockInfos[]) {
        
    }*/
    ToolboxManager.prototype.UpdateBlocksInfos = function (map) {
        this.BlocksInformations = new Array();
        for (var category in map) {
            var cat = new BlocksCat(category);
            for (var i = 0; i < map[category].length; i++) {
                cat.blocks.push(BlockInfos_1.BlockInfos.ObjectToBlockInfos(map[category][i]));
            }
            this.BlocksInformations.push(cat);
        }
        this.UpdateCategories();
        Workspace_1.Workspace.GetInstance().UpdateToolbox(this.toolboxHTML);
    };
    ToolboxManager.prototype.UpdateCategories = function () {
        //clear
        while (this.decoders.firstChild) {
            this.decoders.removeChild(this.decoders.firstChild);
        }
        //add
        var proc = document.createElement("block");
        proc.setAttribute("type", "procedures_defnoreturn");
        this.decoders.appendChild(proc);
        for (var i = 0; i < this.BlocksInformations.length; i++) {
            var catName = this.BlocksInformations[i].category;
            var blocks = this.BlocksInformations[i].blocks;
            var cat = document.createElement("category");
            cat.setAttribute("name", catName);
            cat.setAttribute("colour", "100");
            this.decoders.appendChild(cat);
            for (var j = 0; j < blocks.length; j++) {
                cat.appendChild(blocks[j].CreateFlyout());
            }
        }
    };
    ToolboxManager.prototype.UpdateResearch = function (tags) {
        //clear
        while (this.research.firstChild) {
            this.research.removeChild(this.research.firstChild);
        }
        //add
        if (typeof (tags) == "string") {
            //Parameter is a single string
            for (var i = 0; i < this.BlocksInformations.length; this.BlocksInformations) {
                var blocks = this.BlocksInformations[i].blocks;
                for (var j = 0; j < blocks.length; j++) {
                    if (blocks[j].IsTagged(tags)) {
                        this.research.appendChild(blocks[j].CreateFlyout());
                    }
                }
            }
        }
        else {
            //Parameter is a tab of strings
            for (var tag in tags) {
                for (var i = 0; i < this.BlocksInformations.length; this.BlocksInformations) {
                    var blocks = this.BlocksInformations[i].blocks;
                    for (var j = 0; j < blocks.length; j++) {
                        if (blocks[j].IsTagged(tag)) {
                            this.research.appendChild(blocks[j].CreateFlyout());
                        }
                    }
                }
            }
        }
        var l = this.research.childNodes.length;
        if (l > 0) {
            this.research.setAttribute("name", "Recherche: " + l);
        }
        else {
            this.research.setAttribute("name", "Pas de résultat");
        }
    };
    return ToolboxManager;
}());
exports.ToolboxManager = ToolboxManager;
//# sourceMappingURL=toolboxManager.js.map