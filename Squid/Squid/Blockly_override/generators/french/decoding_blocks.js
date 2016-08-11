Blockly.French['decodebytes'] = function (block) {
    var varName = block.getFieldValue('NAME');
    var startPos = block.getFieldValue('start');
    var endPos = block.getFieldValue('end');
    varName = Blockly.French.addQuotesIfNeeded(varName);
    //startPos = Blockly.French.addMIfNeeded(startPos);
    //endPos = Blockly.French.addMIfNeeded(endPos);
    //var code = '.DecodeBytes(' + varName + ', ' + startPos + ', ' + endPos + ').End()\n';
    var code = '- Décode les octets ' + startPos + ' à ' + endPos + ' et met la valeur dans ' + varName+'.\n';
    return code;
};


Blockly.French['decodeunsignedinteger'] = function (block) {
    var varName = block.getFieldValue('NAME');
    var msbyte = block.getFieldValue('MSBYTE');
    var lsbyte = block.getFieldValue('LSBYTE');
    var msbit = block.getFieldValue('MSBIT');
    var lsbit = block.getFieldValue('LSBIT');
    varName = Blockly.French.addQuotesIfNeeded(varName);
    //var code = '.DecodeUnsignedInteger(' + varName + ', ' + ls + ', ' + ms + ').End()\n';
    var code = '- Décode un entier non signé, avec en poids faible l\'octet ' +
        lsbyte +
        ' et le bit ' +
        lsbit +
        '\net en poids fort l\'octet ' +
        msbyte +
        ' et le bit ' +
        msbit +
        ', et met la valeur dans ' +
        varName +
        '.\n';
    return code;
};

Blockly.French['decodesignedinteger'] = function (block) {
    var varName = block.getFieldValue('NAME');
    var msbyte = block.getFieldValue('MSBYTE');
    var lsbyte = block.getFieldValue('LSBYTE');
    var msbit = block.getFieldValue('MSBIT');
    var lsbit = block.getFieldValue('LSBIT');
    varName = Blockly.French.addQuotesIfNeeded(varName);
    var code = '- Décode un entier signé, avec en poids faible l\'octet ' +
         lsbyte +
         ' et le bit ' +
         lsbit +
         '\net en poids fort l\'octet ' +
         msbyte +
         ' et le bit ' +
         msbit +
         ', et met la valeur dans ' +
         varName +
         '.\n';
    return code;
};

Blockly.French['decodeboolean'] = function (block) {
    var varName = block.getFieldValue('NAME');
    var bytepos = block.getFieldValue('BYTEPOS');
    var bitpos = block.getFieldValue('BITPOS');
    varName = Blockly.French.addQuotesIfNeeded(varName);
    var code = '- Décode un booléen au bit ' + bitpos + ' de l\'octet ' + bytepos + ' et met la valeur dans ' + varName + '.\n';
    return code;
};