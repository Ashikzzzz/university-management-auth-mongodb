import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { responseForData } from '../../../shared/sendResponse';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import httpStatus from 'http-status';
import { authService } from './auth.service';
import config from '../../../config';

// create a semester
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await authService.loginUser(loginData);
  const { refreshToken, ...others } = result;
  console.log('others', others);
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

// refresh token
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await authService.refreshToken(refreshToken);

  //   set refresh token at browser cookie
  const cookieOption = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOption);

  // if ('refreshToken' in result) {
  //   delete result.refreshToken;
  // }

  responseForData.sendResponseForCreate<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login Successful',
    data: result,
  });
  // next();
});

export const authController = {
  loginUser,
  refreshToken,
};
