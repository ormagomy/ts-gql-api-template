import express from 'express'

import loaders from './loaders'

export default async (): Promise<express.Application> => {
  const app = await loaders()
  return app
}
