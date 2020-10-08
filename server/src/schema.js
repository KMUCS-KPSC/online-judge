const { gql } = require('apollo-server')

const typeDefs = gql`
  type Problem {
    id: Int!
    name: String!
    difficulty: String!
    ac: Int!
    wa: Int!
    markdown: String
  }
  type RunResult {
    type: String!
    res: String!
    runtime: Float
    in: String!
    ans: String!
  }
  type Contest {
    id: Int!
    name: String!
    first: String!
    second: String!
    start: String!
    end: String!
    status: String!
  }
  type Query {
    helloWorld: Boolean!

    getProblems: [Problem]!
    getProblem(id: Int!): Problem!

    getContests: [Contest]!

    getRunResult(
      id: String!
      problem: Int!
      lang: String!
      code: String!
      sample: Boolean!
    ): [RunResult]!
  }
`

module.exports = typeDefs
