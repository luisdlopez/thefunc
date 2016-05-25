'use strict';

let topics = {};

exports.subscribe = function subscribe (topic, listener) {
  // Create the topic's object if not yet created
  if (!topics.hasOwnProperty.call(topics, topic)) {
    topics[topic] = [];
  }
  // Add the listener to queue
  var index = topics[topic].push(listener) - 1;
  // Provide handle back for removal of topic
  return {
    remove: function () {
      delete topics[topic][index];
    }
  };
};

exports.publish = function publish (topic, data) {
  // If the topic doesn't exist, or there's no listeners in queue, just leave
  if (!topics.hasOwnProperty.call(topics, topic)) {
    return;
  }
  // Cycle through topics queue, fire!
  topics[topic].forEach(callback => {
    callback(data || {});
  });
};
