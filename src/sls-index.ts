import 'reflect-metadata'

import serverless from 'serverless-http'
import bootstrap from './bootstrap'

let setupPromise: Promise<serverless.Handler>

const setup = async (): Promise<serverless.Handler> => {
  const app = await bootstrap()
  return serverless(app)
}

/**
 * This idea for async setup came from https://www.npmjs.com/package/@codegenie/serverless-express.
 */
export const handler: serverless.Handler = async (event, context) => {
  if (!setupPromise) {
    console.log('First invocation, running setup')
    // Capture the promise so we only run setup once. All subsequent invocations will
    // reuse the same app that was previously started.
    setupPromise = setup()
  }
  const serverlessApp = await setupPromise
  return serverlessApp(event, context)
}
