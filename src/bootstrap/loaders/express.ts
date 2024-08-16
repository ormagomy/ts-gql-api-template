import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import express from 'express'

export default (server: ApolloServer): express.Application => {
  const app = express()

  // Cors configuration
  // TODO: I'm not sure if we need this here, because the new Apollo config sets it in bootstrap/index.ts
  // app.use(cors());

  // Sets various HTTP headers to help protect our app
  // TODO: re-enable this? Would have to configure CSP headers.
  // app.use(helmet());

  app.use(
    '/gql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  )

  return app
}
