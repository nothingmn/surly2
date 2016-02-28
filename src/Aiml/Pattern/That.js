"use strict";

var BaseNode = require('../BaseNode');

/**
 * Pattern-side THAT AIML node. The text of the node is compared
 * to the previous response. If it does not match then the category is skipped
 */
module.exports = class PatternThat extends BaseNode {};
