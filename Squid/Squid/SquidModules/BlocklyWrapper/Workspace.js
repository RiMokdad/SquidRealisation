"use strict";
var BlockInfos_1 = require("../Util/BlockInfos");
var Workspace = (function () {
    /**
     * /!\ DO NOT USE IT
     * @param cur_workspace
     */
    function Workspace(cur_workspace) {
        this.id = null;
        this.workspace = cur_workspace || new Blockly.Workspace();
        Workspace.singleton = this;
    }
    Workspace.Inject = function (anchor, trashcan, toolbox) {
        if (Workspace.singleton) {
            return Workspace.singleton;
        }
        document.getElementById(anchor).innerHTML = "";
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
        return new Workspace(workspace);
    };
    Workspace.GetInstance = function () {
        return Workspace.singleton;
    };
    /**
     * Generate the CSharp corresponding to the datas in the workspace
     */
    Workspace.prototype.GenerateCSharp = function () {
        return Blockly.CSharp.workspaceToCode(this.workspace);
    };
    Workspace.GenerateCSharp = function () {
        return Workspace.singleton.GenerateCSharp();
    };
    /**
     * Generate the French corresponding to the datas in the workspace
     */
    Workspace.prototype.GenerateFrench = function () {
        return Blockly.French.workspaceToCode(this.workspace);
    };
    Workspace.GenerateFrench = function () {
        return Workspace.singleton.GenerateFrench();
    };
    /**
     * Returns an object BlockInfos that contains the main informations needed in the toolbox.
     */
    Workspace.prototype.GetBlockInfos = function () {
        var blocks = this.workspace.getTopBlocks();
        var id = blocks[0].id;
        var name = blocks[0].getProcedureDef()[0];
        var parametersArray = blocks[0].arguments_;
        return new BlockInfos_1.BlockInfos(id, name, parametersArray, null, null, true);
    };
    Workspace.GetBlockInfos = function () {
        return Workspace.singleton.GetBlockInfos();
    };
    Workspace.prototype.GetName = function () {
        return (this.IsADecoder() ? this.workspace.getTopBlocks()[0].getProcedureDef()[0] : null);
    };
    Workspace.GetName = function () {
        return Workspace.singleton.GetName();
    };
    /**
     * Checks if the workspace contains only one element and that element is a decoder.
     */
    Workspace.prototype.IsADecoder = function () {
        var blocks = this.workspace.getTopBlocks();
        return (blocks.length == 1 && blocks[0].getProcedureDef);
    };
    Workspace.IsADecoder = function () {
        return Workspace.singleton.IsADecoder();
    };
    Workspace.prototype.Clear = function () {
        this.workspace.clear();
    };
    Workspace.Clear = function () {
        Workspace.singleton.Clear();
    };
    Workspace.prototype.GetXML = function () {
        return Blockly.Xml.workspaceToDom(this.workspace);
    };
    Workspace.GetXML = function () {
        return Workspace.singleton.GetXML();
    };
    Workspace.prototype.GetStringXML = function () {
        return Blockly.Xml.domToText(this.GetXML());
    };
    Workspace.GetStringXML = function () {
        return Workspace.singleton.GetStringXML();
    };
    Workspace.prototype.GetPrettyStringXML = function () {
        return Blockly.Xml.domToPrettyText(this.GetXML());
    };
    Workspace.GetPrettyStringXML = function () {
        return Workspace.singleton.GetPrettyStringXML();
    };
    /************************ Workspace and storage **************************************************/
    Workspace.prototype.SaveLocal = function (location) {
        // TODO if we implement a local storage
    };
    Workspace.prototype.RestoreBlock = function (decoder) {
        //TODO 
    };
    Workspace.RestoreBlock = function (decoder) {
        this.RestoreBlock(decoder);
    };
    /**************************** Toolbox **********************************/
    Workspace.prototype.UpdateToolbox = function (toolboxTree) {
        this.workspace.updateToolbox(toolboxTree);
    };
    Workspace.UpdateToolbox = function (toolboxTree) {
        Workspace.singleton.UpdateToolbox(toolboxTree);
    };
    return Workspace;
}());
exports.Workspace = Workspace;
//# sourceMappingURL=Workspace.js.map