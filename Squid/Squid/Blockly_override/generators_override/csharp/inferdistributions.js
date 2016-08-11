'use strict';

Blockly.CSharp['infer_bernoulli'] = function(block) {
  var probability = Blockly.CSharp.valueToCode(block, 'PROB', Blockly.CSharp.ORDER_ATOMIC);
  var code = 'Variable.Bernoulli(' + probability + ')';
  return [code, Blockly.CSharp.ORDER_NONE];
};

Blockly.CSharp['infer_bernoulli_c'] = function(block) {
  var dropdown_type = block.getFieldValue('TYPE');
  var combinationMap = {
    AND: "&",
    OR: "|"
  };
  var value_distr1 = Blockly.CSharp.valueToCode(block, 'DISTR1', Blockly.CSharp.ORDER_ATOMIC);
  var value_distr2 = Blockly.CSharp.valueToCode(block, 'DISTR2', Blockly.CSharp.ORDER_ATOMIC);
  var code = value_distr1 + " " + combinationMap[dropdown_type] + " " + value_distr2;
  return [code, Blockly.CSharp.ORDER_NONE];
};

Blockly.CSharp['infer_gaussianmeanvar'] = function(block) {
  var mean = Blockly.CSharp.valueToCode(block, 'MEAN', Blockly.CSharp.ORDER_ATOMIC);
  var variance = Blockly.CSharp.valueToCode(block, 'VAR', Blockly.CSharp.ORDER_ATOMIC);
  var code = 'Variable.GaussianFromMeanAndVariance(' + mean + ', ' + variance + ')';
  return [code, Blockly.CSharp.ORDER_NONE];
};

Blockly.CSharp['infer_gaussianmeanprec'] = function(block) {
  var mean = Blockly.CSharp.valueToCode(block, 'MEAN', Blockly.CSharp.ORDER_ATOMIC);
  var precision = Blockly.CSharp.valueToCode(block, 'PREC', Blockly.CSharp.ORDER_ATOMIC);
  var code = 'Variable.GaussianFromMeanAndPrecision(' + mean + ', ' + precision + ')';
  return [code, Blockly.CSharp.ORDER_NONE];
};

Blockly.CSharp['infer_gammashapescale'] = function(block) {
  var shape = Blockly.CSharp.valueToCode(block, 'SHAPE', Blockly.CSharp.ORDER_ATOMIC);
  var scale = Blockly.CSharp.valueToCode(block, 'SCALE', Blockly.CSharp.ORDER_ATOMIC);
  var code = 'Variable.GammaFromShapeAndScale(' + shape + ', ' + scale + ')';
  return [code, Blockly.CSharp.ORDER_NONE];
};

Blockly.CSharp['infer_newdouble'] = function(block) {
  var code = 'Variable.New<double>()';
  return [code, Blockly.CSharp.ORDER_NONE];
};