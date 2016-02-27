
var Text = require('./Template/Text');

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
function Template (template) {
  var child_nodes = template.childNodes(),
  node_type;

  this.children = [];

  for (var i = 0; i < child_nodes.length; i++) {
    node_type = child_nodes[i].name().toLowerCase();

    switch (node_type) {
      case 'text':
        this.children.push(new Text(child_nodes[i]));
        break;
      default:
        this.children.push(new Text('[NOT IMPLEMENTED]'));
    }
  }
}

Template.prototype.getText = function () {
  var output = [];

  for (var i = 0; i < this.children.length; i++) {
    output.push(this.children[i].getText());
  }

  return output.join(' ');
};

module.exports = Template;
