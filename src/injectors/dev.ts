process.env.NODE_ENV = 'development'

process.on('unhandledRejection', err => {
  throw err
})
