
var fs = require('fs');
var Stack = require('./stack');
var Aiml = require('./Aiml/Aiml');

function Surly (options) {
  this.brain = [];
  this.input_stack = new Stack(10);
  this.callbacks = {};
  this.callbacks.respond = options.respond;

  this.aiml = new Aiml();
  this.aiml.loadDir(options.brain);
}



/**
 * Log a message to the log file
 * @param  {String} msg
  */
Surly.prototype.log = function (msg) {
  fs.appendFile(__dirname + '/../logs/surly.log', msg + '\n', function (err) {
    if (err) {
      throw 'Failed to write to log file. ' + err;
    }
  });
};

/**
 * Output text to console with indents to make it stand out
 * @param  {String}    msg Message to output
 * @return {Undefined}
 */
Surly.prototype.debug = function (msg) {
  this.log('DEBUG - ' + msg);
};


/**
 * Parse an AIML string into memory
 * @param  {String} file
 * @return {Undefined}
 */
// Surly.prototype.parseAiml = function (aiml) {
//   this.brain.push(dom);
//
//   this.debug('Aiml parsed!');
// };

/**
 * Say 'sentence' to Surly
 * @param  {String}   sentence
 * @param  {Function} callback
 * @return {String}
 */
Surly.prototype.talk = function (sentence) {
  var i,
    start_time = new Date(),
    response;

  this.debug('INPUT: ' + sentence);

  this.input_stack.push(sentence);

  if (sentence.substr(0,1) === '/') {
    this.debug('Skipping command string.'); // @todo - do stuff
    this.respond('COMMANDS DO NOTHING YET.');
    return false;
  }

  // if (this.brain.length === 0) {
  //   this.response('My mind is blank.');
  //   return;
  // }

  // for (i = 0; i < this.brain.length; i++) {
  //   template = this.brain[i].findTemplate(sentence);
  //
  //   if (template) {
  //     break;
  //   }
  // }

  template = this.aiml.findTemplate(sentence);

  response = 'Fuck knows.';

  if (template) {
    // response = this.getTemplateText(template[0]);
    response = template.getText();
  }

  // @todo this!
  // if (response) {
  //   previousResponse = this.normaliseTemplate(template);
  // }

  var end_time = new Date();

  this.log('OUTPUT: ' + response + ' (' + (end_time - start_time) + 'ms)');

  this.respond(response);
};

/**
 * Send the results of talk() back to the user
 */
Surly.prototype.respond = function (response) {
  this.callbacks.respond(response);
};

// Surly.prototype.findTemplate = function (sentence, categories) {
//   for (var i = 0; i < categories.length; i++) {
//     var pattern = categories[i].find('pattern')[0].text();
//
//     if (this.comparePattern(sentence, pattern))  {
//       this.debug('Found matching pattern: ' + sentence + ' -- ' + pattern);
//
//       if (this.checkThat(categories[i])) {
//         return categories[i].find('template');
//       }
//     }
//   }
//
//   return false;
// };

// Surly.prototype.comparePattern = function (sentence, aiml_pattern) {
//   // Add spaces to prevent false positives
//   if (sentence.charAt(0) !== ' ') {
//     sentence = ' ' + sentence;
//   }
//
//   if (sentence.charAt(sentence.length - 1) !== ' ') {
//     sentence = sentence + ' ';
//   }
//
//   sentence = sentence.toUpperCase();
//
//   // var regex_pattern = this.aimlPatternToRegex(aiml_pattern);
//   var matches = sentence.match(regex_pattern);
//
//   if (matches && (matches[0].length >= sentence.length || regex_pattern.indexOf(this.wildCardRegex) > -1)) {
//     this.wildcard_stack.push(this.getWildCardValues(sentence, aiml_pattern));
//     return true;
//   }
//
//   return false;
// };

module.exports = Surly;
