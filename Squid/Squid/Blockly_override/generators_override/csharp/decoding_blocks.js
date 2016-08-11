Blockly.CSharp['decodebytes'] = function (block) {
    var varName = block.getFieldValue('NAME');
    var startPos = block.getFieldValue('start');
    var endPos = block.getFieldValue('end');
    varName = Blockly.CSharp.addQuotesIfNeeded(varName);
    startPos = Blockly.CSharp.addMIfNeeded(startPos);
    endPos = Blockly.CSharp.addMIfNeeded(endPos);
    var code = '.DecodeBytes(' + varName + ', ' + startPos + ', ' + endPos + ').End()\n';
    return code;
};


Blockly.CSharp['decodeunsignedinteger'] = function (block) {
    var varName = block.getFieldValue('NAME');
    var msbyte = block.getFieldValue('MSBYTE');
    var lsbyte = block.getFieldValue('LSBYTE');
    var msbit = block.getFieldValue('MSBIT');
    var lsbit = block.getFieldValue('LSBIT');
    varName = Blockly.CSharp.addQuotesIfNeeded(varName);
    var ms = Blockly.CSharp.prepareBytesAndBits([msbyte, msbit]);
    var ls = Blockly.CSharp.prepareBytesAndBits([lsbyte, lsbit]);
    var code = '.DecodeUnsignedInteger(' + varName + ', ' + ls + ', ' + ms + ').End()\n';
    return code;
};

Blockly.CSharp['decodesignedinteger'] = function (block) {
    var varName = block.getFieldValue('NAME');
    var msbyte = block.getFieldValue('MSBYTE');
    var lsbyte = block.getFieldValue('LSBYTE');
    var msbit = block.getFieldValue('MSBIT');
    var lsbit = block.getFieldValue('LSBIT');
    varName = Blockly.CSharp.addQuotesIfNeeded(varName);
    var ms = Blockly.CSharp.prepareBytesAndBits([msbyte, msbit]);
    var ls = Blockly.CSharp.prepareBytesAndBits([lsbyte, lsbit]);
    var code = '.DecodeSignedInteger(' + varName + ', ' + ls + ', ' + ms + ').End()\n';
    return code;
};

Blockly.CSharp['decodeboolean'] = function (block) {
    var varName = block.getFieldValue('NAME');
    var bytepos = block.getFieldValue('BYTEPOS');
    var bitpos = block.getFieldValue('BITPOS');
    varName = Blockly.CSharp.addQuotesIfNeeded(varName);
    var pos = Blockly.CSharp.prepareBytesAndBits([bytepos, bitpos]);
    var code = '.DecodeBoolean(' + varName + ', ' + pos + ').End()\n';
    return code;
};