import express from 'express'
import mongoose from 'mongoose'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import { APP_PORT, IN_PROD, DB_NAME, DB_PASSWORD, DB_HOST, DB_USERNAME, DB_PORT } from './config'

// Self invoking async function
// (async() => {})()
(async () => {
  try {
    await mongoose.connect(`mongodb://${DB_USERNAME}:${encodeURIComponent(DB_PASSWORD)}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
      useNewUrlParser: true // fixes deprication warning
    })

    const app = express()

    app.disable('x-powered-by')

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      playground: !IN_PROD
    })

    server.applyMiddleware({ app })// app is from an existing express app

    app.listen({ port: APP_PORT }, () =>
      console.log(`🚀 Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`)
    )
  } catch (e) {
    console.error(e)
  }
})()
