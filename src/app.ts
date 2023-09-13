import express, { Application } from 'express';
import cors from 'cors';
const app: Application = express();

app.use(cors());

import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { SemesterRoute } from './app/modules/academicSemester/academicSemester.route';
import { userRoute } from './app/modules/users/user.route';
// import ApiError from './errors/ApiErrors'
// import ApiError from './errors/ApiErrors'

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// user router
app.use('/api/v1/user', userRoute);
app.use('/api/v1/semester', SemesterRoute);

// //Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   //   Promise.reject(new Error('Unhandled Promise Rejected'))
//   throw new Error('Testing errro logger');
// });

app.use(globalErrorHandler);

export default app;
