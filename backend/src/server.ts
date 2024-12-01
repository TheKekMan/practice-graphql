import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs, resolvers } from './schemas/schema'
import { ApolloServer } from '@apollo/server'

const PORT = 8999

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
})

console.log(`🚀  Server ready at: ${url}`)
