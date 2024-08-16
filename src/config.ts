import dotenv from 'dotenv'
dotenv.config()

/**
 * Safely get the environment variable from process.env.
 * An error will be thrown if the environment variable is not set.
 */
const parseEnv = (name: string): string => {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Missing: process.env['${name}'].`)
  }

  return value
}

export interface Config {
  port: () => number
  isLocal: boolean
  mongoDB: {
    uri: string
    dbName: string
  }
}

export const config: Config = {
  port: () => +parseEnv('PORT'),
  isLocal: parseEnv('NODE_ENV') === 'local',
  mongoDB: {
    uri: parseEnv('MONGODB_URI'),
    dbName: `${parseEnv('MONGODB_DB_NAME')}-${parseEnv('NODE_ENV')}`,
  },
}
