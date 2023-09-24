import { Request, Response } from 'express';
import { userService } from './user.services';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import { responseForData } from '../../../shared/sendResponse';

// create a student
const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body;

  const result = await userService.createStudent(userData, student);
  responseForData.sendResponseForCreate(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created Successful',
    data: result,
  });
});

// create a faculty
const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { faculty, ...userData } = req.body;

  const result = await userService.createFaculty(userData, faculty);
  responseForData.sendResponseForCreate(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty created Successful',
    data: result,
  });
});

// create a admin
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { admin, ...userData } = req.body;

  const result = await userService.createAdmin(userData, admin);
  responseForData.sendResponseForCreate(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created Successful',
    data: result,
  });
});

export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
};
