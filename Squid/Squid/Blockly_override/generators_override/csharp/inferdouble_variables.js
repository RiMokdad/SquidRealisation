'use strict';

Blockly.CSharp.infer_variables = {};

Blockly.CSharp.inferdouble_variables_get = function() {
  // Variable getter.
  var code = Blockly.CSharp.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.CSharp.ORDER_ATOMIC];
};

Blockly.CSharp.inferdouble_variables_set = function() {
  // Variable setter.
  var argument0 = Blockly.CSharp.valueToCode(this, 'VALUE',
      Blockly.CSharp.ORDER_ASSIGNMENT) || 'null';
  var varName = Blockly.CSharp.variableDB_.getName(
      this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + ';\n';
};

Blockly.CSharp['inferdouble_observed'] = function(block) {
  var distribution = Blockly.CSharp.valueToCode(block, 'DISTR', Blockly.CSharp.ORDER_ATOMIC);
  var value = Blockly.CSharp.valueToCode(block, 'VALUE', Blockly.CSharp.ORDER_ATOMIC);
  var code = distribution + '.ObservedValue = ' + value + ';\n';
  return code;
};
