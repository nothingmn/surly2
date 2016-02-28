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
        case 'a': // Treat A tags as plain text. @todo
          this.children.push(new TextNode(child_nodes[i], this.environment));
          break;
        case 'bot':
          this.children.push(new Bot(child_nodes[i], this.environment));
          break;
        case 'br':
          this.children.push(new TextNode('\n', this.environment));
          break;
        case 'date':
          this.children.push(new DateNode('\n', this.environment));
          break;
        case 'get':
          this.children.push(new Get(child_nodes[i], this.environment));
          break;
        case 'li':
          this.children.push(new Li(child_nodes[i], this.environment));
          break;
        case 'random':
          this.children.push(new Random(child_nodes[i], this.environment));
          break;
        case 'set':
          this.children.push(new SetNode(child_nodes[i], this.environment));
          break;
        case 'size':
          this.children.push(new Size(child_nodes[i], this.environment));
          break;
        case 'srai':
          this.children.push(new Srai(child_nodes[i], this.environment));
          break;
        case 'star':
          this.children.push(new Star(child_nodes[i], this.environment));
          break;
        case 'text':
          this.children.push(new TextNode(child_nodes[i], this.environment));
          break;
        default:
          this.children.push(new TextNode('[NOT IMPLEMENTED: ' + node_type + ']', this.environment));
      }
    }
  }

  /**
   * Render tag as text. To be overridden where necessary.
   * @return {String}
   */
  getText() {
    return this.evaluateChildren();
  }


  /**
  * Evaluate child nodes as text. For use in child class getText methods.
  * @return {String}
  */
  evaluateChildren () {
    var output = '';

    for (var i = 0; i < this.children.length; i++) {
      output += this.children[i].getText();
    }

    return output;
  }
};

const Li = require('./Template/Li');
const Bot = require('./Template/Bot');
const Get = require('./Template/Get');
const DateNode = require('./Template/DateNode');
const SetNode = require('./Template/Set');
const TextNode = require('./Template/Text');
const Srai = require('./Template/Srai');
const Star = require('./Template/Star');
const Size = require('./Template/Size');
const Random = require('./Template/Random');
