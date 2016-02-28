"use strict";

const fs = require('fs');
const BaseNode = require('./BaseNode');
const libxmljs = require('libxmljs');
const Category = require('./Category');

/**
* Main AIML handler. Contains a list of category nodes, potentially loaded
* from multiple files.
*/
module.exports = class Aiml {
  constructor () {
    /**
    * The current topic
    */
    this.topic = '*';

    this.wipe();
    this.categories = [];
    this.previous_response = '';
  }

  /**
   * Remove all loaded data from memory and set up defaults. Called when Aiml
   * object is initialised
   */
  wipe () {
    this.categories = [];
    this.topics = ['*'];
  }

  /**
   * Load an AIML string
   * @param {String} aiml    A whole AIML file
   */
  parseAiml (aiml) {
    // @todo handle topics
    var xmlDoc = libxmljs.parseXmlString(aiml),
      categories = xmlDoc.find('category');

    for (var i = 0; i < categories.length; i++) {
      this.debug('Found category.', categories[i]);
      this.categories.push(new Category(categories[i]));
    }
  }

  /**
   * Simple check to see if any data has been loaded
   * @return {Boolean} True if data has been loaded
   */
  hasData () {
    return this.categories.length > 0;
  }

  /**
   * Loop through loaded AIML and return the `template` from the first `category`
   * with a `pattern` that matches `sentence`.
   * @param {String} sentence    Text input from user
   */
  findTemplate (sentence) {
    if (!this.hasData()) {
      throw 'No data loaded.';
    }

    sentence = this.normaliseSentence(sentence);

    for (var i = 0; i < this.categories.length; i++) {
      var pattern = this.categories[i].getPattern();

      if (pattern.compare(sentence)) {
        this.debug('Found matching pattern: ' + sentence + ' -- ' + pattern);

        if (this.categories[i].checkThat(this.previous_response)) {
          return this.categories[i].getTemplate();
        }
      }
    }

    return false;
  }

  /**
   * Find files in a dir and run loadAimlFile on them
   * @param  {String} dir
   * @return {Undefined}
   */
  loadDir (dir, callback) {
    var files = fs.readdirSync(dir);

    this.debug('Loading dir', dir);

    for (var i in files) {
      if (!files.hasOwnProperty(i)) continue;

      var name = dir + '/' + files[i];

      if (fs.statSync(name).isDirectory()) {
        this.debug('Ignoring directory: ' + name);
      } else if (name.substr(-5).toLowerCase() === '.aiml') {
        this.loadFile(name, callback);
      }
    }
  }

  /**
   * Load an AIML file
   * @param  {String} file
   * @return {Undefined}
   */
  loadFile (file, callback) {
    this.debug('Loading file: ', file);
    fs.readFile(file, 'utf8', function (err, xml) {
      if (err) {
        throw 'Failed to load AIML file. ' + err;
      }

      this.parseAiml(xml);
    }.bind(this));
  }

  /**
   * Log a message to the log file
   * @param  {String} msg
    */
  log (msg) {
    fs.appendFile(__dirname + '/../../logs/surly.log', msg + '\n', function (err) {
      if (err) {
        throw 'Failed to write to log file. ' + err;
      }
    });
  }

  /**
   * Output text to console with indents to make it stand out
   * @param  {String}    msg Message to output. Multiple messages will be concatenated.
   * @return {Undefined}
   */
  debug (msg) {
    this.log('DEBUG - ' + Array.prototype.join.call(arguments, ' '));
  }

  /**
   * Perform input normalisation. See AIML spec section 8.3
   * Should include:
   *  - Substitution normalisations
   *  - Sentence-splitting normalisations
   *  - Pattern-fitting normalisations
   * @todo - check against spec
   *
   * @param  {[type]} sentence [description]
   * @return {[type]}          [description]
   */
  normaliseSentence (sentence) {
    // add spaces to prevent false positives
    if (sentence.charAt(0) !== ' ') {
      sentence = ' ' + sentence;
    }

    if (sentence.charAt(sentence.length - 1) !== ' ') {
      sentence = sentence + ' ';
    }

    sentence = sentence.toUpperCase(); // @todo - remove this

    return sentence;
  }
};
