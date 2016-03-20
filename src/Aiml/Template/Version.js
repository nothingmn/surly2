"use strict";

var pkg = require('../../../package.json');

/**
 * Renders the version number of Surly
 */
module.exports = class Version {
  constructor () {
    this.type = 'version';
  }

  getType () {
    return this.type;
  }

  getText (callback) {
    callback(null, pkg.version);
  }
}
