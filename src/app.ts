import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();

app.use(cors());

import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
import httpStatus from 'http-status';

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

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Route not found',
    errorMessage: [
      {
        path: '.',
        message: 'Api Is not found',
      },
    ],
  });
  next();
});

export default app;
