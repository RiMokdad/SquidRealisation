"use strict";
(function (VariablesType) {
    VariablesType[VariablesType["CONFIG"] = 0] = "CONFIG";
    VariablesType[VariablesType["INVENTORY"] = 1] = "INVENTORY";
})(exports.VariablesType || (exports.VariablesType = {}));
var VariablesType = exports.VariablesType;
var VariablesSet = (function () {
    function VariablesSet(type, name) {
        this.type = type;
        this.SetPrefix();
        this.Name = name || "New set";
    }
    VariablesSet.prototype.SetPrefix = function () {
        switch (this.type) {
            case VariablesType.CONFIG:
                this.prefix = "C_";
                break;
            case VariablesType.INVENTORY:
                this.prefix = "I_";
                break;
            default:
                this.prefix = "";
        }
    };
    VariablesSet.prototype.GetPrefix = function () { return this.prefix; };
    VariablesSet.prototype.GetType = function () { return this.type; };
    VariablesSet.prototype.Count = function () { return this.variables.length; };
    VariablesSet.prototype.Value = function (name, value) {
        for (var i = 0; i < this.Count(); i++) {
            if (this.variables[i][0] == name) {
                if (value) {
                    this.variables[i][1] = value;
                }
                return this.variables[i][1];
            }
        }
        return null;
    };
    VariablesSet.prototype.Create = function (name, value) {
        var nameTest = name || "variable";
        var num = 1;
        //Avoid to have double names
        for (var i = 0; i < this.Count(); i++) {
            if (this.variables[i][0] == nameTest) {
                nameTest = name + num++;
                i = -1;
            }
        }
        this.variables.push([nameTest, value || null]);
    };
    VariablesSet.prototype.Delete = function (name) {
        for (var i = 0; i < this.Count(); i++) {
            if (this.variables[i][0] == name) {
                return this.variables.splice(i, 1)[0];
            }
        }
        return null;
    };
    VariablesSet.prototype.Rename = function (oldname, newname) {
        var tuple = this.Delete(oldname)[1];
        if (tuple != null) {
            this.Create(newname, tuple[1]);
            return true;
        }
        else {
            return false;
        }
    };
    VariablesSet.prototype.Clear = function () {
        this.variables.length = 0;
    };
    VariablesSet.prototype.List = function (copy) {
        if (copy) {
            var list = [];
            for (var i = 0; i < this.Count(); i++) {
                list.push([this.variables[i][0], this.variables[i][1]]);
            }
            return list;
        }
        else {
            return this.variables;
        }
    };
    VariablesSet.prototype.Names = function (prefix) {
        var list = [];
        for (var i = 0; i < this.Count(); i++) {
            list.push((prefix ? this.prefix : "") + this.variables[i][0]);
        }
        return list;
    };
    return VariablesSet;
}());
exports.VariablesSet = VariablesSet;
//# sourceMappingURL=variables_set.js.map