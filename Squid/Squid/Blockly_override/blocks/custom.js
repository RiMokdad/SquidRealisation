goog.require('Blockly.Blocks');

//blocks for testing
Blockly.Blocks['decode_weft'] = {
    /*
    * This represents a weft with a size in bytes, a header,
    * and blocs for decoding.
    */
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("Trame");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("Couleur")
            .appendField(new Blockly.FieldAngle(0), "Colour");
        this.appendDummyInput()
            .appendField("Taille")
            .appendField(new Blockly.FieldTextInput("12"), "Size");
        this.appendValueInput("Header")
            .setCheck("Decode.Header")
            .appendField("Header");
        this.appendStatementInput("Blocs")
            .setCheck(null)
            .appendField("Blocs");
        this.setColour(20);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['configurationblock'] = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("Configuration standard");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Nom")
            .appendField(new Blockly.FieldTextInput("Bloc"), "Name");
        this.appendValueInput("Beginning")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Début");
        this.appendValueInput("Size")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Taille");
        this.appendStatementInput("Reading")
            .setCheck(null)
            .appendField("Lecture");
        this.setInputsInline(false);
        this.setOutput(true, "Decode.Bloc");
        this.setColour(0);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};


Blockly.Blocks['simple_block'] = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("Bloc");
        this.appendValueInput("Header")
            .setCheck("Decode.Bloc")
            .appendField("Configuration");
        this.appendStatementInput("Children")
            .setCheck("Block")
            .appendField("Childrens");
        this.setInputsInline(false);
        this.setPreviousStatement(true, ["Decode.Weft", "Block"]);
        this.setNextStatement(true, ["Decode.Weft", "Block"]);
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['decodebytes'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Decoder octets");
        this.appendDummyInput()
            .appendField("nom :")
            .appendField(new Blockly.FieldTextInput("default", null, SimpleVariables.GetNames, true), "NAME");

        /*this.appendDummyInput()
            .appendField("temporaire")
            .appendField(new Blockly.FieldCheckbox("TRUE"), "BOX");*/

        this.appendDummyInput()
            .appendField("octet de debut :")
            .appendField(new Blockly.FieldTextInput("0", null, SimpleVariables.GetNames), "start");
        this.appendDummyInput()
            .appendField("octet de fin :     ")
            .appendField(new Blockly.FieldTextInput("0", null, SimpleVariables.GetNames), "end");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(200);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['decodeHexa'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Decoder hexadecimal");
        this.appendDummyInput()
            .appendField("nom : ")
            .appendField(new Blockly.FieldTextInput("default"), "HEXA_NAME");
        this.appendDummyInput()
            .appendField("octet de debut : ")
            .appendField(new Blockly.FieldNumber(0), "BEGIN");
        this.appendDummyInput()
            .appendField("octet de fin :      ")
            .appendField(new Blockly.FieldNumber(0), "END");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(255);
        this.setTooltip('');
        this.setHelpUrl('https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#qqci4r');
    }
};

Blockly.Blocks['decodeunsignedinteger'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Decoder entier non signe");
        this.appendDummyInput()
            .appendField("nom :")
            .appendField(new Blockly.FieldTextInput("default", null, SimpleVariables.GetNames, true), "NAME");
        this.appendDummyInput()
            .appendField("position :");
        this.appendDummyInput()
            .appendField("                    octet")
            .appendField("        bit");
        this.appendDummyInput()
            .appendField("poids fort    ")
            .appendField(new Blockly.FieldTextInput("0", null, SimpleVariables.GetNames), "MSBYTE")
            .appendField("           ")
            .appendField(new Blockly.FieldTextInput("0", null, SimpleVariables.GetNames), "MSBIT");
        this.appendDummyInput()
            .appendField("poids faible ")
            .appendField(new Blockly.FieldTextInput("0", null, SimpleVariables.GetNames), "LSBYTE")
            .appendField("           ")
            .appendField(new Blockly.FieldTextInput("0", null, SimpleVariables.GetNames), "LSBIT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(250);
        this.setTooltip('');
        this.setHelpUrl('https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#9nq9w3');
    }
};

