'use strict';

Blockly.French.procedures = {};

Blockly.French.procedures_defnoreturn = function () {
    // Define a procedure with no return value.
    var funcName = Blockly.French.variableDB_.getName(
        this.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var branch = Blockly.French.statementToCode(this, 'STACK');

    /*if (Blockly.French.INFINITE_LOOP_TRAP) {
        branch = Blockly.French.INFINITE_LOOP_TRAP.replace(/%1/g,
            '\'' + this.id + '\'') + branch;
    }*/


    var args = [];
    for (var x = 0; x < this.arguments_.length; x++) {
        args[x] = Blockly.French.variableDB_.getName(this.arguments_[x],
        Blockly.Variables.NAME_TYPE);
        //args[x] = this.getFieldValue('ARG' + x);
    }


    var argsString = args.join(', ');
    if (args.length > 0) {
        argsString = ' avec pour arguments ' + argsString;
    }

    var code = 'La fonction ' + funcName + argsString + ' fait : \n' + branch + 'Fin de la fonction ' + funcName + '\n';
    code = Blockly.French.scrub_(this, code);
    Blockly.French.definitions_[funcName] = code;
    return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.


Blockly.French.procedures_callnoreturn = function () {
    // Call a procedure with no return value.
    var funcName = Blockly.French.variableDB_.getName(
        this.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var args = [];
    for (var x = 0; x < this.arguments_.length; x++) {
        args[x] = this.getFieldValue('ARG' + x);
    }
    var argsString = args.join(', ');
    if (args.length > 0) {
        argsString = ' avec en paramètres ' + argsString;
    }
    var code = '- Appel de la fonction ' + funcName + argsString + '.\n'; // previously );\n
    return code;
};

