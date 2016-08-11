Blockly.Blocks['procedures_callnoreturn'] = {
    /**
     * Block for calling a procedure with no return value.
     * @this Blockly.Block
     */
    init: function () {
        this.appendDummyInput('TOPROW')
            .appendField(this.id, 'NAME');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(Blockly.Blocks.procedures.HUE);
        // Tooltip is set in renameProcedure.
        this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLNORETURN_HELPURL);
        this.arguments_ = [];
        this.quarkConnections_ = {};
        this.quarkIds_ = null;
        this.setInputsInline(true);
    },
    /**
     * Returns the name of the procedure this block calls.
     * @return {string} Procedure name.
     * @this Blockly.Block
     */
    getProcedureCall: function () {
        // The NAME field is guaranteed to exist, null will never be returned.
        return /** @type {string} */ (this.getFieldValue('NAME'));
    },
    /**
     * Notification that a procedure is renaming.
     * If the name matches this block's procedure, rename it.
     * @param {string} oldName Previous name of procedure.
     * @param {string} newName Renamed procedure.
     * @this Blockly.Block
     */
    renameProcedure: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getProcedureCall())) {
            this.setFieldValue(newName, 'NAME');
            this.setTooltip(
                (this.outputConnection ? Blockly.Msg.PROCEDURES_CALLRETURN_TOOLTIP :
                 Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP)
                .replace('%1', newName));
        }
    },
    /**
     * Notification that the procedure's parameters have changed.
     * @param {!Array.<string>} paramNames New param names, e.g. ['x', 'y', 'z'].
     * @param {!Array.<string>} paramIds IDs of params (consistent for each
     *     parameter through the life of a mutator, regardless of param renaming),
     *     e.g. ['piua', 'f8b_', 'oi.o'].
     * @private
     * @this Blockly.Block
     */
    setProcedureParameters_: function (paramNames, paramIds) {
        // Data structures:
        // this.arguments = ['x', 'y']
        //     Existing param names.
        // this.quarkConnections_ {piua: null, f8b_: Blockly.Connection}
        //     Look-up of paramIds to connections plugged into the call block.
        // this.quarkIds_ = ['piua', 'f8b_']
        //     Existing param IDs.
        // Note that quarkConnections_ may include IDs that no longer exist, but
        // which might reappear if a param is reattached in the mutator.
        var defBlock = Blockly.Procedures.getDefinition(this.getProcedureCall(),
            this.workspace);
        var mutatorOpen = defBlock && defBlock.mutator &&
            defBlock.mutator.isVisible();
        if (!mutatorOpen) {
            this.quarkConnections_ = {};
            this.quarkIds_ = null;
        }
        if (!paramIds) {
            // Reset the quarks (a mutator is about to open).
            return;
        }
        if (goog.array.equals(this.arguments_, paramNames)) {
            // No change.
            this.quarkIds_ = paramIds;
            return;
        }
        if (paramIds.length != paramNames.length) {
            throw 'Error: paramNames and paramIds must be the same length.';
        }
        this.setCollapsed(false);
        if (!this.quarkIds_) {
            // Initialize tracking for this block.
            this.quarkConnections_ = {};
            if (paramNames.join('\n') == this.arguments_.join('\n')) {
                // No change to the parameters, allow quarkConnections_ to be
                // populated with the existing connections.
                this.quarkIds_ = paramIds;
            } else {
                this.quarkIds_ = [];
            }
        }
        // Switch off rendering while the block is rebuilt.
        var savedRendered = this.rendered;
        this.rendered = false;
        // Update the quarkConnections_ with existing connections.
        for (var i = 0; i < this.arguments_.length; i++) {
            var input = this.getInput('ARG' + i);
            if (input) {
                var connection = input.connection.targetConnection;
                this.quarkConnections_[this.quarkIds_[i]] = connection;
                if (mutatorOpen && connection &&
                    paramIds.indexOf(this.quarkIds_[i]) == -1) {
                    // This connection should no longer be attached to this block.
                    connection.disconnect();
                    connection.getSourceBlock().bumpNeighbours_();
                }
            }
        }
        // Rebuild the block's arguments.
        this.arguments_ = [].concat(paramNames);
        this.updateShape_();
        this.quarkIds_ = paramIds;
        // Reconnect any child blocks.
        if (this.quarkIds_) {
            for (var i = 0; i < this.arguments_.length; i++) {
                var quarkId = this.quarkIds_[i];
                if (quarkId in this.quarkConnections_) {
                    var connection = this.quarkConnections_[quarkId];
                    if (!Blockly.Mutator.reconnect(connection, this, 'ARG' + i)) {
                        // Block no longer exists or has been attached elsewhere.
                        delete this.quarkConnections_[quarkId];
                    }
                }
            }
        }
        // Restore rendering and show the changes.
        this.rendered = savedRendered;
        if (this.rendered) {
            this.render();
        }
    },
    /**
     * Modify this block to have the correct number of arguments.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function () {
        for (var i = 0; i < this.arguments_.length; i++) {
            var field = this.getField('ARGNAME' + i);
            if (field) {
                // Ensure argument name is up to date.
                // The argument name field is deterministic based on the mutation,
                // no need to fire a change event.
                Blockly.Events.disable();
                field.setValue(this.arguments_[i]);
                Blockly.Events.enable();
            } else {
                // Add new input.
                // TEST field = new Blockly.FieldLabel(this.arguments_[i]);
                /*TEST var input = this.appendValueInput('ARG' + i)
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(field, 'ARGNAME' + i);*/
                //TEST
                var input = this.appendDummyInput('ARG' + i)
                  .appendField(this.arguments_[i] + ' =')
                  .appendField(new Blockly.FieldTextInput("valeur"), 'ARG' + i);
                //END TEST
                input.init();
                //this.setInputsInline(true); TO DO

            }
        }
        // Remove deleted inputs.
        while (this.getInput('ARG' + i)) {
            this.removeInput('ARG' + i);
            i++;
        }
        // Add 'with:' if there are parameters, remove otherwise.
        var topRow = this.getInput('TOPROW');
        if (topRow) {
            if (this.arguments_.length) {
                if (!this.getField('WITH')) {
                    topRow.appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS, 'WITH');
                    topRow.init();
                }
            } else {
                if (this.getField('WITH')) {
                    topRow.removeField('WITH');
                }
            }
        }
    },
    /**
     * Create XML to represent the (non-editable) name and arguments.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('name', this.getProcedureCall());
        for (var i = 0; i < this.arguments_.length; i++) {
            var parameter = document.createElement('arg');
            parameter.setAttribute('name', this.arguments_[i]);
            container.appendChild(parameter);
        }
        return container;
    },
    /**
     * Parse XML to restore the (non-editable) name and parameters.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        var name = xmlElement.getAttribute('name');
        this.renameProcedure(this.getProcedureCall(), name);
        var args = [];
        var paramIds = [];
        for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
            if (childNode.nodeName.toLowerCase() == 'arg') {
                args.push(childNode.getAttribute('name'));
                paramIds.push(childNode.getAttribute('paramId'));
            }
        }
        this.setProcedureParameters_(args, paramIds);
    },
    /**
     * Notification that a variable is renaming.
     * If the name matches one of this block's variables, rename it.
     * @param {string} oldName Previous name of variable.
     * @param {string} newName Renamed variable.
     * @this Blockly.Block
     */
    renameVar: function (oldName, newName) {
        for (var i = 0; i < this.arguments_.length; i++) {
            if (Blockly.Names.equals(oldName, this.arguments_[i])) {
                this.arguments_[i] = newName;
                this.getField('ARGNAME' + i).setValue(newName);
            }
        }
    },
    /**
     * Add some options to the menu options.
     * @param {!Array} options List of menu options to add to.
     * @this Blockly.Block
     */
    customContextMenu: function (options) {
        /**
        * Add menu option to find the definition block for this call.
        */
        var option = { enabled: true };
        option.text = Blockly.Msg.PROCEDURES_HIGHLIGHT_DEF;
        var name = this.getProcedureCall();
        var workspace = this.workspace;
        option.callback = function () {
            var def = workspace.bringBackDefinition(name);
            def && def.select();

        };
        options.push(option);
    }
};