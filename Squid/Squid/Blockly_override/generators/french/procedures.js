'use strict';

Blockly.French.procedures = {};

Blockly.French.procedures_defnoreturn = function () {
    // Define a procedure with a return value.
    var funcName = Blockly.French.variableDB_.getName(
        this.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var branch = Blockly.French.statementToCode(this, 'STACK');

    /*if (Blockly.French.INFINITE_LOOP_TRAP) {
        branch = Blockly.French.INFINITE_LOOP_TRAP.replace(/%1/g,
            '\'' + this.id + '\'') + branch;
    }*/

   /* var returnValue = Blockly.French.valueToCode(this, 'RETURN', Blockly.French.ORDER_NONE) || '';
    if (returnValue) {
        returnValue = '  return ' + returnValue + ';\n';
    }*/

    var args = [];
    for (var x = 0; x < this.arguments_.length; x++) {
        args[x] = Blockly.French.variableDB_.getName(this.arguments_[x],
        Blockly.Variables.NAME_TYPE);
        //args[x] = this.getFieldValue('ARG' + x);
    }

   /* var append_to_list = function (res, val) {
        if (res.length == 0)
            argTypes = val;
        else
            argTypes += ', ' + val;
    };

    var argTypes = '';
    for (var x = 0; x < args.length; x++) {
        append_to_list(argTypes, 'dynamic');
    }

    if (returnValue.length != 0) {
        append_to_list(argTypes, 'dynamic');
    }*/

    var argsString = args.join(', ');
    if (args.length > 0) {
        argsString = ' avec pour arguments ' + argsString;
    }


    //var delegateType = (returnValue.length == 0) ? 'Action' : ('Func<' + argTypes + '>');


        //code = 'public static void ' + funcName + ' (' + argsWithType.join(', ') + ') \n{\n' + branch + '\n}';
     /* var  code = 'public static TDecodableBlock ' + funcName + '<TDecodableBlock>(this IDecodableStep<TDecodableBlock> previousDecodableStep, ' + argsString + ')' +
            '\n\twhere TDecodableBlock : IDecodableStep<TDecodableBlock>' +
            '\n{' +
            '\n\tContract.Requires<ArgumentNullException>(previousDecodableStep != null);' +
            '\n' +
            '\n\treturn' +
            '\n\t\tpreviousDecodableStep' +
            '\n' + Blockly.French.prefixLines(branch, "\t") + '}';*/
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

