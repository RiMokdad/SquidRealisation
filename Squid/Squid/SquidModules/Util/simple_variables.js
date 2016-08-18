var SimpleVariables;
(function (SimpleVariables) {
    var variables = {};
    function AddVariable(key, value) {
        variables[key] = value;
    }
    SimpleVariables.AddVariable = AddVariable;
    function RemoveVariable(key) {
        delete variables[key];
    }
    SimpleVariables.RemoveVariable = RemoveVariable;
    function GetNames() {
        var names = [];
        var keys = Object.keys(variables);
        for (var i = 0; i < keys.length; i++) {
            names.push(variables[keys[i]]);
        }
        return Utils.RemoveDuplicates(names);
    }
    SimpleVariables.GetNames = GetNames;
})(SimpleVariables || (SimpleVariables = {}));
//# sourceMappingURL=simple_variables.js.map