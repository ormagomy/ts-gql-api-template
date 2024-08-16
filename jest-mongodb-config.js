module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'jest',
    },
    binary: {
      version: '7.0.12', // Version of MongoDB
      skipMD5: true,
    },
    autoStart: false,
  },
}
