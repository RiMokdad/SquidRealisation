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
var spec_viewmodel_1 = require("./Spec_And_Code/spec.viewmodel");
var DecoderComponent = (function () {
    function DecoderComponent() {
        this.backgrounds = [
            "grunge.jpg", "paintings.jpg", "brush-iron.jpg", "droplets-leafs.jpg", "metal-grunge.jpg", "sun-reflections.jpg"
        ];
        this.idx = 0;
    }
    DecoderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.Select(0);
        shortcut.add("Alt+E", function () { _this.Select(0); });
        shortcut.add("Alt+S", function () { _this.Select(1); });
        shortcut.add("Alt+C", function () { _this.Select(1); });
    };
    DecoderComponent.prototype.ChangeBackground = function () {
        var background = document.getElementsByClassName("background")[0];
        this.idx = (this.idx + 1) % this.backgrounds.length;
        background.style.backgroundImage = "url('../Content/backgrounds/" + this.backgrounds[this.idx] + "')";
    };
    DecoderComponent.prototype.Select = function (num) {
        num = num || 0;
        var container = document.getElementsByClassName("main-content")[0];
        if (container) {
            var children = container.children;
            var _loop_1 = function(i) {
                var child = children[i];
                if (num !== i) {
                    setTimeout(function () { child.style.display = "none"; }, 200);
                    child.style.visibility = "hidden";
                    child.style.opacity = "0";
                }
                else {
                    child.style.display = "block";
                    child.style.visibility = "visible";
                    child.style.opacity = "1";
                }
            };
            for (var i = 0; i < children.length; i++) {
                _loop_1(i);
            }
        }
    };
    DecoderComponent = __decorate([
        core_1.Component({
            selector: "decoder",
            templateUrl: "SquidModules/main.view.html",
            directives: [
                editor_viewmodel_1.EditorComponent,
                spec_viewmodel_1.SpecComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], DecoderComponent);
    return DecoderComponent;
}());
exports.DecoderComponent = DecoderComponent;
//# sourceMappingURL=app.component.js.map