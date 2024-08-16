import { ApolloServer } from '@apollo/server'

import { buildSchema } from '@src/utils/schema'

export default async () => {
  const schema = buildSchema()
  const server = new ApolloServer({ schema })
  await server.start()
  return server
}
