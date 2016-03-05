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
  debug (msg) {
    this.log('DEBUG - ' + msg);
  }

  /**
  * Say 'sentence' to Surly
  * @param  {String}   sentence
  * @param  {Function} callback
  * @return {String}
  */
  talk (callback, sentence, user_id) {
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

    var template = this.aiml.findTemplate(sentence);

    if (template) {
      template.getText(function (err, result) {
        this.handleResult(result);
        callback(err, result);
      }.bind(this));
    } else {
      callback('No match.', 'Fuck knows.');
    }

    // @todo this!
    // if (response) {
    //   previousResponse = this.normaliseTemplate(template);
    // }

    // var end_time = new Date();
    //
    // this.log('OUTPUT: ' + response + ' (' + (end_time - start_time) + 'ms)');
    // this.respond(response);
  }

  /**
  * Do any extra stuff that needs doing with the results
  */
  handleResult (response) {
    this.previous_response = response;
  }
};
