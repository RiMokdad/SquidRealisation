"use strict";
var BlockInfos_1 = require("../Util/BlockInfos");
var Workspace = (function () {
    /**
     * /!\ THIS CONSTRUCTOR IS VISIBLE BUT PLEASE, PREFER THE STATIC INJECT
     * @param cur_workspace
     */
    function Workspace(cur_workspace) {
        this.id = null;
        this.workspace = cur_workspace || new Blockly.Workspace();
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
        return new Workspace(workspace);
    };
    /**
     * Generate the CSharp corresponding to the datas in the workspace
     */
    Workspace.prototype.GenerateCSharp = function () {
        return Blockly.CSharp.workspaceToCode(this.workspace);
    };
    /**
     * Generate the French corresponding to the datas in the workspace
     */
    Workspace.prototype.GenerateFrench = function () {
        return Blockly.French.workspaceToCode(this.workspace);
    };
    Workspace.prototype.GetBlockInfos = function () {
        var blocks = this.workspace.getTopBlocks();
        var id = blocks[0].id;
        var name = blocks[0].getProcedureDef()[0];
        var parametersArray = blocks[0].arguments_;
        return new BlockInfos_1.BlockInfos(id, name, parametersArray, null, null, true);
    };
    Workspace.prototype.IsADecoder = function () {
        var blocks = this.workspace.getTopBlocks();
        return (blocks.length == 1 && blocks[0].getDef);
    };
    Workspace.prototype.Clear = function () {
        this.workspace.clear();
    };
    Workspace.prototype.GetXML = function () {
        return Blockly.Xml.workspaceToDom(this.workspace);
    };
    Workspace.prototype.StringyfiedXML = function () {
        return Blockly.Xml.domToText(this.GetXML());
    };
    Workspace.prototype.PrettyStringyfiedXML = function () {
        return Blockly.Xml.domToPrettyText(this.GetXML());
    };
    /************************ Workspace and storage **************************************************/
    Workspace.prototype.SaveLocal = function (location) {
        // TODO if we implement a local storage
    };
    Workspace.prototype.SaveAsDecoderToServer = function () {
        if (this.IsADecoder()) {
            var blockId = this.GetBlockInfos().id;
            //TODO request the server to save the block 
            return true;
        }
        else {
            return false;
        }
    };
    ////BackupBlocks(url: any) {
    ////    if ("localStorage" in window) {
    ////        var prettyText = this.PrettyStringyfiedXML();
    ////        var xmlText = this.StringyfiedXML();
    ////        var code = this.GenerateCSharp();
    ////        //Request.SaveDecoder(code, xmlTesx);
    ////    }
    ////}
    Workspace.prototype.RestoreBlock = function (id) {
        //TODO ask the server for the block definition corresponding to the id
    };
    /**************************** Variables **********************************/
    Workspace.prototype.UpdateToolbox = function (toolboxTree) {
        this.workspace.updateToolbox(toolboxTree);
    };
    return Workspace;
}());
exports.Workspace = Workspace;
//# sourceMappingURL=Workspace.js.map