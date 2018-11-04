const { GraphQLDateTime } = require('graphql-iso-date');
const userResolvers = require('../resolvers/user');
const messageResolvers = require('../resolvers/message');

const customScalarResolver = {
  Date: GraphQLDateTime
};

module.exports = [customScalarResolver, userResolvers, messageResolvers];
