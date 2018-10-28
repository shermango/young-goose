const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

const schema = require('./schema');
const resolvers = require('./resolvers');
const models = require('./models');

const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async () => ({
    models,
    me: await models.User.findByLogin('schen')
  })
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
      messages: [{ text: 'jello squirrel d00d' }]
    },
    { include: [models.Message] }
  );

  await models.User.create(
    {
      username: 'rwieruch',
      messages: [
        { text: 'Published the Road to learn React' },
        { text: 'wrote a graphql tutorial' }
      ]
    },
    { include: [models.Message] }
  );
};
