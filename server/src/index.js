const {GraphQLServer} = require('graphql-yoga');
// const typeDefs = require('./schema.graphql');
const Query = require('./resolvers/query');
const Mutation = require('./resolvers/mutation');

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
  resolvers
});

if(require.main === module) {
  server.start(() => console.log('Server started'));
}