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
var Onglet_1 = require("./../Util/Onglet");
var Messages_1 = require("./../Util/Messages");
var EventHandler_1 = require("./../Util/EventHandler");
var server_request_1 = require("../Request/server_request");
var SpecComponent = (function () {
    function SpecComponent() {
        this.decoder = null;
        this.decoderList = new Array();
        this.toolboxMan = EventHandler_1.SingleAccess.GetToolboxManager();
        this.decoder = new Decoder_1.Decoder();
        this.Init();
    }
    SpecComponent.prototype.Init = function () {
        this.decoder.Id = -1;
        this.decoder.FrenchSpec = "L'ensemble des données de la spec du décodeur est affiché ici" +
            "\nCliquez à gauche sur un décodeur pour afficher ses specifications ainsi que la specification des modules dont il dépend. " +
            "\nUn clic sur une specification ouvre la définition si possible.";
        this.decoder.Code = "L'ensemble du code du décodeur est affiché ici." +
            "\nCliquez à gauche sur un décodeur pour afficher son code ainsi que le code des décodeurs dont il dépend" +
            "\nUn clic sur du code ouvre la définition si disponible.";
        this.decoder.Name = "Nom de mon décodeur";
        this.decoder.Tags = "Les tags pour effectuer des recherches";
        this.decoder.Category = "Des catégories pour pouvoir ranger le bloc";
        this.decoder.Editable = false;
        this.DisplaySpec();
    };
    SpecComponent.prototype.Switch = function (step) {
        var code = document.getElementsByClassName("content-code");
        var upside;
        var downside;
        if (step == 0) {
            upside = code[0];
            downside = code[1];
        }
        else if (step == 1) {
            upside = code[1];
            downside = code[0];
        }
        else {
            return;
        }
        downside.style.visibility = "visible";
        upside.style.transform = "rotateY(180deg)";
        upside.style.visibility = "hidden";
        downside.style.transform = "rotateY(360deg)";
    };
    SpecComponent.prototype.Refresh = function () {
    };
    SpecComponent.prototype.OpenTab = function (decoder) {
        if (decoder && decoder.Editable) {
            console.log(decoder);
            console.log(decoder.Editable);
            var bi = Decoder_1.Decoder.toBlockInfos(decoder);
            Onglet_1.Onglet.OpenTab(bi);
        }
        else {
            Messages_1.Messages.Notify("Not editable");
        }
    };
    SpecComponent.prototype.Select = function (bi) {
        var decoder = Decoder_1.Decoder.fromBlockInfos(bi);
        this.SetDecoder(decoder);
    };
    SpecComponent.prototype.SetDecoder = function (decoder) {
        var _this = this;
        this.decoder = decoder;
        var func = function () {
            _this.decoderList.length = 0;
            _this.DisplaySpec();
        };
        server_request_1.Requests.GetDecoderDef(this.decoder.Id, this.decoder, func);
    };
    SpecComponent.prototype.DisplaySpec = function () {
        var _this = this;
        if (this.decoder.Id !== -1) {
            var callback = function (res) {
                for (var i = 0; i < res.length; i++) {
                    _this.decoderList.push(Decoder_1.Decoder.ObjectToDecoder(res[i]));
                }
            };
            server_request_1.Requests.FindDescendants(this.decoder, callback);
        }
        else {
            this.decoderList.push(this.decoder);
        }
    };
    SpecComponent = __decorate([
        core_1.Component({
            selector: "spec",
            templateUrl: "SquidModules/Spec_And_Code/spec.view.html"
        }), 
        __metadata('design:paramtypes', [])
    ], SpecComponent);
    return SpecComponent;
}());
exports.SpecComponent = SpecComponent;
//# sourceMappingURL=spec.viewmodel.js.map