"use strict";

const Category = require('./Category');

module.exports = class Topic {
  constructor (node, surly) {
    var topicName = node.attr('name').value(),
      categories = node.find('category');

    for (var i = 0; i < categories.length; i++) {
      this.log.debug('Found category in topic');
      this.surly.aiml.categories.push(new Category(categories[i]));
    }
  }
};
