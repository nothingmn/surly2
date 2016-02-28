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
      environment: this.environment
    });
    this.aiml.loadDir(options.brain);
    this.environment.aiml = this.aiml; // @todo this is getting circular. Hmmm.
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
  talk (sentence, user_id) {
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
  }

  /**
  * Send the results of talk() back to the user
  */
  respond (response) {
    this.callbacks.respond(response);
  }
};
