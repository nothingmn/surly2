"use strict";

var BaseNode = require('../BaseNode');

module.exports = class That extends BaseNode {
  getText (callback) {
    callback(null, this.surly.environment.previous_response);
  }
};
