"use strict";

var BaseNode = require('../BaseNode');

module.exports = class Li extends BaseNode {
  getText () {
    var output = [];

    for (var i = 0; i < this.children.length; i++) {
      output.push(this.children[i].getText());
    }

    return output.join(' ');
  }
};
