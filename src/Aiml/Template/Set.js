"use strict";

var BaseNode = require('../BaseNode');

module.exports = class Set extends BaseNode{
  constructor (node, environment) {
    super(node, environment);

    this.name = node.attr('name').value();
  }

  getText () {
    var text = super.evaluateChildren();

    this.environment.setVariable(text);

    // @todo implement return-name-when-set. See AIML spec section 7.4.1
    return '';
  }
};
