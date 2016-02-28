"use strict";

/**
 * Plain text node. This is build to function the same as a BaseNode but it
 * doesn't inherit because the constructor needs to be different and I don't
 * know it's late leave me alone.
 * @param {Node} node  libxmljs node
 */
module.exports = class Text {

  /**
   * Constructor method
   * @param  {Node} node Xmllibjs node object
   */
  constructor (node) {
    this.children = [];

    if (typeof node === 'string') {
       this.content = node;
    } else {
      this.content = node.toString();
    }
  }

  /**
   * Return the node and any children as text
   * @return {String}
   */
  getText () {
    return this.content;
  }
};
