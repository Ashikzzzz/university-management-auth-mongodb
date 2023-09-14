import { NextFunction, Request, Response } from 'express';
import { userService } from './user.services';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const result = await userService.createUserService(user);

    next();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created Successful',
      data: result,
    });
  },
);

export const userController = {
  createUser,
};
