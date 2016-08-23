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
        this.decoder_test();
    }
    SpecComponent.prototype.decoder_test = function () {
        var _this = this;
        this.decoder.Id = 17;
        var func = function () {
            _this.DisplaySpec();
        };
        server_request_1.Requests.GetDecoderDef(17, this.decoder, func);
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
    SpecComponent.prototype.DisplaySpec = function () {
        var _this = this;
        var callback = function (res) {
            for (var i = 0; i < res.length; i++) {
                _this.decoderList.push(Decoder_1.Decoder.ObjectToDecoder(res[i]));
            }
        };
        server_request_1.Requests.FindDescendants(this.decoder, callback);
    };
    SpecComponent.prototype.SetDecoder = function (decoder) {
        this.decoder = decoder;
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