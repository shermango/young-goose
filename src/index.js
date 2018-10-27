const express = require('express');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();
app.use(cors());

const schema = gql`
  type Query {
    me: User
    user(id: ID!): User
    users: [User!]
  }

  type User {
    id: ID!
    username: String!
  }
`;

const users = {
  1: {
    id: '1',
    username: 'Sherman Chen'
  },
  2: {
    id: '2',
    username: 'Robin Wieruch'
  }
};

const resolvers = {
  Query: {
    me: () => users[1],
    user: (parents, { id }) => users[id],
    users: () => Object.values(users)
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen(5150, () => {
  console.log('apollo server started on port 5150/graphql');
});
