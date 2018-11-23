const {GraphQLServer} = require('graphql-yoga');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Query = require('./resolvers/query');
const Mutation = require('./resolvers/mutation');

require('dotenv').config();

const typeDefs = './src/schema.graphql';

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