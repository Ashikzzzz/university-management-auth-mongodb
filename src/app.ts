import express, { Application } from 'express'
import cors from 'cors'
const app: Application = express()

app.use(cors())

import userRoute from './app/modules/users/user.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
// import ApiError from './errors/ApiErrors'
// import ApiError from './errors/ApiErrors'

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// user router
app.use('/api/v1/user', userRoute)

// //Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   Promise.reject(new Error('Unhandled Promise Rejected'))
// })

app.use(globalErrorHandler)

export default app
