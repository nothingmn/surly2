"use strict";

module.exports = class Get {
  constructor (node, environment) {
    this.environment = environment;
    this.name = node.attr('name').value();
    this.default = node.attr('default');

    if (!this.name) {
      throw "Invalid AIML: Get tag with no name attribute.";
    }
  }

  getText() {
    var value = this.environment.getVariable(this.name);

    if (value) {
      return value;
    } else if (this.default) {
      return this.default;
    } else {
      return '[error]';
    }
  }
};
