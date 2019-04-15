process.env.NODE_ENV = 'test'

process.on('unhandledRejection', err => {
  throw err
})
