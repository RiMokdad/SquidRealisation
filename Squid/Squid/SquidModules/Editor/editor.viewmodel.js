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
var toolboxManager_1 = require("./../Toolbox/toolboxManager");
var Workspace_1 = require("./../BlocklyWrapper/Workspace");
var EditorComponent = (function () {
    function EditorComponent() {
        this.name = "Editeur";
        this.tags = "";
        this.placeholderTags = "tags1, tags2,...";
        this.initialized_ = false;
    }
    EditorComponent.prototype.Init = function () {
        if (!this.initialized_) {
            this.toolboxManager = new toolboxManager_1.ToolboxManager();
            var xmlTb = this.toolboxManager.toolboxHTML;
            this.workspace = Workspace_1.Workspace.Inject("blocklyDiv", false, xmlTb);
            this.initialized_ = true;
        }
    };
    EditorComponent.prototype.Clear = function () {
        //TODO insert code for clearing workspace
    };
    EditorComponent.prototype.Save = function () {
        //TODO insert code for saving decodeur onto the web
        if (this.workspace.IsADecoder()) {
            this.decoder = this.workspace.GetBlockInfos();
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
        //Call to server for updating blocks informations
        this.toolboxManager.UpdateBlocksInfos(blocksInformations);
        this.toolboxManager.UpdateCategories();
        this.workspace.UpdateToolbox(this.toolboxManager.toolboxHTML);
    };
    EditorComponent.prototype.SearchTag = function () {
        //TODO insert code for toolbox management
        this.toolboxManager.UpdateResearch(this.tags.split(","));
        this.workspace.UpdateToolbox(this.toolboxManager.toolboxHTML);
    };
    EditorComponent.prototype.OpenTab = function () {
        //TODO insert code for opening a new tab
    };
    EditorComponent.prototype.SaveDecoderToServer = function () {
        var bool = this.workspace.SaveAsDecoderToServer();
        alert(bool);
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
//# sourceMappingURL=editor.viewmodel.js.map