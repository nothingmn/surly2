"use strict";

var BaseNode = require('../BaseNode');

/**
 * Uppercase the first letter of each word.
 * Also known as Title Case.
 */
module.exports = class Formal extends BaseNode {
  getText (callback) {
    this.evaluateChildren(function (err, text) {
      text = text
        .toLowerCase()
        .replace(/(?:^|\s)\S/g, function(a) {
          return a.toUpperCase();
        });
      callback(err, text);
    })
  }
};
