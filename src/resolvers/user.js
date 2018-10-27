module.exports = {
  Query: {
    users: (parents, args, { models }) => Object.values(models.users),
    user: (parents, { id }, { models }) => models.users[id],
    me: (parent, args, { me }) => me
  },

  User: {
    username: parent => parent.username,
    messages: (user, args, { models }) => {
      return Object.values(models.messages).filter(
        message => message.userId === user.id
      );
    }
  }
};
