const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');

const schema = require('./schema');
const resolvers = require('./resolvers');
const models = require('./models');

const app = express();
const BAD_SECRET = 'env variables what are those';
app.use(cors());

const getMe = async req => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return await jwt.verify(token, BAD_SECRET);
    } catch (e) {
      throw new AuthenticationError(
        'Your session has expired. Please sign in again'
      );
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: error => {
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      ...error,
      message
    };
  },
  context: async ({ req }) => {
    const me = await getMe(req);

    return {
      models,
      me,
      secret: BAD_SECRET
    };
  }
});

server.applyMiddleware({ app, path: '/graphql' });

const eraseDatabaseOnSync = true;

models.sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    seedData();
  }

  app.listen(5150, () => {
    console.log('apollo server started on port 5150/graphql');
  });
});

const seedData = async () => {
  await models.User.create(
    {
      username: 'schen',
      email: 'sherm@chen.com',
      password: 'supersecure',
      messages: [{ text: 'jello squirrel d00d' }],
      role: 'ADMIN'
    },
    { include: [models.Message] }
  );

  await models.User.create(
    {
      username: 'rwieruch',
      email: 'hello@robin.com',
      password: 'jellybean',
      messages: [
        { text: 'Published the Road to learn React' },
        { text: 'wrote a graphql tutorial' }
      ],
      role: 'USER'
    },
    { include: [models.Message] }
  );
};
