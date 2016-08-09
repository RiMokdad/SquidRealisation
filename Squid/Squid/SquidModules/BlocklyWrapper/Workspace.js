"use strict";
var BlockInfos_1 = require("../Util/BlockInfos");
//declare var Blockly : any;
var Workspace = (function () {
    /**
     * /!\ THIS CONSTRUCTOR IS VISIBLE BUT PLEASE, PREFER THE STATIC INJECT
     * @param cur_workspace
     */
    function Workspace(cur_workspace) {
        this.workspace = cur_workspace;
        //this.workspace = new Blockly.Workspace();
    }
    Workspace.Inject = function (anchor, trashcan, toolbox) {
        var workspace = Blockly.inject(anchor, {
            toolbox: toolbox,
            zoom: {
                controls: true,
                wheel: true,
                startScale: 1.0,
                maxScale: 3,
                minScale: 0.2,
                scaleSpeed: 1.2
            },
            trashcan: trashcan
        });
        console.log("LOLFOI4RYFOGRZEYTFIO");
        return new Workspace(workspace);
    };
    ////generateCSharp() : string {
    ////    return Blockly.CSharp.workspaceToCode(this.workspace);
    ////}
    ////generateFrench(): string {
    ////    return Blockly.French.workspaceToCode(this.workspace);
    ////}
    Workspace.prototype.getBlockInfos = function () {
        return new BlockInfos_1.BlockInfos(null, null, null, null, null, true);
    };
    Workspace.prototype.IsADecoder = function () {
        var blocks = this.workspace.getTopBlocks();
        if (blocks.length == 1 && blocks[0].getDef) {
            return true;
        }
        return false;
    };
    Workspace.prototype.getTopBlocks = function () {
        return this.workspace.getTopBlocks();
    };
    Workspace.prototype.addTopBlock = function (block) {
        this.workspace.addTopBlock(block);
    };
    Workspace.prototype.getXML = function () {
        return Blockly.Xml.workspaceToDom(this.workspace);
    };
    Workspace.prototype.getStringyfiedXML = function () {
        return Blockly.Xml.domToText(this.getXML());
    };
    Workspace.prototype.getPrettyStringyfiedXML = function () {
        return Blockly.Xml.domToPrettyText(this.getXML());
    };
    return Workspace;
}());
exports.Workspace = Workspace;
//# sourceMappingURL=Workspace.js.map