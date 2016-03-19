"use strict";

var BaseNode = require('../BaseNode');

/**
 * Pattern-side THAT AIML node. The text of this node is compared
 * to the previous response. If it does not match then the category is skipped
 */
module.exports = class PatternThat extends BaseNode {
  constructor (node, surly, category) {
    super(node, surly);
    this.category = category;
  }

  // getText() {
  //   console.log('patternthat gettext');
  // }
};
