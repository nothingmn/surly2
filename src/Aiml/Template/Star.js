"use strict";

var BaseNode = require('../BaseNode');

module.exports = class Star extends BaseNode {
  constructor (node, environment) {
    super(node, environment);

    if (node.attr('index')) {
      this.index = node.attr('index').value() - 1;
    } else {
      this.index = 0;
    }
  }

  getText () {
    var wildcards = this.environment.wildcard_stack.getLast();

    if (typeof wildcards[this.index] === 'undefined') {
      this.debug('Error: STAR with no matching * value.');
    } else {
      return wildcards[this.index];
    }
  }
};
