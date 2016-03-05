"use strict";

var BaseNode = require('../BaseNode');

module.exports = class Sr extends BaseNode {
  constructor (node, surly) {
    this.type = 'sr';
    this.surly = surly;
  }

  getText (callback) {
    var star = this.surly.environment.wildcard_stack.getLast();
    callback(star);
  }
};
