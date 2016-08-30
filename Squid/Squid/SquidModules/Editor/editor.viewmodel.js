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
var Messages_1 = require("./../Util/Messages");
var EventHandler_1 = require("./../Util/EventHandler");
var Onglet_1 = require("./../Util/Onglet");
var Workspace_1 = require("./../BlocklyWrapper/Workspace");
var variables_set_viewmodel_1 = require("../Variables/variables_set.viewmodel");
var server_request_1 = require("../Request/server_request");
var signalr_methods_1 = require("../SignalR/signalr_methods");
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
        this.toolboxManager = EventHandler_1.SingleAccess.GetToolboxManager();
        this.decoder = new Decoder_1.Decoder();
        this.placeholderTags = "tags1, tags2,...";
        this.tagsSearch = "";
        this.refreshState = RefreshState.OUT_DATED;
        this.ToggleVariables(true);
    }
    /**
     * Loaded after the whole page has been loaded
     */
    EditorComponent.prototype.OnLoad = function () {
        this.workspace = Workspace_1.Workspace.Inject("blocklyDiv", false, this.toolboxManager.GetToolbox());
        var load = document.getElementById("square");
        load.style.opacity = "0";
        setTimeout(1000, function () { load.remove(); });
        this.workspace.BindDecoder(this.decoder);
        this.decoder.Id = Onglet_1.Onglet.GetBlockIdInUrl();
        if (this.decoder.Id) {
            if (this.decoder.Id === -1) {
                this.LoadModeEncapsulateBlock();
            }
            else {
                this.LoadModeBloc();
            }
        }
        else {
            this.LoadModeFromScratch();
        }
        this.ac = new Ac();
        var updatevar = function (variables) {
            SimpleVariables.UpdateVariables(variables);
        };
        //Requests.ReloadVariables(updatevar);
        this.pollRefresh();
    };
    EditorComponent.prototype.LoadModeBloc = function () {
        this.RestoreBlock(this.decoder.Id);
    };
    EditorComponent.prototype.LoadModeFromScratch = function () {
        this.workspace.Initialize();
    };
    EditorComponent.prototype.LoadModeEncapsulateBlock = function () {
        this.workspace.Initialize(window.localStorage[Onglet_1.Onglet.GetBaseUrl()]);
        Onglet_1.Onglet.SetUrlDefault();
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
        Onglet_1.Onglet.SetUrl(this.decoder);
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
            Onglet_1.Onglet.SetUrl(_this.decoder);
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
    };
    /**
     * Update the toolbox with results of the research. You can search multiple tags
     */
    EditorComponent.prototype.SearchTag = function () {
        this.toolboxManager.UpdateResearch(this.tagsSearch);
        this.workspace.UpdateToolbox(this.toolboxManager.GetToolbox());
        //test spec 
        //Requests.FindDescendants(this.decoder);
    };
    EditorComponent.prototype.OpenTab = function (param1) {
        if (param1) {
            var decoder = void 0;
            switch (typeof (param1)) {
                case "string":
                    decoder = this.toolboxManager.GetDecoderByName(param1);
                    break;
                case "number":
                    decoder = this.toolboxManager.GetDecoderById(param1);
                    break;
                default:
                    Messages_1.Messages.Alert("Impossible de charger ce décodeur");
                    return;
            }
            Onglet_1.Onglet.OpenTab(decoder);
        }
        else {
            Onglet_1.Onglet.OpenTab();
        }
    };
    // not in the right file
    EditorComponent.prototype.ToggleVariables = function (show) {
        if (show != null) {
            this.variablesShown = show;
        }
        if (!this.variablesShown) {
            $("#variables").removeClass("variables-close");
            $("#editor").removeClass("edition-window-full");
            $("#variables").addClass("variables-open");
            $("#editor").addClass("edition-window-reduce");
        }
        else {
            $("#variables").removeClass("variables-open");
            $("#editor").removeClass("edition-window-reduce");
            $("#variables").addClass("variables-close");
            $("#editor").addClass("edition-window-full");
        }
        var time = 0;
        var inc = 10;
        var res = function () {
            time += inc;
            window.dispatchEvent(new Event("resize"));
            if (time < 200) {
                setTimeout(res, inc);
            }
        };
        if (this.workspace)
            setTimeout(res, 200);
        return (this.variablesShown = !this.variablesShown);
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
            Onglet_1.Onglet.SetUrl(_this.decoder);
        };
        if (this.workspace.IsADecoder()) {
            this.workspace.CompleteDecoder(this.decoder);
            this.decoder.Tags = this.decoder.Tags.replace(/\s/g, "");
            var fail_1 = function (txt) {
                console.log(txt);
                Messages_1.Messages.Alert("Erreur lors de la sauvegarde\nCause possible :\n" +
                    "Le nom de votre décodeur est déjà pris par un autre décodeur.\n" +
                    "\nAfficher la console pour voir les détails de l'erreur.");
            };
            if (!this.decoder.Editable) {
                this.decoder.Code = this.decoder.FrenchSpec = null;
            }
            server_request_1.Requests.SaveDecoder(this.decoder, updateurl, fail_1);
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
            _this.decoder.update(Decoder_1.Decoder.ObjectToDecoder(decoder));
            _this.workspace.RestoreBlocks(_this.decoder);
            _this.workspace.CompleteDecoder(_this.decoder);
            if (!_this.decoder.Editable) {
                _this.workspace.SetVisible(false);
                Messages_1.Messages.Alert("Le décodeur n'est pas éditable, il reste consultable dans la section 'Spécifications'");
                return;
            }
            else {
                _this.workspace.SetVisible(true);
                Messages_1.Messages.Alert("Le d\u00E9codeur " + decoder.Name + " a \u00E9t\u00E9 recharg\u00E9.");
                Onglet_1.Onglet.SetUrl(_this.decoder);
            }
        };
        server_request_1.Requests.GetDecoderDef(id, this.decoder, callback);
        return null;
    };
    EditorComponent = __decorate([
        core_1.Component({
            selector: "editor",
            templateUrl: "SquidModules/Editor/editor.view.html",
            directives: [variables_set_viewmodel_1.ConfigSetComponent, variables_set_viewmodel_1.InventorySetComponent]
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