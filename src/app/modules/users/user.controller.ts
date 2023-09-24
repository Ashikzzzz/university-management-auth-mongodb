import { Request, Response } from 'express';
import { userService } from './user.services';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import { responseForData } from '../../../shared/sendResponse';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body;

  const result = await userService.createStudent(userData, student);
  responseForData.sendResponseForCreate(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created Successful',
    data: result,
  });
});

export const userController = {
  createStudent,
};
