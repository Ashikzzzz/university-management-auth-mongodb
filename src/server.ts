import mongoose from 'mongoose'
import config from './config/index'
import { Server } from 'http'
import app from './app'
import { logger, errorLogger } from './shared/logger'

async function boostrap() {
  let server: Server
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('database is connected successfully')
    server = app.listen(config.port, () => {
      logger.info(`app is listening in the ${config.port}`)
    })
  } catch (err) {
    errorLogger.error('Failed to connect database', err)
  }

  process.on('unhandledRejection', error => {
    console.log('we are closing our server')
    if (server) {
      server.close(() => {
        console.log('we are closing our server', error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

boostrap()
