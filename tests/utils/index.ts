import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose, { Model } from 'mongoose'

const mongod = new MongoMemoryServer({
  instance: {
    storageEngine: 'wiredTiger',
  },
})

/**
 * Populate db with a schema and data for test purpose only
 */
export const populateDatabase = async <T>(
  model: Model<T>,
  data: ({ _id?: string } & Omit<T, '_id' | 'createdAt' | 'updatedAt'>)[]
) => {
  try {
    const result = await model.insertMany(data)
    return result
  } catch (err) {
    console.error('populateDatabase failed', err)
    return err
  }
}

/**
 * Connect to the in-memory database.
 */
export const connect = async () => {
  await mongod.start()
  const uri = mongod.getUri()

  const mongooseOpts = {
    connectTimeoutMS: 1000,
    socketTimeoutMS: 1000,
    autoIndex: false,
  }

  await mongoose.connect(uri, mongooseOpts)
}

/**
 * Drop database, close the connection and stop mongod.
 */
export const closeDatabase = async () => {
  try {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongod.stop()
  } catch (err) {
    console.error('ERROR: closeDatabase :', closeDatabase)
    return err
  }
}

/**
 * Remove all the data for all db collections.
 */
export const clearDatabase = async () => {
  const collections = mongoose.connection.collections

  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany({})
  }
}
