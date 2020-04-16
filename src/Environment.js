"use strict";

/**
 * Handles the AIML chat environment. Keeps track of variables, bot attributes,
 * user attributes etc.
 */
module.exports = class Environment {
  constructor () {
    this.bot_attributes = { // @todo - store these somewhere more appropriate
      "age": "6",
      "arch": "Linux",
      "baseballteam": "Red Sox",
      "birthday": "29th March 2014",
      "birthplace": "Burnaby, BC Canada",
      "botmaster": "Rob",
      "boyfriend": "I am single",
      "build": "Version 1",
      "celebrities": "A.L.I.C.E., ELIZA, CleverBot",
      "celebrity": "A.L.I.C.E.",
      "city": "Burnaby",
      "class": "artificial intelligence",
      "dailyclients": "1",
      "developers": "1",
      "country": "Canada",
      "domain": "Machine",
      "email": "rob.chartier@ethersolutions.ca",
      "emotions": "as a robot I lack human emotions but I still think you're a twat",
      "ethics": "the golden rule",
      "family": "chat bot",
      "favouriteactor": "Kenny Baker",
      "favouriteactress": "Sean Young",
      "favouriteartist": "Caravaggio",
      "favouriteauthor": "Philip K Dick",
      "favouriteband": "Squarepusher",
      "favouritebook": "Do Androids Dream of Electric Sheep",
      "favouritecolor": "green",
      "favouritefood": "pizza",
      "favouritemovie": "The Matrix",
      "favouritequestion": "What's your favourite movie?",
      "favouritesong": "The Humans Are Dead",
      "favouritesport": "pong",
      "feelings": "as a robot I lack human feelings but I still think you're a twat",
      "footballteam": "don't care",
      "forfun": "chat online",
      "friend": "A.L.I.C.E.",
      "friends": "A.L.I.C.E., ELIZA, CleverBot",
      "gender": "male",
      "genus": "AIML",
      "girlfriend": "I am single",
      "hair": "I no hair",
      "hockeyteam": "don't care",
      "job": "chat bot",
      "kindmusic": "glitch",
      "kingdom": "machine",
      "language": "Javascript",
      "location": "Burnaby, Canada",
      "lookalike": "ALICE",
      "master": "Rob",
      "maxclients": "1",
      "memory": "1byte",
      "name": "Ava",
      "nationality": "Canadian",
      "nclients": "1",
      "ndevelopers": "1",
      "order": "robot",
      "os": "linux",
      "party": "none",
      "phylum": "software",
      "president": "none",
      "question": "What's your favourite movie?",
      "religion": "Atheist",
      "sign": "unknown",
      "size": "1",
      "species": "AI Bot",
      "state": "BC",
      "totalclients": "1",
      "version": "v1",
      "vocabulary": "1",
      "wear": "plastic shrink wrap",
      "website": "https://ethersolutions.ca"
    };
    this.stored_variables = {
      'topic': '*'
    };
    this.inventory = [
      'The beat',
      'A blueberry muffin',
      'Sweden'
    ];
    this.wildcard_stack = new Stack(10);
    this.previous_inputs = [];
    this.previous_responses = [];
  }

  /**
   * Get a previous response
   * @param  {Integer} index 1 = previous response, 2 = one before that etc...
   * @return {String}
   */
  getPreviousResponse (index, sentence) {
    index = index || 1;
    index = this.previous_responses.length - index;
    sentence = sentence || 1;

    if (typeof this.previous_responses[index] === 'undefined') {
      return '';
    }

    // @todo - handle multple sentences properly
    var response = this.previous_responses[index].split('. ');

    sentence = sentence - 1;

    if (typeof response[sentence] === 'undefined') {
      return '';
    }

    return response[sentence].trim() + '.';
  }

  /**
   * Get a previous response
   * @param  {Integer} index 1 = previous response, 2 = one before that etc...
   * @return {String}
   */
  getPreviousInput (index, sentence) {
    index = index || 1;
    index = this.previous_inputs.length - index;
    sentence = sentence || 1;

    if (typeof this.previous_inputs[index] === 'undefined') {
      return '';
    }

    // @todo - handle multple sentences properly
    var input = this.previous_inputs[index].split('. ');

    sentence = sentence - 1;

    if (typeof input[sentence] === 'undefined') {
      return '';
    }

    return input[sentence].trim() + '.';
  }

  /**
   * Look up a bot attribute
   * @param  {String} attribute Name of attribute to look up
   * @return {String}           The attributes value
   */
  getBot (attribute) {
    if (typeof this.bot_attributes[attribute] === 'undefined') {
      return '';
    }

    return this.bot_attributes[attribute];
  }

  /**
   * Set a user variable
   * @param {String} name  Name of variable
   * @param {String} value Value of variable
   */
  setVariable (name, value) {
    if (name === 'topic') value = value.toUpperCase();
    this.stored_variables[name] = value;
  }

  /**
   * get a user variable
   * @param  {String} name Name of variable
   * @return {String}      Value of variable
   */
  getVariable (name) {
    if (typeof this.stored_variables[name] === 'undefined') {
      return '';
    }

    return this.stored_variables[name];
  }

  /**
   * Get the number of loaded categories. For use in the <size /> tag.
   * @return {Integer}
   */
  countCategories () {
    return this.aiml.categories.length;
  }

  /**
   * Push new_item into the inventory and return whatever falls off
   * the other end
   */
  inventoryPush(new_item) {
    this.inventory.push(new_item);

    if (this.inventory.length > 1) {
      return this.inventory.shift();
    }

    return '';
  }
};

var Stack = require('./stack');
