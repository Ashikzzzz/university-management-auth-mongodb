import mongoose from 'mongoose'
import config from './config/index'
import app from './app'

async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('database is connected successfully')
    app.listen(config.port, () => {
      console.log(`app is listening in the ${config.port}`)
    })
  } catch (err) {
    console.log('Failed to connect database', err)
  }
}

boostrap()
