import Blockly from "blockly"



Blockly.Blocks['read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Read");
    this.setOutput(true, "String");
    this.setColour(230);
    this.setTooltip("Pega o próximo elemento de entrada");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['read'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'entradaDeDados.getNextValue()';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.Blocks['write'] = {
  init: function() {
    this.appendValueInput("text")
        .setCheck(["String", "Number"])
        .appendField("Write");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Escreve na saída o valor desejado");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['write'] = function(block) {
  var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = `salvarSaida(${value_text});\n`;
  return code;
};

Blockly.Blocks['writeln'] = {
  init: function() {
    this.appendValueInput("text")
        .setCheck(["String", "Number"])
        .appendField("WriteLn");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Escreve na saída o valor desejado com quebra de linha ao final");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['writeln'] = function(block) {
  var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = `salvarSaida(${value_text||"''"},"\\n");\n`;
  return code;
};

Blockly.Blocks['str_to_number'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("strToNumber");
    this.appendValueInput("str")
        .setCheck("String");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(230);
  this.setTooltip("Transforma a string em um valor numérico");
  this.setHelpUrl("");
  }
};


Blockly.JavaScript['str_to_number'] = function(block) {
  var value_str = Blockly.JavaScript.valueToCode(block, 'str', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = `Number(${value_str})`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};