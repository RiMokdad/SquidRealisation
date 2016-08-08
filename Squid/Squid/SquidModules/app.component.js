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
var editor_viewmodel_1 = require("./Editor/editor.viewmodel");
var DecoderComponent = (function () {
    function DecoderComponent() {
    }
    DecoderComponent = __decorate([
        core_1.Component({
            selector: "decoder",
            templateUrl: "SquidModules/main.view.html",
            directives: [editor_viewmodel_1.EditorComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], DecoderComponent);
    return DecoderComponent;
}());
exports.DecoderComponent = DecoderComponent;
window.onload = function () {
    var url = window.URL;
    var urlSplit = url.toString().split("#");
    console.log(urlSplit[0] + " " + urlSplit[1]);
    console.log("I WROTE SOMETHING");
};
//# sourceMappingURL=app.component.js.map