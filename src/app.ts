import express, { Application } from 'express';
import cors from 'cors';
const app: Application = express();

app.use(cors());

import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';

// import ApiError from './errors/ApiErrors'
// import ApiError from './errors/ApiErrors'

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);

// //Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   //   Promise.reject(new Error('Unhandled Promise Rejected'))
//   throw new Error('Testing errro logger');
// });

app.use(globalErrorHandler);

export default app;
