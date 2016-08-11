"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var BlockInfos_1 = require("./../Util/BlockInfos");
var toolboxManager_1 = require("./../Toolbox/toolboxManager");
var Workspace_1 = require("./../BlocklyWrapper/Workspace");
var EditorComponent = (function () {
    function EditorComponent() {
        this.decoder = new BlockInfos_1.BlockInfos();
        this.tagsSearch = "";
        this.placeholderTags = "tags1, tags2,...";
        this.toolboxManager = new toolboxManager_1.ToolboxManager();
        this.initialized_ = false;
    }
    EditorComponent.prototype.Clear = function () {
        Workspace_1.Workspace.GetInstance().Clear();
    };
    EditorComponent.prototype.Save = function () {
        //TODO insert code for saving decodeur onto the web
        if (Workspace_1.Workspace.GetInstance().IsADecoder()) {
            this.decoder = Workspace_1.Workspace.GetInstance().GetBlockInfos();
            this.decoder.id = null; //Call to the server for saving the current block
        }
    };
    EditorComponent.prototype.Supress = function () {
        //TODO insert code to supress a decoder onto the server 
        //Verify existance 
        //Ask the list of direct depencies for function calls
        //Supress the block if the user really wants it
    };
    EditorComponent.prototype.Refresh = function () {
        //TODO insert code for toolbox management
        var blocksInformations = new Array();
        //TODO Call to server for updating blocks informations
        Squid.Requests.GetCategories(this.toolboxManager.UpdateBlocksInfos);
        //this.toolboxManager.UpdateBlocksInfos(blocksInformations);
        this.toolboxManager.UpdateCategories();
        Workspace_1.Workspace.GetInstance().UpdateToolbox(this.toolboxManager.toolboxHTML);
    };
    EditorComponent.prototype.SearchTag = function () {
        this.toolboxManager.UpdateResearch(this.tagsSearch.split(","));
        Workspace_1.Workspace.GetInstance().UpdateToolbox(this.toolboxManager.toolboxHTML);
    };
    EditorComponent.prototype.OpenTab = function () {
        window.open(this.GetBaseUrl());
    };
    EditorComponent.prototype.SaveDecoderToServer = function () {
        var bool = Workspace_1.Workspace.GetInstance().SaveAsDecoderToServer();
        alert(bool);
    };
    /* Url based methods */
    EditorComponent.prototype.GetBaseUrl = function () {
        return "index.html";
    };
    EditorComponent.prototype.GetBlockIdInUrl = function () {
        return parseInt(window.location.href.split("#")[1]);
    };
    EditorComponent.prototype.SetUrl = function () {
        window.location.href = "index.html" + (this.decoder.id ? "#" + this.decoder.id : "");
    };
    EditorComponent = __decorate([
        core_1.Component({
            selector: "editor",
            templateUrl: "SquidModules/Editor/editor.view.html"
        }), 
        __metadata('design:paramtypes', [])
    ], EditorComponent);
    return EditorComponent;
}());
exports.EditorComponent = EditorComponent;
/**
 * Things to do on with the workspace on load of the window
 * @returns {}
 */
window.onload = function () {
    var tbMan = new toolboxManager_1.ToolboxManager();
    Workspace_1.Workspace.Inject("blocklyDiv", false, tbMan.toolboxHTML);
};
//# sourceMappingURL=editor.viewmodel.js.map