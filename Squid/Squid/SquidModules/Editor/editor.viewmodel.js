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
var Decoder_1 = require("./../Util/Decoder");
var toolboxManager_1 = require("./../Toolbox/toolboxManager");
var Workspace_1 = require("./../BlocklyWrapper/Workspace");
var server_request_1 = require("../Request/server_request");
var EditorComponent = (function () {
    function EditorComponent() {
        this.decoder = new Decoder_1.Decoder();
        this.tagsSearch = "";
        this.placeholderTags = "tags1, tags2,...";
        this.toolboxManager = new toolboxManager_1.ToolboxManager();
        this.initialized_ = false;
    }
    //Auto completion
    //Init() {
    //    Workspace.Inject("blocklyDiv", false, this.toolboxManager.toolboxHTML);
    //    if (window.location.hash !== "") {
    //        alert("chargera le bloc");
    //    }
    //}
    EditorComponent.prototype.Clear = function () {
        Workspace_1.Workspace.Clear();
    };
    EditorComponent.prototype.Save = function () {
        //TODO insert local save
        this.SaveDecoderToServer();
    };
    EditorComponent.prototype.Supress = function () {
        //TODO insert code to supress a decoder onto the server 
        var _this = this;
        server_request_1.Requests.FindUsages(this.decoder.Id);
        var deletion = function () {
            _this.decoder = new Decoder_1.Decoder();
            alert("Décodeur supprimé");
        };
        server_request_1.Requests.DeleteDecoder(this.decoder, deletion);
    };
    EditorComponent.prototype.Refresh = function () {
        //TODO insert code for toolbox management
        //TODO Call to server for updating blocks informations
        server_request_1.Requests.GetCategories(this.toolboxManager.UpdateBlocksInfos.bind(this.toolboxManager));
        this.toolboxManager.SetLoadingText(true);
        Workspace_1.Workspace.UpdateToolbox(this.toolboxManager.toolboxHTML);
        //TESTS autocomplete
        Ac.RefreshTags();
    };
    EditorComponent.prototype.SearchTag = function () {
        this.toolboxManager.UpdateResearch(this.tagsSearch);
        Workspace_1.Workspace.UpdateToolbox(this.toolboxManager.toolboxHTML);
    };
    EditorComponent.prototype.OpenTab = function () {
        window.open(this.GetBaseUrl());
    };
    EditorComponent.prototype.SaveDecoderToServer = function () {
        if (Workspace_1.Workspace.IsADecoder()) {
            Workspace_1.Workspace.CompleteDecoder(this.decoder);
            this.decoder.Tags = this.decoder.Tags.replace(/\s/g, "");
            server_request_1.Requests.SaveDecoder(this.decoder);
            this.SetUrl();
        }
        else {
            alert("Un des problèmes suivants se pose:" +
                "\n - Vous avez plus d'un bloc" +
                "\n - Le bloc n'est pas un bloc décodeur de base" +
                "\n - Vous n'avez rien à sauvegarder");
        }
    };
    EditorComponent.prototype.RestoreBlock = function (id) {
        var _this = this;
        var callback = function () {
            console.log(_this.decoder);
            Workspace_1.Workspace.RestoreBlocks(_this.decoder);
        };
        server_request_1.Requests.GetDecoderDef(id, this.decoder, callback);
        return null;
    };
    /* Url based methods */
    EditorComponent.prototype.GetBaseUrl = function () {
        return "index.html";
    };
    EditorComponent.prototype.GetBlockIdInUrl = function () {
        return parseInt(window.location.href.split("#")[1]);
    };
    EditorComponent.prototype.SetUrl = function () {
        window.location.hash = this.decoder.Id ? this.decoder.Id : "";
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
    if (window.location.hash !== "") {
        alert("chargera le bloc");
    }
    setTimeout(Ac.SetTagsAutocomplete(), 1000);
};
//# sourceMappingURL=editor.viewmodel.js.map