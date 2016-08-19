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
var signalr_methods_1 = require("../SignalR/signalr_methods");
var Messages_1 = require("./../Util/Messages");
var EventHandler_1 = require("./../Util/EventHandler");
(function (RefreshState) {
    RefreshState[RefreshState["UP_TO_DATE"] = 0] = "UP_TO_DATE";
    RefreshState[RefreshState["PENDING"] = 1] = "PENDING";
    RefreshState[RefreshState["OUT_DATED"] = 2] = "OUT_DATED";
})(exports.RefreshState || (exports.RefreshState = {}));
var RefreshState = exports.RefreshState;
var EditorComponent = (function () {
    function EditorComponent() {
        EventHandler_1.EventHandler.SetEditorComponent(this);
        this.serverNotifications = new signalr_methods_1.ServerNotifications();
        this.toolboxManager = new toolboxManager_1.ToolboxManager();
        this.decoder = new Decoder_1.Decoder();
        this.placeholderTags = "tags1, tags2,...";
        this.tagsSearch = "";
        this.refreshState = RefreshState.OUT_DATED;
    }
    /**
     * Loaded after the whole page has been loaded
     */
    EditorComponent.prototype.OnLoad = function () {
        this.workspace = Workspace_1.Workspace.Inject("blocklyDiv", false, this.toolboxManager.GetToolbox());
        this.workspace.BindDecoder(this.decoder);
        this.decoder.Id = this.GetBlockIdInUrl();
        if (this.decoder.Id) {
            this.LoadModeBloc();
        }
        else {
            this.LoadModeFromScratch();
        }
        this.ac = new Ac();
        var updatevar = function (variables) {
            SimpleVariables.UpdateVariables(variables);
        };
        server_request_1.Requests.ReloadVariables(updatevar);
        this.pollRefresh();
    };
    EditorComponent.prototype.LoadModeBloc = function () {
        this.RestoreBlock(this.decoder.Id);
    };
    EditorComponent.prototype.LoadModeFromScratch = function () {
        this.workspace.Initialize();
    };
    EditorComponent.prototype.pollRefresh = function () {
        var _this = this;
        var time = 1000;
        switch (this.refreshState) {
            case RefreshState.OUT_DATED:
                this.Refresh();
                break;
            case RefreshState.PENDING:
                time = 4000;
                break;
            case RefreshState.UP_TO_DATE:
            default:
                break;
        }
        var func = function () { _this.pollRefresh(); };
        window.setTimeout(func, time);
    };
    /**
     * Clear
     */
    EditorComponent.prototype.Clear = function () {
        this.workspace.Clear();
        this.workspace.Initialize();
        this.SetUrl();
    };
    /**
     * Supress on the server the decoder currently in the editor if it has already been saved once.
     */
    EditorComponent.prototype.Supress = function () {
        var _this = this;
        var deleteConfirmed = function () {
            _this.Clear();
            _this.decoder = new Decoder_1.Decoder();
            _this.workspace.BindDecoder(_this.decoder);
            _this.SetUrl();
            Messages_1.Messages.Notify("Décodeur supprimé");
        };
        var deletion = function () {
            server_request_1.Requests.DeleteDecoder(_this.decoder, deleteConfirmed);
        };
        server_request_1.Requests.FindUsages(this.decoder.Id, deletion);
    };
    /**
     * Refresh the toolbox, called automatically but may be forced by the user
     */
    EditorComponent.prototype.Refresh = function () {
        var _this = this;
        this.workspace.UpdateToolbox(this.toolboxManager.GetToolbox(true));
        var success = function (list) {
            // Update toolbox
            _this.toolboxManager.UpdateBlocksInfos(list, true);
            _this.workspace.UpdateToolbox(_this.toolboxManager.GetToolbox());
            _this.refreshState = RefreshState.UP_TO_DATE;
            //create or update autocompletion
            _this.ac.SetTagsAutoComplete(_this.toolboxManager.GetTagsList.bind(_this.toolboxManager));
            _this.ac.SetCategoryAutoComplete(_this.toolboxManager.GetCategoryList.bind(_this.toolboxManager));
            _this.ac.SetSearchBarAutoComplete(_this.toolboxManager.GetTagsList.bind(_this.toolboxManager));
            Messages_1.Messages.Update();
        };
        var fail = function () {
            _this.refreshState = RefreshState.OUT_DATED;
        };
        this.refreshState = RefreshState.PENDING;
        server_request_1.Requests.GetBlocksInfos(success, fail);
        //test specs
        //Requests.FindDescendants(this.decoder);
    };
    /**
     * Update the toolbox with results of the research. You can search multiple tags
     */
    EditorComponent.prototype.SearchTag = function () {
        this.toolboxManager.UpdateResearch(this.tagsSearch);
        this.workspace.UpdateToolbox(this.toolboxManager.GetToolbox());
    };
    EditorComponent.prototype.OpenTab = function (param1) {
        if (param1) {
            var decoder = null;
            if (typeof (param1) == "string") {
                decoder = this.toolboxManager.GetDecoderByName(param1);
            }
            else if (typeof (param1) == "number") {
                decoder = this.toolboxManager.GetDecoderById(param1);
            }
            if (decoder) {
                window.open(EditorComponent.CreateIdUrl(decoder.id));
                return;
            }
            else {
                Messages_1.Messages.Alert("Impossible de charger ce décodeur");
            }
        }
        window.open(EditorComponent.GetBaseUrl());
    };
    /**
     * Binding for save
     */
    EditorComponent.prototype.Save = function () {
        //TODO insert local save
        this.SaveDecoderToServer();
    };
    /**
     * Saves the decoder to the server
     */
    EditorComponent.prototype.SaveDecoderToServer = function () {
        var _this = this;
        var updateurl = function () {
            _this.SetUrl();
        };
        if (this.workspace.IsADecoder()) {
            this.workspace.CompleteDecoder(this.decoder);
            this.decoder.Tags = this.decoder.Tags.replace(/\s/g, "");
            server_request_1.Requests.SaveDecoder(this.decoder, updateurl);
            this.SetUrl();
        }
        else {
            alert("Un des problèmes suivants se pose:" +
                "\n - Vous avez plus d'un bloc" +
                "\n - Le bloc n'est pas un bloc décodeur de base" +
                "\n - Vous n'avez rien à sauvegarder");
        }
        //test
        server_request_1.Requests.SaveVariables(SimpleVariables.GetVariablesAsJson());
    };
    /**
     * Restore the block with the given id
     * @param id
     */
    EditorComponent.prototype.RestoreBlock = function (id) {
        var _this = this;
        var callback = function (decoder) {
            decoder.Id = id;
            _this.workspace.RestoreBlocks(decoder);
            Messages_1.Messages.Alert("Le bloc " + decoder.Name + " a \u00E9t\u00E9 recharg\u00E9.");
            _this.workspace.CompleteDecoder(decoder);
        };
        server_request_1.Requests.GetDecoderDef(id, this.decoder, callback);
        this.SetUrl();
        return null;
    };
    /* ============ URL OPERATIONS ============== */
    /**
     * Gives the base url of this page.
     */
    EditorComponent.GetBaseUrl = function () {
        return "index.html";
    };
    /**
     * Create the good url for loading a decoder with the given id
     * @param id
     */
    EditorComponent.CreateIdUrl = function (id) {
        return EditorComponent.GetBaseUrl() + "#" + id;
    };
    /**
     * Get the id after the hash in the url
     * @return return the id as a number, or null if there is no id
     */
    EditorComponent.prototype.GetBlockIdInUrl = function () {
        return parseInt(window.location.hash.substring(1)) || null;
    };
    /**
     * Set the hash of this page to the decoder id
     */
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
 * Things to do with the workspace on load of the window
 * @returns {}
 */
window.onload = function () {
    EventHandler_1.EventHandler.OnLoad();
};
//# sourceMappingURL=editor.viewmodel.js.map