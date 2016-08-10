Blockly.CSharp['compute'] = function (block) {
    var varName = block.getFieldValue('NAME');
    var expression = block.getFieldValue('FUNCTION');
    varName = Blockly.CSharp.addQuotesIfNeeded(varName);
    var legalExpression = Blockly.CSharp.makeExpressionLegal(expression);
    var code = '.Compute(\n\t' + varName + ',\n\tdecodingContextData => ' + legalExpression + ')\n.End()\n';
    return code;
};

Blockly.CSharp['execute'] = function (block) {
    var action = block.getFieldValue('ACTION');
    var code = '.Execute(' + action + ').End()\n';
    return code;
};

Blockly.CSharp['switch'] = function (block) {
    var varName = block.getFieldValue('VARIABLE');
    var legalVarName = Blockly.CSharp.makeExpressionLegal(varName);
    var statement = Blockly.CSharp.statementToCode(block, 'STATEMENT');
    var code = '.Switch(decodingContextData => ' + legalVarName + ')\n' + statement + '.EndSwitch()\n';
    return code;
};

Blockly.CSharp['case'] = function (block) {
    var value = block.getFieldValue('value');
    var statement = Blockly.CSharp.statementToCode(block, 'STATEMENT');
    var code = '.Case(' + value + ')\n' + statement;
    return code;
};

Blockly.CSharp['default'] = function (block) {
    var statement = Blockly.CSharp.statementToCode(block, 'STATEMENT');
    var code = '.Default()\n' + statement;
    return code;
};


Blockly.CSharp["custom_controls_if"] = function (block) {
    // If/elseif/else condition.
    var n = 0;
    var argument = block.getFieldValue('IF' + n) || 'false';
    var legalExpression = Blockly.CSharp.makeExpressionLegal(argument);
    var branch = Blockly.CSharp.statementToCode(this, 'DO' + n);
    var code = '.If( decodingContextData => ' + legalExpression + ') \n' + branch;//previously if
    for (n = 1; n <= this.elseifCount_; n++) {
        argument = block.getFieldValue('IF' + n) || 'false';
        legalExpression = Blockly.CSharp.makeExpressionLegal(argument);
        branch = Blockly.CSharp.statementToCode(this, 'DO' + n);
        code += '.ElseIf(decodingContextData => ' + legalExpression + ') \n' + branch;
    }
    if (this.elseCount_) {
        branch = Blockly.CSharp.statementToCode(this, 'ELSE');
        code += '.Else() \n' + branch;
    }
    return code + '.EndIf()\n';//previously code + '\n'
};

Blockly.CSharp['check_frame_length'] = function (block) {
    var size = block.getFieldValue('SIZE');
    var code = '.If(decodingContextData => decodingContextData.DecodedValues.FrameLength != ' + size + ')' +
        '\n\t.RaiseErrorIncorrectFrameLength()' +
        '\n.EndIf()\n';
    return code;
};




