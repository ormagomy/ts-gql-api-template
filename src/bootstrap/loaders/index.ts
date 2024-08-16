import express from 'express'

import apolloLoader from './apollo'
import expressLoader from './express'
import mongooseLoader from './mongoose'

export default async (): Promise<express.Application> => {
  console.log('Running loaders...')

  await mongooseLoader()
  console.log('Mongoose connected')

  const server = await apolloLoader()
  console.log('Apollo server loaded')

  const app = expressLoader(server)
  console.log('Express loaded')

  return app
}
