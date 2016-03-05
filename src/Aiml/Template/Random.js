"use strict";

var BaseNode = require('../BaseNode');

/**
 * A set of nodes. When rendered a random element will be retruned.
 * Should the element be chosen at instantiation time? Maybe.
 * @param {BaseNode} node libxmljs node
 */
module.exports = class Random extends BaseNode {
  getText (callback) {
    var elem = this.children[Math.floor(Math.random() * this.children.length)];

    elem.getText(callback);
  }
};
