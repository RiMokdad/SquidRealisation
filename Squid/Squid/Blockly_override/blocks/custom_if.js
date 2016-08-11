﻿Blockly.Blocks['custom_controls_if'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(Blockly.Blocks.logic.HUE);


        this.appendDummyInput("IF0")
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF)
            .appendField(new Blockly.FieldTextInput("expression", null, AutoComplete.GetVariables), "IF0");
        //TEST this.appendValueInput('IF0')
        //TEST .setCheck('Boolean')
        //TEST   .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);


        this.appendStatementInput('DO0')
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setMutator(new Blockly.Mutator(['custom_controls_if_elseif',
                                             'custom_controls_if_else']));
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            if (!thisBlock.elseifCount_ && !thisBlock.elseCount_) {
                return Blockly.Msg.CONTROLS_IF_TOOLTIP_1;
            } else if (!thisBlock.elseifCount_ && thisBlock.elseCount_) {
                return Blockly.Msg.CONTROLS_IF_TOOLTIP_2;
            } else if (thisBlock.elseifCount_ && !thisBlock.elseCount_) {
                return Blockly.Msg.CONTROLS_IF_TOOLTIP_3;
            } else if (thisBlock.elseifCount_ && thisBlock.elseCount_) {
                return Blockly.Msg.CONTROLS_IF_TOOLTIP_4;
            }
            return '';
        });
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    },
    /**
     * Create XML to represent the number of else-if and else inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        if (!this.elseifCount_ && !this.elseCount_) {
            return null;
        }
        var container = document.createElement('mutation');
        if (this.elseifCount_) {
            container.setAttribute('elseif', this.elseifCount_);
        }
        if (this.elseCount_) {
            container.setAttribute('else', 1);
        }
        return container;
    },
    /**
     * Parse XML to restore the else-if and else inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10) || 0;
        this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10) || 0;
        this.updateShape_();
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function (workspace) {
        var containerBlock = workspace.newBlock('custom_controls_if_if');
        containerBlock.initSvg();
        var connection = containerBlock.nextConnection;
        for (var i = 1; i <= this.elseifCount_; i++) {
            var elseifBlock = workspace.newBlock('custom_controls_if_elseif');
            elseifBlock.initSvg();
            connection.connect(elseifBlock.previousConnection);
            connection = elseifBlock.nextConnection;
        }
        if (this.elseCount_) {
            var elseBlock = workspace.newBlock('custom_controls_if_else');
            elseBlock.initSvg();
            connection.connect(elseBlock.previousConnection);
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function (containerBlock) {
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        // Count number of inputs.
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
        var dummyConnections = [null];
        var statementConnections = [null];
        var elseStatementConnection = null;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'custom_controls_if_elseif':
                    this.elseifCount_++;
                    dummyConnections.push(clauseBlock.dummyConnection_);
                    statementConnections.push(clauseBlock.statementConnection_);
                    break;
                case 'custom_controls_if_else':
                    this.elseCount_++;
                    elseStatementConnection = clauseBlock.statementConnection_;
                    break;
                default:
                    throw 'Unknown block type.';
            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }
        this.updateShape_();
        // Reconnect any child blocks.
        for (var i = 1; i <= this.elseifCount_; i++) {
            Blockly.Mutator.reconnect(dummyConnections[i], this, 'IF' + i);
            Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
        }
        Blockly.Mutator.reconnect(elseStatementConnection, this, 'ELSE');
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function (containerBlock) {
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        var i = 1;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'custom_controls_if_elseif':
                    var inputIf = this.getInput('IF' + i);
                    var inputDo = this.getInput('DO' + i);
                    clauseBlock.dummyConnection_ =
                        inputIf && inputIf.connection;//.targetConnection;
                    clauseBlock.statementConnection_ =
                        inputDo && inputDo.connection.targetConnection;
                    i++;
                    break;
                case 'custom_controls_if_else':
                    var inputDo = this.getInput('ELSE');
                    clauseBlock.statementConnection_ =
                        inputDo && inputDo.connection.targetConnection;
                    break;
                default:
                    throw 'Unknown block type.';
            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function () {
        // Delete everything.
        if (this.getInput('ELSE')) {
            this.removeInput('ELSE');
        }
        var i = 1;
        while (this.getInput('IF' + i)) {
            this.removeInput('IF' + i);
            this.removeInput('DO' + i);
            i++;
        }
        // Rebuild block.
        for (var i = 1; i <= this.elseifCount_; i++) {
            //TEST
            this.appendDummyInput('IF' + i)
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF)
                .appendField(new Blockly.FieldTextInput("expression", null, AutoComplete.GetVariables), 'IF' + i);
            /*TEST this.appendValueInput('IF' + i)
                .setCheck('Boolean')
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);*/
            this.appendStatementInput('DO' + i)
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        }
        if (this.elseCount_) {
            this.appendStatementInput('ELSE')
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
        }
    }
};

Blockly.Blocks['custom_controls_if_if'] = {
    /**
     * Mutator block for if container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Blocks.logic.HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_IF_IF_TITLE_IF);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.CONTROLS_IF_IF_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['custom_controls_if_elseif'] = {
    /**
     * Mutator bolck for else-if condition.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Blocks.logic.HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_IF_ELSEIF_TITLE_ELSEIF);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSEIF_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['custom_controls_if_else'] = {
    /**
     * Mutator block for else condition.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Blocks.logic.HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_IF_ELSE_TITLE_ELSE);
        this.setPreviousStatement(true);
        this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSE_TOOLTIP);
        this.contextMenu = false;
    }
};