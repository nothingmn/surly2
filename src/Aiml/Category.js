"use strict";

var Template = require('./Template');
var Pattern = require('./Pattern');
var PatternThat = require('./Pattern/That');

/**
 * Category node. Children MUST include a single `pattern` node AND a single
 * `template` node. It also MAY include a single `that` node.
 * @param {Node} category   libxmljs representation of AIML category node
 */
module.exports = class Category {

  /**
   * Constructor method
   * @param  {Node} node Xmllibjs node object
   */
  constructor (category, surly) {
    this.surly = surly;
    var patterns = category.find('pattern');
    var templates = category.find('template');
    var thats = category.find('that');

    if (patterns.length !== 1) {
      throw 'Category should have exactly one PATTERN.';
    }

    if (templates.length !== 1) {
      throw 'Category should have exactly one TEMPLATE.';
    }

    this.pattern = new Pattern(patterns[0], surly);
    this.pattern.category = this;
    this.template = new Template(templates[0], surly);
    this.template.category = this;

    this.that = '';

    if (thats.length === 1) {
      this.that = new PatternThat(thats[0], surly, this);
      // this.that.category = this;
    } else if (thats.length > 1) {
      throw 'Category must not contain more than one THAT.';
    }

  }

  /**
  * Return the child pattern element
  * @return {Pattern}
  */
  getPattern () {
    return this.pattern;
  }

  /**
  * Check whether the category has a <that> and whether
  * if matches the previous response
  * @param  {Object}  category Libxmljs category aiml node
  * @return {Boolean}          True if <that> exists and matches
  */
  checkThat (callback) {
    // If no THAT then it matches by default
    if (!this.that) {
      this.surly.debug('No THAT.')
      return callback(true);
    }

    this.that.getText(function (err, thatText) {
      var previous = this.surly.environment.previous_response.toUpperCase();

      this.surly.debug('Comparing THAT - "' + thatText + '", "' + previous + '"');
      callback(thatText === previous);
    }.bind(this));
  }

  /**
  * Return the template node
  * @return {Template}
  */
  getTemplate () {
    return this.template;
  }

  /**
   * Check the category against a given sentence. Also, if a THAT tag is present
   * in the category, check that against the previous response
   * @return {Boolean} True if sentence matches
   */
  match (sentence, callback) {
    if (this.pattern.compare(sentence)) {
      this.surly.debug('Found matching pattern: ' + sentence + ' -- ' + this.pattern);

      this.checkThat(function (matches) {
        callback(matches);
      }.bind(this));
    } else {
      this.surly.debug('No match');
      callback(false)
    }
  }
};
