"use strict";

/**
 * Base node class for nodes that can have children
 */
module.exports = class BaseNode {

  /**
   * Constructor method
   * @param  {Node} node Xmllibjs node object
   */
  constructor (node, environment) {
    var child_nodes,
      node_type;

    this.children = [];
    this.environment = environment;

    child_nodes = node.childNodes();

    for (var i = 0; i < child_nodes.length; i++) {
      node_type = child_nodes[i].name().toLowerCase();

      switch (node_type) {
        case 'text':
          this.children.push(new Text(child_nodes[i], this.environment));
          break;
        case 'br':
          this.children.push(new Text('\n', this.environment));
          break;
        case 'a': // Treat A tags as plain text. @todo
          this.children.push(new Text(child_nodes[i], this.environment));
          break;
        case 'srai':
          this.children.push(new Srai(child_nodes[i], this.environment));
          break;
        case 'random':
          this.children.push(new Random(child_nodes[i], this.environment));
          break;
        case 'li':
          this.children.push(new Li(child_nodes[i], this.environment));
          break;
        case 'bot':
          this.children.push(new Bot(child_nodes[i], this.environment));
          break;
        default:
          this.children.push(new Text('[NOT IMPLEMENTED: ' + node_type + ']', this.environment));
      }
    }
  }

  /**
   * Return the node and any children as text
   * @return {String}
   */
  getText() {
    var output = '';

    for (var i = 0; i < this.children.length; i++) {
      output += this.children[i].getText();
    }

    return output;
  }
};

const Li = require('./Template/Li');
const Bot = require('./Template/Bot');
const Text = require('./Template/Text');
const Srai = require('./Template/Srai');
const Random = require('./Template/Random');
