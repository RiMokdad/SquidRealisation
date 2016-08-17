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
var Messages_1 = require("./../Util/Messages");
var EventHandler_1 = require("./../Util/EventHandler");
var EditorComponent = (function () {
    function EditorComponent() {
        EventHandler_1.EventHandler.SetEditorComponent(this);
        this.toolboxManager = new toolboxManager_1.ToolboxManager();
        this.decoder = new Decoder_1.Decoder();
        this.placeholderTags = "tags1, tags2,...";
        this.tagsSearch = "";
    }
    EditorComponent.prototype.OnLoad = function () {
        this.workspace = Workspace_1.Workspace.Inject("blocklyDiv", false, this.toolboxManager.GetToolbox());
        this.workspace.BindDecoder(this.decoder);
        var id = this.GetBlockIdInUrl();
        if (id != null) {
            this.RestoreBlock(id);
        }
        else {
            this.workspace.Initialize();
        }
        this.ac = new Ac();
        this.Refresh();
    };
    EditorComponent.prototype.Clear = function () {
        this.workspace.Clear();
    };
    EditorComponent.prototype.Save = function () {
        //TODO insert local save
        this.SaveDecoderToServer();
    };
    EditorComponent.prototype.Supress = function () {
        var _this = this;
        //TODO insert code to supress a decoder onto the server 
        var deleteConfirmed = function () {
            _this.decoder = new Decoder_1.Decoder();
            _this.workspace.BindDecoder(_this.decoder);
            Messages_1.Messages.Alert("Décodeur supprimé");
        };
        var deletion = function () {
            server_request_1.Requests.DeleteDecoder(_this.decoder, deleteConfirmed);
        };
        server_request_1.Requests.FindUsages(this.decoder.Id, deletion);
    };
    EditorComponent.prototype.Refresh = function () {
        var _this = this;
        //TODO insert code for toolbox management
        //TODO Call to server for updating blocks informations
        this.workspace.UpdateToolbox(this.toolboxManager.GetToolbox(true));
        var callback = function (map) {
            _this.toolboxManager.UpdateBlocksInfos(map);
            //create or update autocompletion
            _this.ac.SetTagsAutoComplete(_this.toolboxManager.GetTagsList.bind(_this.toolboxManager));
            _this.ac.SetCategoryAutoComplete(_this.toolboxManager.GetCategoryList.bind(_this.toolboxManager));
            _this.ac.SetSearchBarAutoComplete(_this.toolboxManager.GetTagsList.bind(_this.toolboxManager));
        };
        server_request_1.Requests.GetCategories(callback);
        this.workspace.UpdateToolbox(this.toolboxManager.GetToolbox());
        //TESTS DELETE       
    };
    EditorComponent.prototype.SearchTag = function () {
        this.toolboxManager.UpdateResearch(this.tagsSearch);
        this.workspace.UpdateToolbox(this.toolboxManager.GetToolbox());
    };
    EditorComponent.prototype.OpenTab = function (id) {
        window.open(this.GetBaseUrl() + (id ? "#" + id : ""));
    };
    EditorComponent.prototype.SaveDecoderToServer = function () {
        if (this.workspace.IsADecoder()) {
            this.workspace.CompleteDecoder(this.decoder);
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
            //console.log(this.decoder);
            _this.decoder.Id = id;
            _this.workspace.RestoreBlocks(_this.decoder);
        };
        console.log(this.decoder);
        server_request_1.Requests.GetDecoderDef(id, this.decoder, callback);
        return null;
    };
    /* Url based methods */
    EditorComponent.prototype.GetBaseUrl = function () {
        return "index.html";
    };
    EditorComponent.prototype.GetBlockIdInUrl = function () {
        return parseInt(window.location.hash.substring(1)) || null;
    };
    EditorComponent.prototype.SetUrl = function () {
        window.location.hash = this.decoder.Id ? "" + this.decoder.Id : "";
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
    EventHandler_1.EventHandler.OnLoad();
};
//# sourceMappingURL=editor.viewmodel.js.map