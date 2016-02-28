"use strict";

module.exports = class DateNode {
  getText() {
    return new Date().toISOString(); // @todo - nice formatting
  }
};
