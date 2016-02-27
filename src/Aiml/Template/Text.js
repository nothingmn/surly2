
/**
 * Plain text
 * @param {Node} node  libxmljs node
 */
function Text(node) {
  this.content = node.toString();
  this.children = [];
}

Text.prototype.getText = function () {
  return this.content;
};

module.exports = Text;
