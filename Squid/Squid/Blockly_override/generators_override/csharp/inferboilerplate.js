'use strict';

Blockly.CSharp.algorithmMap = {
  EP: "ExpectationPropagation",
  VMP: "VariationalMessagePassing",
  Gibbs: "GibbsSampling"
};

Blockly.CSharp['inferboilerplate'] = function(block) {
  var getEngineBoiler = function(algorithm) {
    var declaration = "InferenceEngine engine = new InferenceEngine();\n";
    var algorithmDeclaration = "engine.Algorithm = new "+ Blockly.CSharp.algorithmMap[algorithm] +"();\n"
    return declaration + algorithmDeclaration;
  };
  var preBoiler = `using System;
using System.Collections.Generic;
using System.Text;
using MicrosoftResearch.Infer.Models;
using MicrosoftResearch.Infer;
using MicrosoftResearch.Infer.Distributions;
using MicrosoftResearch.Infer.Maths;

namespace BlocklyInfer
{
\tpublic class BlocklyInfer
\t{
\t\tpublic static void Main()
\t\t{`;
  var postBoiler = `\t\t}
\t}
}`;
  var algorithm = block.getFieldValue('ALGORITHM_DROPDOWN');
  var engineBoiler = getEngineBoiler(algorithm);
  var variableDefinitions = Blockly.CSharp.build_definitions();
  var statements = Blockly.CSharp.statementToCode(block, 'STATEMENTS').trim();
  statements = engineBoiler + variableDefinitions + statements;
  statements = statements
                .split("\n")
                .map(function(line) { return "\t\t\t" + line;})
                .join("\n");
  statements = preBoiler + "\n" + statements + "\n" + postBoiler;
  return statements;
};

Blockly.CSharp['inferinfer'] = function(block) {
  var variable = Blockly.CSharp.valueToCode(block, 'DISTR', Blockly.CSharp.ORDER_ATOMIC);
  var code = 'engine.Infer(' + variable + ')';
  return [code, Blockly.CSharp.ORDER_NONE];
};

Blockly.CSharp['inferalgo'] = function(block) {
  var algorithm = block.getFieldValue('ALGORITHM_DROPDOWN');
  var code = 'engine.Algorithm is ' + Blockly.CSharp.algorithmMap[algorithm];
  return [code, Blockly.CSharp.ORDER_NONE];
};

Blockly.CSharp['inferconstrain_true'] = function(block) {
  var variable = Blockly.CSharp.valueToCode(block, 'DISTR', Blockly.CSharp.ORDER_ATOMIC);
  var code = 'Variable.ConstrainTrue(' + variable + ');\n';
  return code;
};