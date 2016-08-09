"use strict";
var BlockInfos_1 = require("../Util/BlockInfos");
var Workspace = (function () {
    /**
     * /!\ THIS CONSTRUCTOR IS VISIBLE BUT PLEASE, PREFER THE STATIC INJECT
     * @param cur_workspace
     */
    function Workspace(cur_workspace) {
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
    Workspace.prototype.GenerateCSharp = function () {
        return Blockly.CSharp.workspaceToCode(this.workspace);
    };
    Workspace.prototype.GenerateFrench = function () {
        return Blockly.French.workspaceToCode(this.workspace);
    };
    Workspace.prototype.GetBlockInfos = function () {
        //TODO give the good informations
        // the first one should be the id
        return new BlockInfos_1.BlockInfos(null, null, null, null, null, true);
    };
    Workspace.prototype.IsADecoder = function () {
        var blocks = this.workspace.getTopBlocks();
        if (blocks.length == 1 && blocks[0].getDef) {
            return true;
        }
        return false;
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
    Workspace.prototype.SaveWorkspace = function (location) {
        // TODO after creating the appropriate functions
        //var baseUrl = Squid.Storage.BaseUrl();
        //Squid.Storage.SaveFunction(workspace);
        //backupBlocks(workspace, baseUrl + location);
    };
    //TO BE CONTINUED
    Workspace.prototype.SaveToServer = function () {
        if (this.IsADecoder()) {
            var blockId = this.GetBlockInfos().id;
        }
        else {
            alert("La sauvegarde serveur a echoué. Le workspace contient plus d'un block ou votre décodeur n'est pas du type fonction.");
        }
    };
    //SaveFunction() {
    //}
    Workspace.prototype.BackupBlocks = function (url) {
        if ("localStorage" in window) {
            var prettyText = this.PrettyStringyfiedXML();
            var xmlText = this.StringyfiedXML();
            var code = this.GenerateCSharp();
        }
    };
    //RestoreBlocks(url: any) {
    //}
    //RestoreBlock(url: any) {
    //}
    /**************************** Variables *******************************************************/
    Workspace.prototype.RefreshVariables = function () {
        Blockly.Variables.allVariables(this.workspace);
    };
    //TODO : catmap to be created and changed to a map of blockinfo and id of decoder
    Workspace.prototype.RefreshCategories = function (catmap) {
    };
    return Workspace;
}());
exports.Workspace = Workspace;
//# sourceMappingURL=Workspace.js.map