"use strict";

var BaseNode = require('../BaseNode');

module.exports = class Uppercase extends BaseNode {
  getText (callback) {
    this.evaluateChildren(function (err, text) {
      callback(err, text.toUpperCase());
    })
  }
};
