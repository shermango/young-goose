const { PubSub } = require('apollo-server');

const pubsub = new PubSub();

const MESSAGE_EVENTS = require('./message');

const EVENTS = {
  MESSAGE: MESSAGE_EVENTS
};

module.exports = {
  pubsub,
  EVENTS
};
