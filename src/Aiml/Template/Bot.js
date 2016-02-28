"use strict";

module.exports = class Bot {
  constructor (node, environment) {
    this.environment = environment;
    this.name = node.attr('name').value();

    if (!this.name) {
      throw "Invalid AIML: Bot tag with no name attribute.";
    }
  }

  getText () {
    return this.environment.getBot(this.name);
  }
};
