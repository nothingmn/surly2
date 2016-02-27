var Template = require('./Template');
var Pattern = require('./Pattern');
var That = require('./Pattern/That');

/**
 * Category node. Children MUST include a single `pattern` node AND a single
 * `template` node. It also MAY include a single `that` node.
 * @param {Node} category   libxmljs representation of AIML category node
 */
function Category (category) {
  var patterns = category.find('pattern');
  var templates = category.find('template');
  var thats = category.find('that');

  if (patterns.length !== 1) {
    throw 'Category should have exactly one PATTERN.';
  }

  if (templates.length !== 1) {
    throw 'Category should have exactly one TEMPLATE.';
  }

  this.pattern = new Pattern(patterns[0]);
  this.pattern.category = this;
  this.template = new Template(templates[0]);
  this.template.category = this;

  this.that = '';

  if (thats.length === 1) {
    this.that = new PatternThat(thats[0]);
    this.that.category = this;
  } else if (thats.length > 1) {
    throw 'Category must not contain more than one THAT.';
  }

}

/**
 * Return the child pattern element
 * @return {Pattern}
 */
Category.prototype.getPattern = function () {
  return this.pattern;
};

/**
 * Check whether the category has a <that> and whether
 * if matches the previous response
 * @param  {Object}  category Libxmljs category aiml node
 * @return {Boolean}          True if <that> exists and matches
 */
Category.prototype.checkThat = function (previous_response) {
  // If no THAT then it matches by default
  if (!this.that) {
    return true;
  }

  return this.that.text() === previous_response.toUpperCase();
};

/**
 * Return the template node
 * @return {Template}
 */
Category.prototype.getTemplate = function () {
  return this.template;
};

module.exports = Category;
