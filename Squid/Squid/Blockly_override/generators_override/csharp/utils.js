Blockly.CSharp.addMIfNeeded = function (param) {
    if (!isNaN(param)) {
        param = param + 'M';
    } else {
        if (param.indexOf('$') === 0) {
            param = param.substring(1);
        }
    }
    return param;

}

/**
 * Enable cohabitation of written parameters and numeric values in bytes and bits text field by putting the right form in generated code
 * @param {Array<>} args an array containing the byte pos in 1st and the bit pos in 2nd
 * @returns {string} the correct generated code syntax
 */
Blockly.CSharp.prepareBytesAndBits = function (args) {
    if (isNaN(args[0])) {
        if (isNaN(args[1])) {
            return args[0] + ' + ' + args[1] + ' / 10M';
        } else {
            return args[0] + ' + 0.' + args[1] + 'M';
        }
    } else {
        if (isNaN(args[1])) {
            return args[0] + 'M + ' + args[1] + ' / 10M';
        } else {
            return args[0] + '.' + args[1] + 'M';
        }
    }
}

Blockly.CSharp.addVariablePrefix = function (varName) {
    var prefixedName;

    if (varName.indexOf(Squid.VariablesSet.getPrefix(Squid.VariablesSet.Types.CONFIG)) === 0) {
        prefixedName = "decodingContextData.configurationData." + varName.substring(2);
    }
    else if (varName.indexOf(Squid.VariablesSet.getPrefix(Squid.VariablesSet.Types.INVENTORY)) === 0) {
        prefixedName = "decodingContextData.inventoryData." + varName.substring(2);
    } else {
        prefixedName = "decodingContextData.decodedValues." + varName;
    }
    return prefixedName;
}

/**
 * 
 * @param {String} expression to make legal 
 * @returns {String} the expression with the good prefixes and if needed '==' instead of '=' 
 */
Blockly.CSharp.makeExpressionLegal = function (expression) {
    return expression.replace(/[a-z]\w*/gi, function regexreplace(match) { return Blockly.CSharp.addVariablePrefix(match) }).replace(/=+/, "==");
}

Blockly.CSharp.addQuotesIfNeeded = function (varName) {
    if (varName.indexOf('$') === 0) {
        return varName.substring(1);
    } else {
        return '"' + varName + '"';
    }
}