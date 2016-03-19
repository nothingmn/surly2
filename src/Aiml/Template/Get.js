"use strict";

var BaseNode = require('../BaseNode');

module.exports = class Get extends BaseNode {
  constructor (node, surly) {
    super(node, surly);
    this.type = 'get';
    this.name = node.attr('name').value();
    this.default = node.attr('default');

    if (!this.name) {
      throw "Invalid AIML: Get tag with no name attribute.";
    }
  }

  getText(callback) {
    var value = this.surly.environment.getVariable(this.name);

    if (value) {
      callback(null, value);
    } else if (this.default) {
      callback(null, this.default);
    } else {
      callback(null, '[UNKNOWN]');
    }
  }
};
