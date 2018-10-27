const uuid = require('uuid/v4');

module.exports = {
  Query: {
    messages: (parents, args, { models }) => Object.values(models.messages),
    message: (parent, { id }, { models }) => models.messages[id]
  },

  Mutation: {
    createMessage: (parent, { text }, { me, models }) => {
      const id = uuid();
      const message = {
        id,
        text,
        userId: me.id
      };

      models.messages[id] = message;
      models.users[me.id].messageIds.push(id);

      return message;
    },

    deleteMessage: (parent, { id }, { models }) => {
      const { [id]: message, ...otherMessages } = models.messages;

      if (!message) {
        return false;
      }

      models.messages = otherMessages;

      return true;
    },

    updateMessage: (parent, { id, text }, { models }) => {
      // assume message always exists
      const { [id]: message, ...otherMessages } = models.messages;

      message.text = text;

      return Object.assign({}, models.messages, message);
    }
  },

  Message: {
    user: (message, args, { models }) => models.users[message.userId]
  }
};
