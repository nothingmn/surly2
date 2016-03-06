"use strict";

var BaseNode = require('../BaseNode');

module.exports = class Think extends BaseNode{
  constructor (node, surly) {
    super(node, surly);
    this.type = 'think';
  }

  getText (callback) {
    super.evaluateChildren(function (err, text) {
      callback(null, '');
    }.bind(this));
  }
};
