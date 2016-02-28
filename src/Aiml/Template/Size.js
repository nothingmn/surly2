"use strict";

module.exports = class Size {
  constructor (node, environment) {
    this.environment = environment;
  }

  getText () {
    return this.environment.countCategories();
  }
};
