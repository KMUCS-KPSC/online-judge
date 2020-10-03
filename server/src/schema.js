const {gql} = require('apollo-server');

const typeDefs = gql`
    type Query {
        helloWorld: Boolean!
    }
`;

module.exports = typeDefs;
