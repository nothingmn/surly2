"use strict";

/**
 * Handles the AIML chat environment. Keeps track of variables, bot attributes,
 * user attributes etc.
 */
module.exports = class Environment {
  constructor () {
    this.bot_attributes = { // @todo - store these somewhere more appropriate
      "age": "0",
      "arch": "Linux",
      "baseballteam": "Red Sox",
      "birthday": "29th March 2014",
      "birthplace": "Bristol, UK",
      "botmaster": "Mr Chimp",
      "boyfriend": "I am single",
      "build": "Surly Version 1",
      "celebrities": "A.L.I.C.E., ELIZA, CleverBot",
      "celebrity": "A.L.I.C.E.",
      "city": "Bristol",
      "class": "artificial intelligence",
      "dailyclients": "1",
      "developers": "1",
      "country": "UK",
      "domain": "Machine",
      "email": "surly@deviouschimp.co.uk",
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
      "location": "Bristol, UK",
      "lookalike": "ALICE",
      "master": "Mr Chimp",
      "maxclients": "1",
      "memory": "1byte",
      "name": "Surly2",
      "nationality": "British",
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
      "species": "Surly Bot",
      "state": "Bristol",
      "totalclients": "1",
      "version": "Surly v1",
      "vocabulary": "1",
      "wear": "plastic shrink wrap",
      "website": "https://github.com/mrchimp/surly2"
    };
    this.stored_variables = {};
  }

  /**
   * Look up a bot attribute
   * @param  {String} attribute Name of attribute to look up
   * @return {String}           The attributes value
   */
  getBot (attribute) {
    if (typeof this.bot_attributes[attribute] === 'undefined') {
      return 'Unset attribute.'; // @todo something else
    }

    return this.bot_attributes[attribute];
  }

  /**
   * Set a user variable
   * @param {String} name  Name of variable
   * @param {String} value Value of variable
   */
  setVariable (name, value) {
    this.stored_variables[name] = value;
  }

  /**
   * get a user variable
   * @param  {String} name Name of variable
   * @return {String}      Value of variable
   */
  getVariable (name) {
    if (typeof this.stored_variables[name] === 'undefined') {
      return 'Unset variable'; // @todo something else
    }

    return this.stored_variables[name];
  }
};
