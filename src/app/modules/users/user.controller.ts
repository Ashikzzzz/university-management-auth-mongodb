import { NextFunction, Request, Response } from 'express';
import { userService } from './user.services';
import catchAsync from '../../../shared/catchAsync';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    // console.log(user)
    const result = await userService.createUserService(user);
    // console.log('result', result)
    next();
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  },
);

export const userController = {
  createUser,
};
