const Sequelize = require('sequelize');
const { combineResolvers } = require('graphql-resolvers');
const { isAuthenticated, isMessageOwner } = require('./authorization');

const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii');

const toCursorHash = string => Buffer.from(string).toString('base64');

module.exports = {
  Query: {
    messages: async (parents, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
            where: {
              createdAt: {
                [Sequelize.Op.lt]: fromCursorHash(cursor)
              }
            }
          }
        : null;

      const messages = await models.Message.findAll({
        order: [['createdAt', 'DESC']],
        limit: limit + 1,
        ...cursorOptions
      });

      const hasNextPage = messages.length > limit;
      const edges = hasNextPage ? messages.slice(0, -1) : messages;

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash(edges[edges.length - 1].createdAt.toString())
        }
      };
    },

    message: async (parent, { id }, { models }) => {
      return await models.Message.findById(id);
    }
  },

  Mutation: {
    createMessage: combineResolvers(
      isAuthenticated,
      async (parent, { text }, { me, models }) => {
        return await models.Message.create({
          text,
          userId: me.id
        });
      }
    ),

    deleteMessage: combineResolvers(
      isAuthenticated,
      isMessageOwner,
      async (parent, { id }, { models }) => {
        return await models.Message.destroy({
          where: {
            id
          }
        });
      }
    )
  },

  Message: {
    user: async (message, args, { models }) => {
      return await models.User.findById(message.userId);
    }
  }
};