Blockly.Blocks['decodesignedinteger'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Decoder entier signe");
        this.appendDummyInput()
            .appendField("nom :")
            .appendField(new Blockly.FieldTextInput("default", null, SimpleVariables.GetNames, true), "NAME");
        this.appendDummyInput()
            .appendField("position :");
        this.appendDummyInput()
            .appendField("                    octet")
            .appendField("        bit");
        this.appendDummyInput()
            .appendField("poids fort    ")
            .appendField(new Blockly.FieldTextInput("0", null, SimpleVariables.GetNames), "MSBYTE")
            .appendField("           ")
            .appendField(new Blockly.FieldTextInput("0", null, SimpleVariables.GetNames), "MSBIT");
        this.appendDummyInput()
            .appendField("poids faible ")
            .appendField(new Blockly.FieldTextInput("0", null, SimpleVariables.GetNames), "LSBYTE")
            .appendField("           ")
            .appendField(new Blockly.FieldTextInput("0", null, SimpleVariables.GetNames), "LSBIT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#9nq9w3');
    }
};

Blockly.Blocks['compute'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Calculer : ");
        this.appendDummyInput()
            .appendField("Resultat : ")
            .appendField(new Blockly.FieldTextInput("nom", null, SimpleVariables.GetNames, true), "NAME");
        this.appendDummyInput()
            .appendField("Expression : ")
            .appendField(new Blockly.FieldTextInput("expression", null, SimpleVariables.GetNames), "FUNCTION");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(350);
        this.setTooltip('');
        this.setHelpUrl('https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#skwmiv');
    }
};

Blockly.Blocks['execute'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Executer ");
        this.appendDummyInput()
            .appendField("Action :")
            .appendField(new Blockly.FieldTextInput("expression", null, SimpleVariables.GetNames), "ACTION");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setTooltip('');
        this.setHelpUrl('https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#iuhihs');
    }
};

Blockly.Blocks['switch'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Aiguillage");
        this.appendDummyInput()
            .appendField("variable :")
            .appendField(new Blockly.FieldTextInput("item", null, SimpleVariables.GetNames), "VARIABLE");
        this.appendStatementInput("STATEMENT")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(310);
        this.setTooltip('');
        this.setHelpUrl('https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#z53icu');
    }
};

Blockly.Blocks['case'] = {
    init: function () {
        this.appendStatementInput("STATEMENT")
            .setCheck(null)
            .appendField("cas : ")
            .appendField(new Blockly.FieldTextInput("default", null, SimpleVariables.GetNames), "value")
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#x7kjuy');
    }
};

Blockly.Blocks['default'] = {
    init: function () {
        this.appendStatementInput("STATEMENT")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("par defaut faire");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(270);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

//Generics : 

Blockly.Blocks['decodeboolean'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Decoder booleen :");
        this.appendDummyInput()
            .appendField("nom :")
            .appendField(new Blockly.FieldTextInput("default", null, SimpleVariables.GetNames, true), "NAME");
        this.appendDummyInput()
            .appendField("position :");
        this.appendDummyInput()
            .appendField("octet  ")
            .appendField(new Blockly.FieldTextInput("0", null, SimpleVariables.GetNames), "BYTEPOS");
        this.appendDummyInput()
            .appendField("bit      ")
            .appendField(new Blockly.FieldTextInput("0", null, SimpleVariables.GetNames), "BITPOS");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip('');
        this.setHelpUrl('https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#re2b4h');
    }
};

Blockly.Blocks['check_frame_length'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Verifier longeur de la trame ");
        this.appendDummyInput()
            .appendField("taille attendue :")
            .appendField(new Blockly.FieldTextInput("12"), "SIZE")
            .appendField("octets");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(250);
        this.setTooltip('');
        this.setHelpUrl('https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#5739c7');
    }
};


