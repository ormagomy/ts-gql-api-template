import mongoose from 'mongoose'

import { config } from '@src/config'

// Close the Mongoose default connection in the event of application termination
process.on('SIGINT', async () => {
  console.log('Closing Mongoose connection...')
  await mongoose.connection.close()
  process.exit(0)
})

const mongoDBConfig: mongoose.ConnectOptions = {
  dbName: config.mongoDB.dbName,
  connectTimeoutMS: 5000,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 5000,
}

export default (): Promise<mongoose.Mongoose> => mongoose.connect(config.mongoDB.uri, mongoDBConfig)
