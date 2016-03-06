"use strict";

var BaseNode = require('../BaseNode');

module.exports = class Set extends BaseNode{
  constructor (node, surly) {
    super(node, surly);
    this.type = 'set';
    this.name = node.attr('name').value();
  }

  getText (callback) {
    super.evaluateChildren(function (err, text) {
      this.surly.environment.setVariable(this.name, text);
    }.bind(this));

    // @todo implement return-name-when-set. See AIML spec section 7.4.1
    callback(null, '');
  }
};
