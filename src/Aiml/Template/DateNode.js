"use strict";

var BaseNode = require('../BaseNode');

module.exports = class DateNode extends BaseNode {
  constructor(node, surly) {
    super(node, surly);
    this.type = 'date';
  }

  getText(callback) {
    callback(false, new Date().toISOString()); // @todo - nice formatting
  }
};
