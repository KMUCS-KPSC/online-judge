const { ApolloServer } = require('apollo-server')
const { createStore } = require('./database')
const { createMockStore } = require('./mockDataWriter')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const { ProblemsAPI } = require('./dataSources/problemsAPI')
const { ContestsAPI } = require('./dataSources/contestsAPI')
const { JudgeAPI } = require('./dataSources/judgeAPI')

const store = createStore(true)

const context = async () => {
  await createMockStore(store)
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    problemsAPI: new ProblemsAPI(store),
    contestsAPI: new ContestsAPI(store),
    judgeAPI: new JudgeAPI(store),
  }),
  context,
})

server.listen().then(({ url }) => {
  console.log(`Listening at ${url}`)
})
