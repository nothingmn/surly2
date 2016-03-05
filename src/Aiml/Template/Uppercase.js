"use strict";

var BaseNode = require('../BaseNode');

/**
 * Uppercase child content
 */
module.exports = class Uppercase extends BaseNode {
  getText (callback) {
    this.evaluateChildren(function (err, text) {
      callback(err, text.toUpperCase());
    })
  }
};
