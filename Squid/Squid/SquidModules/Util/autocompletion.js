/**
 * Constructor
 * @param {Array<String>} opt_variables the completion variables
 * @returns {} 
 */
AutoComplete = function (opt_variables, opt_categories, opt_tags) {
    AutoComplete.variables = opt_variables;
    AutoComplete.categories = opt_categories;
    AutoComplete.tags = opt_tags;
}

AutoComplete.variables = [];
AutoComplete.categories = [];
AutoComplete.tags = [];
AutoComplete.categoryWorkspace = null;

AutoComplete.inventorySet = null;
AutoComplete.configSet = null;

AutoComplete.AddAutoCompleteVariable = function (variable) {
    AutoComplete.variables.push(variable);
}

AutoComplete.RemoveAutoCompleteVariable = function (variable) {
    var index = AutoComplete.variables.indexOf(variable);
    if (index > -1) {
        AutoComplete.variables.splice(index, 1);
    }
}

AutoComplete.UpdateVariables = function () {
    AutoComplete.variables = [];
    // Config variables
    if (AutoComplete.configSet)
        AutoComplete.variables.push.apply(AutoComplete.variables, AutoComplete.configSet.Names());
    // Inventory variables
    if (AutoComplete.inventorySet)
        AutoComplete.variables.push.apply(AutoComplete.variables, AutoComplete.inventorySet.Names());
    // Other variables
    AutoComplete.variables.push.apply(AutoComplete.variables, Array.from(Squid.SimpleVariables.keys()));
}

AutoComplete.UpdateCategories = function () {
    AutoComplete.categories = Blockly.Procedures.allCategories(AutoComplete.categoryWorkspace)[0];
}

//get after update
AutoComplete.GetVariables = function () {
    AutoComplete.UpdateVariables();
    return AutoComplete.variables;
}

AutoComplete.GetCategories = function () {
    AutoComplete.UpdateCategories();
    return AutoComplete.categories;
}

AutoComplete.GetTags = function () {
    var blocks = AutoComplete.categoryWorkspace.getAllDescendantBlocks();
    var procedures = blocks.filter(function (item) {
        return item.getProcedureDef;
    });
    var allTags = [];
    for (var i = 0; i < procedures.length; i++) {
        var tags = procedures[i].getField("tags").text_;
        tags = tags.replace(/\s+/g, '');
        var tagsSplit = tags.split(",");
        for (var y = 0; y < tagsSplit.length; y++) {
            allTags.push(tagsSplit[y]);
        }
    }
    allTags = removeDuplicates(allTags);
    AutoComplete.tags = allTags;
    return AutoComplete.tags;
}

function removeDuplicates(array) {
    var seen = {};
    return array.filter(function (item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function parseTags() {
    var search = document.getElementById("search-bar").value;
    //remove whitespaces
    search = search.replace(/\s+/g, '');
    var tagSplit = search.split(",");
    return tagSplit;
}