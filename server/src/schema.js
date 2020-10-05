const {gql} = require('apollo-server');

const typeDefs = gql`
    type Problem {
        id: Int!,
        name: String!,
        difficulty: String!,
        ac: Int!,
        wa: Int!,
    }
    type Contest {
        id: Int!,
        name: String!,
        first: String!,
        second: String!,
        start: String!,
        end: String!,
        status: String!,
    }
    type Query {
        helloWorld: Boolean!,
        getProblems: [Problem]!,
        getContests: [Contest]!,
    }
`;

module.exports = typeDefs;
