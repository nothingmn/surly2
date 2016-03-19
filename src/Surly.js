"use strict";

var fs = require('fs');
var Stack = require('./stack');
var Aiml = require('./Aiml/Aiml');
var Environment = require('./Environment');

module.exports = class Surly {
  constructor (options) {
    this.brain = [];
    this.input_stack = new Stack(10);
    this.callbacks = {};
    this.callbacks.respond = options.respond;
    this.environment = new Environment();
    this.aiml = new Aiml({
      surly: this
    });
    this.aiml.loadDir(options.brain);
    this.environment.aiml = this.aiml; // @todo this is getting circular. Hmmm.
    this.previous_response = '';
  }

  /**
  * Log a message to the log file
  * @param  {String} msg
  */
  log (msg) {
    fs.appendFile(__dirname + '/../logs/surly.log', msg + '\n', function (err) {
      if (err) {
        throw 'Failed to write to log file. ' + err;
      }
    });
  }

  /**
  * Output text to console with indents to make it stand out
  * @param  {String}    msg Message to output
  * @return {Undefined}
  */
  debug () {
    var msg = Array.prototype.join.call(arguments, ', ');
    this.log('DEBUG - ' + msg);
  }

  /**
  * Say 'sentence' to Surly
  * @param  {String}   sentence
  * @param  {Function} callback
  * @return {String}
  */
  talk (sentence, callback, user_id) {
    var i,
      start_time = new Date(),
      response;

    this.debug('INPUT: ' + sentence);
    this.input_stack.push(sentence);

    if (sentence.length === 0) {
      callback(null, 'Speak up!');
      return;
    }

    if (sentence.substr(0,1) === '/') {
      this.debug('Skipping command string.'); // @todo - do stuff
      this.respond('COMMANDS DO NOTHING YET.');
      return;
    }

    if (this.environment.countCategories() === 0) {
      callback(null, 'My mind is blank.');
      return;
    }

    this.aiml.getResponse(sentence, function (err, result) {
      this.handleResult(result);
      callback(err, result);
    }.bind(this));
  }

  /**
  * Do any extra stuff that needs doing with the results
  */
  handleResult (response) {
    // process.exit();
    // var end_time = new Date();
    //
    // this.log('OUTPUT: ' + response + ' (' + (end_time - start_time) + 'ms)');
    // this.respond(response);

    // @todo this!
    // if (response) {
    //   previousResponse = this.normaliseTemplate(template);
    // }

    var normal_previous = this.aiml.normaliseSentence(response).trim();
    this.environment.previous_response = normal_previous;
  }
};
