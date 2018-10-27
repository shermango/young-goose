const express = require('express');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();
app.use(cors());

const schema = gql`
  type Query {
    users: [User!]
    user(id: ID!): User
    me: User

    messages: [Message!]!
    message(id: ID!): Message!
  }

  type User {
    id: ID!
    username: String!
    messages: [Message!]
  }

  type Message {
    id: ID!
    text: String!
    user: User!
  }
`;

const users = {
  1: {
    id: '1',
    username: 'Sherman Chen',
    messageIds: [1]
  },
  2: {
    id: '2',
    username: 'Robin Wieruch',
    messageIds: [2]
  }
};

const messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1'
  },
  2: {
    id: '2',
    text: 'Bye World',
    userId: '1'
  }
};

const resolvers = {
  Query: {
    users: () => Object.values(users),
    user: (parents, { id }) => users[id],
    me: (parent, args, { me }) => me,
    messages: () => Object.values(messages),
    message: (parent, { id }) => messages[id]
  },

  User: {
    username: parent => parent.username,
    messages: user => {
      return Object.values(messages).filter(
        message => message.userId === user.id
      );
    }
  },

  Message: {
    user: message => users[message.userId]
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
