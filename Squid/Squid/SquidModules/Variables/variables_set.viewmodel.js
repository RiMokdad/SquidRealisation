"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var variables_set_1 = require("./variables_set");
var VariablesSetComponent = (function () {
    function VariablesSetComponent(name, type) {
        this.name = name;
        this.sets = new Array();
        this.type = type;
        this.NewSet();
    }
    VariablesSetComponent.prototype.NewSet = function () {
        this.set = new variables_set_1.VariablesSet(this.type);
        this.sets.push(this.set);
    };
    return VariablesSetComponent;
}());
var ConfigSetComponent = (function (_super) {
    __extends(ConfigSetComponent, _super);
    function ConfigSetComponent() {
        _super.call(this, "Configuration", variables_set_1.VariablesType.CONFIG);
    }
    ConfigSetComponent = __decorate([
        core_1.Component({
            selector: "config-set",
            templateUrl: "SquidModules/Variables/variables_set.view.html"
        }), 
        __metadata('design:paramtypes', [])
    ], ConfigSetComponent);
    return ConfigSetComponent;
}(VariablesSetComponent));
exports.ConfigSetComponent = ConfigSetComponent;
var InventorySetComponent = (function (_super) {
    __extends(InventorySetComponent, _super);
    function InventorySetComponent() {
        _super.call(this, "Inventaire", variables_set_1.VariablesType.INVENTORY);
    }
    InventorySetComponent = __decorate([
        core_1.Component({
            selector: "inventory-set",
            templateUrl: "SquidModules/Variables/variables_set.view.html"
        }), 
        __metadata('design:paramtypes', [])
    ], InventorySetComponent);
    return InventorySetComponent;
}(VariablesSetComponent));
exports.InventorySetComponent = InventorySetComponent;
//# sourceMappingURL=variables_set.viewmodel.js.map