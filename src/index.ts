import 'reflect-metadata'

import { config } from './config'

import bootstrap from './bootstrap'

bootstrap().then((app) => {
  app.listen({ port: config.port() }, () => console.log(`🚀 Server ready at http://localhost:${config.port()}`))
})
