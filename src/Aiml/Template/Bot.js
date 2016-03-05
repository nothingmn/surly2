"use strict";

var BaseNode = require('../BaseNode');

module.exports = class Bot extends BaseNode {
  constructor (node, surly) {
    super(node, surly);
    this.type = 'bot';
    this.name = node.attr('name').value();

    if (!this.name) {
      throw "Invalid AIML: Bot tag with no name attribute.";
    }
  }

  getText (callback) {
    callback(null, this.surly.environment.getBot(this.name));
  }
};
