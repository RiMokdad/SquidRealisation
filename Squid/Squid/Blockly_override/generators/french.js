'use strict';

goog.provide('Blockly.French');

goog.require('Blockly.Generator');


/**
 * French generator.
 * @type {!Blockly.Generator}
 */
Blockly.French = new Blockly.Generator('French');

Blockly.French.init = function (workspace) {
    Blockly.French.definitions_ = {};

    if (Blockly.Variables) {
        if (!Blockly.French.variableDB_) {
            Blockly.French.variableDB_ =
                new Blockly.Names(Blockly.French.RESERVED_WORDS_);
        } else {
            Blockly.French.variableDB_.reset();
        }

        //var defvars = [];
       // defvars = defvars.concat(Blockly.French.getDefinitions(workspace));
        //defvars = defvars.concat(Blockly.French.getDefinitions(workspace, 'inferbool'));
        //defvars = defvars.concat(Blockly.French.getDefinitions(workspace, 'inferdouble'));
       // Blockly.French.definitions_['variables'] = defvars.join('\n');
    }
};

Blockly.French.finish = function (code) {
    // Convert the definitions dictionary into a list.
    var definitions = [];
    for (var name in Blockly.French.definitions_) {
        definitions.push(Blockly.French.definitions_[name]);
    }
    // Clean up temporary data.
    delete Blockly.French.definitions_;
    delete Blockly.French.functionNames_;
    Blockly.French.variableDB_.reset();
    return definitions.join('\n\n') + '\n\n\n' + code;
};

Blockly.French.scrubNakedValue = function (line) {
    return line + '\n';
};

Blockly.French.scrub_ = function (block, code) {
    if (code === null) {
        // Block has handled code generation itself.
        return '';
    }
    var commentCode = '';
    // Only collect comments for blocks that aren't inline.
    if (!block.outputConnection || !block.outputConnection.targetConnection) {
        // Collect comment for this block.
        var comment = block.getCommentText();
        if (comment) {
            //commentCode += this.prefixLines(comment, '// ') + '\n';
            if (block.getProcedureDef) {
                // Use a comment block for function comments.
                commentCode += '/**\n' +
                               this.prefixLines(comment + '\n', ' * ') +
                               ' */\n';
            } else {
                commentCode += this.prefixLines(comment + '\n', '// ');
            }
        }
        // Collect comments for all value arguments.
        // Don't collect comments for nested statements.
        for (var x = 0; x < block.inputList.length; x++) {
            if (block.inputList[x].type == Blockly.INPUT_VALUE) {
                var childBlock = block.inputList[x].connection.targetBlock();
                if (childBlock) {
                    var comment = this.allNestedComments(childBlock);
                    if (comment) {
                        commentCode += this.prefixLines(comment, '// ');
                    }
                }
            }
        }
    }
    var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    var nextCode = this.blockToCode(nextBlock);
    return commentCode + code + nextCode;
};

Blockly.French.addQuotesIfNeeded = function (varName) {
    if (varName.indexOf('$') === 0) {
        return varName.substring(1);
    } else {
        return '"' + varName + '"';
    }
}
