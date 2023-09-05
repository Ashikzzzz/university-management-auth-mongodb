import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()

app.use(cors())

import userRoute from './app/modules/users/user.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// user router
app.use('/api/v1/user', userRoute)

//Testing
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  next('oreee error')
})

app.use(globalErrorHandler)

export default app
