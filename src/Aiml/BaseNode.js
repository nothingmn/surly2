"use strict";

/**
 * Base node class for nodes that can have children
 */
module.exports = class BaseNode {

  /**
   * Constructor method
   * @param  {Node} node Xmllibjs node object
   */
  constructor (node, surly) {
    var child_nodes,
      node_type;

    this.type = 'basenode';
    this.children = [];
    this.surly = surly;

    if (typeof node.childNodes !== 'function') {
      return false;
    }

    child_nodes = node.childNodes();

    for (var i = 0; i < child_nodes.length; i++) {
      node_type = child_nodes[i].name().toLowerCase();

      switch (node_type) {
        case 'a': // Treat A tags as plain text. @todo
          this.children.push(new TextNode(child_nodes[i], this.surly));
          break;
        case 'bot':
          this.children.push(new Bot(child_nodes[i], this.surly));
          break;
        case 'br':
          this.children.push(new TextNode('\n', this.surly));
          break;
        case 'date':
          this.children.push(new DateNode('\n', this.surly));
          break;
        case 'get':
          this.children.push(new Get(child_nodes[i], this.surly));
          break;
        case 'li':
          this.children.push(new Li(child_nodes[i], this.surly));
          break;
        case 'random':
          this.children.push(new Random(child_nodes[i], this.surly));
          break;
        case 'set':
          this.children.push(new SetNode(child_nodes[i], this.surly));
          break;
        case 'size':
          this.children.push(new Size(child_nodes[i], this.surly));
          break;
        case 'srai':
          this.children.push(new Srai(child_nodes[i], this.surly));
          break;
        case 'star':
          this.children.push(new Star(child_nodes[i], this.surly));
          break;
        case 'text':
          this.children.push(new TextNode(child_nodes[i], this.surly));
          break;
        case 'uppercase':
          this.children.push(new Uppercase(child_nodes[i], this.surly));
          break;
        case 'lowercase':
          this.children.push(new Lowercase(child_nodes[i], this.surly));
          break;
        case 'formal':
          this.children.push(new Formal(child_nodes[i], this.surly));
          break;
        case 'that':
          this.children.push(new That(child_nodes[i], this.surly));
          break;
        default:
          this.children.push(new TextNode('[NOT IMPLEMENTED: ' + node_type + ']', this.surly));
      }
    }
  }

  /**
   * Render tag as text. To be overridden where necessary.
   * @return {String}
   */
  getText(callback) {
    this.evaluateChildren(callback);
  }

  /**
  * Evaluate child nodes as text. For use in child class getText methods.
  * @return {String}
  */
  evaluateChildren (respond) {
    async.concat(this.children, function (item, callback) {
      item.getText(callback);
    }, function (err, results) {
      if (typeof results !== 'string') {
        results = results.join('');
      }

      respond(err, results);
    });
  }

  getType() {
    return this.type;
  }
};

const async = require('async');

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
const Uppercase = require('./Template/Uppercase');
const Lowercase = require('./Template/Lowercase');
const Formal = require('./Template/Formal');
const That = require('./Template/That');
