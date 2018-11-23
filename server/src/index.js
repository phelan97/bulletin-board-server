const {GraphQLServer} = require('graphql-yoga');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
// const typeDefs = require('./schema.graphql');
const Query = require('./resolvers/query');
const Mutation = require('./resolvers/mutation');
const User = require('./models/user');

require('dotenv').config();

// board(boardId: ID!): Board!
const typeDefs = `
type Query {
  board(boardId: ID!): Board!
  boards: [Board!]!
}

type Mutation {
  signup(email: String!, password: String!): String!,
  login(email: String!, password: String!): String!,
  addBoard(title: String!): Board!,
  addList(boardId: ID!, title: String!): List!,
  addCard(listId: ID!, content: String!): Card!
}

type Board {
  id: ID!
  title: String!
  lists: [List]!
}

type List {
  id: ID!
  title: String!
  cards: Card!
}

type Card {
  id: ID!
  content: String!
}
`;

const resolvers = {
  Query,
  Mutation
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: incomingData => ({
    incomingData,
    isAuthorized: () => {
      const authHeader = incomingData.request.header('Authorization');
      if(!authHeader) {
        throw('Unauthorized');
      }
      const token = authHeader.replace('Bearer ', '');
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      return decodedToken;
    }
  })
});

if(require.main === module) {
  mongoose.connect('mongodb://localhost/trello-clone');
  server.start(() => console.log('Server started'));
}