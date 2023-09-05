import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()

app.use(cors())

import userRoute from './app/modules/users/user.route'

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// user router
app.use('/api/v1/user', userRoute)

//Testing
app.get('/', (req: Request, res: Response) => {
  res.send('Working Successfully')
})

export default app
