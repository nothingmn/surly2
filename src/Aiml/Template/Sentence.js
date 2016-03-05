"use strict";

var BaseNode = require('../BaseNode');

/**
 * Uppercase first character of each sentence. Make all other text lowercase.
 */
module.exports = class Sentence extends BaseNode {
  getText (callback) {
    this.evaluateChildren(function (err, text) {
      var sentences = text.toLowerCase().split('.');

      for (var i = 0; i < sentences.length; i++) {
        sentences[i] = sentences[i].trim();

        if (sentences[i].length === 0) {
          continue;
        }
        sentences[i] = sentences[i][0].toUpperCase() + sentences[i].slice(1);
      }

      text = sentences.join('. ');

      callback(err, text);
    })
  }
};
