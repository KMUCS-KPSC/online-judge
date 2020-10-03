const {gql} = require('apollo-server');

const typeDefs = gql`
    type Problem {
        id: Int!,
        name: String!,
        difficulty: String!,
        ac: Int!,
        wa: Int!,
    }
    type Query {
        helloWorld: Boolean!
        getProblems: [Problem]!
    }
`;

module.exports = typeDefs;
