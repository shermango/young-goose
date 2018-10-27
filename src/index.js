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
  },
  3: {
    id: '3',
    username: 'kermit the frog'
  }
};

const resolvers = {
  Query: {
    me: (parent, args, { me }) => me,
    user: (parents, { id }) => users[id],
    users: () => Object.values(users)
  },

  User: {
    username: parent => parent.username
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    me: users[1]
  }
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen(5150, () => {
  console.log('apollo server started on port 5150/graphql');
});
