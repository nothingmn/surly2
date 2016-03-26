"use strict";

var BaseNode = require('../BaseNode');

module.exports = class Star extends BaseNode {
  constructor (node, surly) {
    super(node, surly);

    this.type = 'star';

    if (node.attr('index')) {
      this.index = node.attr('index').value() - 1;
    } else {
      this.index = 0;
    }
  }

  getText (callback) {
    var wildcards = this.surly.environment.wildcard_stack.getLast();

    if (typeof wildcards[this.index] === 'undefined') {
      this.log.debug('Error: STAR with no matching * value.');
      callback('Star with no matching * value.', 'ERROR!');
    } else {
      callback(null, wildcards[this.index]);
    }
  }
};
