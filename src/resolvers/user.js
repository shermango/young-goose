module.exports = {
  Query: {
    users: async (parents, args, { models }) => {
      return await models.User.findAll();
    },
    user: async (parents, { id }, { models }) => {
      return await models.User.findById(id);
    },
    me: async (parent, args, { models, me }) => {
      if (!me) return null;

      return await models.User.findById(me.id);
    }
  },

  User: {
    messages: async (user, args, { models }) => {
      return await models.Message.findAll({
        where: {
          userId: user.id
        }
      });
    }
  }
};
