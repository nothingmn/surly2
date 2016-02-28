"use strict";

var BaseNode = require('../BaseNode');

module.exports = class Srai extends BaseNode {

  /**
   * Constructor method
   * @param  {Node} node Xmllibjs node object
   */
  constructor (node) {
    super(node);
    this.content = node.toString();
  }

  /**
   * Return content as text
   * @return {String}
   */
  getText () {
    // @todo - make this work!
    return '[SRAI = ' + this.content + ']';
  }
};
