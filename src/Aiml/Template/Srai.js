"use strict";

var BaseNode = require('../BaseNode');
var Surly = require('../../Surly');

/**
 * Pass template contents as input to surly
 */
module.exports = class Srai extends BaseNode {

  /**
   * Constructor method
   * @param  {Node} node Xmllibjs node object
   */
  constructor (node, surly) {
    super(node, surly);
    this.type = 'srai';
    this.content = node.text().toString();
  }

  /**
   * Return content as text
   * @return {String}
   */
  getText (callback) {
    // @todo - make this work!
    this.surly.talk(callback, this.content);
  }
};
