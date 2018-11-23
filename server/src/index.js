const {GraphQLServer} = require('graphql-yoga');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// const typeDefs = require('./schema.graphql');
const Query = require('./resolvers/query');
const Mutation = require('./resolvers/mutation');

require('dotenv').config();

const typeDefs = `
type Query {
  test: String!
}

type Mutation {
  signup(email: String!, password: String!): String!,
  login(email: String!, password: String!): String!,
  addBoard: Board!,
  addList(boardId: ID!): List!,
  addCard(listId: ID!): Card!
}

type Board {
  id: ID!
  title: String!
  contents: [List!]!
}

type List {
  id: ID!
  title: String!
  cards: Card!
}

type Card {
  id: ID!
  text: String!
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