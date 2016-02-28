"use strict";

const BaseNode = require('./BaseNode');

/**
 * AIML template node. Child nodes may include one or more of the following:
 *
 * Atomic template elements:
 *  - Plain Text
 *  - Star
 *  - TemplateThat
 *  - Input
 *  - Thatstar
 *  - Topicstar
 *  - Get
 *  - Bot
 *  - SR
 *  - Person
 *  - Person2
 *  - Gender
 *  - Date
 *  - ID
 *  - Size
 *  - Version
 *
 * Text formatting elements
 *  - Uppercase
 *  - Lowercase
 *  - Formal
 *  - Sentence
 *
 * Conditional elements
 *  - Condition (block, single predicate, multi-predicate)
 *
 * Capture elements
 *  - Set
 *  - Gossip
 *
 * Symbolic reduction elements
 *  - SRAI
 *
 * Transformational elements
 *  - Person
 *  - Person2
 *  - Gender
 *
 * Covert elements
 *  - Think
 *  - Learn
 *
 * External processor elements
 *  - System
 *  - Javascript
 *
 * @param {Node} template libxmljs representation of AIML template node
 */
module.exports = class Template extends BaseNode {};
