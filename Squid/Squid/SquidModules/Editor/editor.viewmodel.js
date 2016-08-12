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
    EditorComponent.prototype.Clear = function () {
        Workspace_1.Workspace.Clear();
    };
    EditorComponent.prototype.Save = function () {
        //TODO insert local save
        this.SaveDecoderToServer();
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
        server_request_1.Requests.GetCategories(this.toolboxManager.UpdateBlocksInfos.bind(this.toolboxManager));
        this.toolboxManager.UpdateBlocksInfos(blocksInformations);
        this.toolboxManager.UpdateCategories();
        Workspace_1.Workspace.UpdateToolbox(this.toolboxManager.toolboxHTML);
    };
    EditorComponent.prototype.SearchTag = function () {
        this.toolboxManager.UpdateResearch(this.tagsSearch.split(","));
        Workspace_1.Workspace.UpdateToolbox(this.toolboxManager.toolboxHTML);
    };
    EditorComponent.prototype.OpenTab = function () {
        window.open(this.GetBaseUrl());
    };
    EditorComponent.prototype.SaveDecoderToServer = function () {
        //TODO insert code for saving decodeur onto the web
        console.log("Saving");
        if (Workspace_1.Workspace.IsADecoder())
            this.decoder.Name = Workspace_1.Workspace.GetName();
        this.decoder.Code = Workspace_1.Workspace.GenerateCSharp();
        this.decoder.FrenchSpec = Workspace_1.Workspace.GenerateFrench();
        this.decoder.Xml = Workspace_1.Workspace.GetStringXML();
        this.decoder.Editable = true;
        server_request_1.Requests.SaveDecoder(decoder);
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
{
    alert("Un des problèmes suivants se pose:" +
        "\n - Vous avez plus d'un bloc" +
        "\n - Le bloc n'est pas un bloc décodeur de base" +
        "\n - Vous n'avez rien à sauvegarder");
}
RestoreBlock(id, number);
any;
{
    //TODO construct the decoder in GetDecoderDef(id) function 
    var decoder = new Decoder_1.Decoder();
    server_request_1.Requests.GetDecoderDef(id, decoder);
    if (decoder.Editable == true) {
        return decoder;
    }
    return null;
}
RestoreBlock(id, number);
any;
{
    //TODO construct the decoder in GetDecoderDef(id) function 
    var decoder = server_request_1.Requests.GetDecoderDef(id);
    if (decoder.editable == true) {
        return decoder;
    }
    return null;
}
GetBaseUrl();
string;
{
    return "index.html";
}
GetBlockIdInUrl();
number;
{
    return parseInt(window.location.href.split("#")[1]);
}
SetUrl();
{
    window.location.href = "index.html" + (this.decoder.Id ? "#" + this.decoder.Id : "");
}
/**
 * Things to do on with the workspace on load of the window
 * @returns {}
 */
window.onload = function () {
    var tbMan = new toolboxManager_1.ToolboxManager();
    Workspace_1.Workspace.Inject("blocklyDiv", false, tbMan.toolboxHTML);
};
//# sourceMappingURL=editor.viewmodel.js.map