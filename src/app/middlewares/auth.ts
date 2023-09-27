import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiErrors';
import httpStatus from 'http-status';
import { jwtToken } from '../../shared/jwtToken';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

const auth =
  (...role: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req?.headers?.token; // get token
      // check token
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not Authorized');
      }

      let verifyToken = null;

      // verify token
      verifyToken = await jwtToken.verifyToken(
        token as string,
        config.jwt_expires_in as Secret,
      );

      req.user = verifyToken;
    } catch (error) {
      next(error);
    }
  };

export const authorizationUser = {
  auth,
};
