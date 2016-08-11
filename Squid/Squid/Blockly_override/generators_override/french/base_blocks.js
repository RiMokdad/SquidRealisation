Blockly.French['compute'] = function (block) {
    var varName = block.getFieldValue('NAME');
    var expression = block.getFieldValue('FUNCTION');
    varName = Blockly.French.addQuotesIfNeeded(varName);
    //var legalExpression = Blockly.French.makeExpressionLegal(expression);
    //var code = '.Compute(\n\t' + varName + ',\n\tdecodingContextData => ' + legalExpression + ')\n.End()\n';
    var code = '- Calcule le résultat de (' + expression + ') et le met dans ' + varName + '.\n';
    return code;
};

Blockly.French['execute'] = function (block) {
    var action = block.getFieldValue('ACTION');
    //var code = '.Execute(' + action + ').End()\n';
    var code = '- Exécute l\'action' + action + '.\n';
    return code;
};

Blockly.French['switch'] = function (block) {
    var varName = block.getFieldValue('VARIABLE');
    var statement = Blockly.French.statementToCode(block, 'STATEMENT');
    var code = 'Aiguille en fonction de la valeur de ' + varName + ' :\n' + statement + 'Fin de l\'aiguillage.\n';
    return code;
};

Blockly.French['case'] = function (block) {
    var value = block.getFieldValue('value');
    var statement = Blockly.French.statementToCode(block, 'STATEMENT');
    var code = 'Si la valeur = ' + value + '\n' + statement;
    return code;
};

Blockly.French['default'] = function (block) {
    var statement = Blockly.French.statementToCode(block, 'STATEMENT');
    var code = 'Par défaut\n' + statement;
    return code;
};

Blockly.French["custom_controls_if"] = function (block) {
    // If/elseif/else condition.
    var n = 0;
    var argument = block.getFieldValue('IF' + n) || 'false';
    var branch = Blockly.French.statementToCode(this, 'DO' + n);
    var code = 'Si (' + argument + ') :\n' + branch;//previously if
    for (n = 1; n <= this.elseifCount_; n++) {
        argument = block.getFieldValue('IF' + n) || 'false';
        branch = Blockly.French.statementToCode(this, 'DO' + n);
        code += 'Sinon si (' + argument + ') :\n' + branch;
    }
    if (this.elseCount_) {
        branch = Blockly.French.statementToCode(this, 'ELSE');
        code += 'Sinon :\n' + branch;
    }
    return code ;//previously code + '\n'
};

Blockly.French['check_frame_length'] = function (block) {
    var size = block.getFieldValue('SIZE');
    var code = '- Si la longueur de trame n\'est pas de '+size+' octets, lève une exception\n' ;
    return code;
};