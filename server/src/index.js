const {ApolloServer, gql, AuthenticationError, ForbiddenError} = require('apollo-server');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const context = async ({ req }) => {
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
    }),
    context
});

server.listen().then(({ url }) => {
    console.log(`Listening at ${url}`);
});
