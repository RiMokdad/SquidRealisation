"use strict";
var Utils_1 = require("./Utils");
var SimpleVariables;
(function (SimpleVariables) {
    var variables = {};
    function AddVariable(key, value) {
        if (value.substring(0, 1) !== "$") {
            variables[key] = value;
        }
    }
    SimpleVariables.AddVariable = AddVariable;
    function RemoveVariable(key) {
        delete variables[key];
    }
    SimpleVariables.RemoveVariable = RemoveVariable;
    function UpdateVariables(newVariables) {
        variables = newVariables;
    }
    SimpleVariables.UpdateVariables = UpdateVariables;
    function GetNames() {
        var names = [];
        var keys = Object.keys(variables);
        for (var i = 0; i < keys.length; i++) {
            names.push(variables[keys[i]]);
        }
        return Utils_1.Utils.RemoveDuplicates(names);
    }
    SimpleVariables.GetNames = GetNames;
    //deep copy, not reference
    function GetVariablesAsJson() {
        return JSON.stringify(variables);
    }
    SimpleVariables.GetVariablesAsJson = GetVariablesAsJson;
})(SimpleVariables = exports.SimpleVariables || (exports.SimpleVariables = {}));
//# sourceMappingURL=simple_variables.js.map