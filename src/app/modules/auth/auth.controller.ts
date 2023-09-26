import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { responseForData } from '../../../shared/sendResponse';
import { ILoginUserResponse } from './auth.interface';
import httpStatus from 'http-status';
import { authService } from './auth.service';
import config from '../../../config';

// create a semester
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await authService.loginUser(loginData);
  const { refreshToken, ...others } = result;

  //   set refresh token at browser cookie
  const cookieOption = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOption);

  if ('refreshToken' in result) {
    delete result.refreshToken;
  }

  responseForData.sendResponseForCreate<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'login Successful',
    data: others,
  });
  // next();
});

export const authController = {
  loginUser,
};
