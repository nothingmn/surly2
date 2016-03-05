"use strict";

var BaseNode = require('../BaseNode');

module.exports = class Size extends BaseNode {
  constructor (node, surly) {
    super(node, surly);
  }

  getText (callback) {
    callback(null, this.surly.environment.countCategories());
  }
};
