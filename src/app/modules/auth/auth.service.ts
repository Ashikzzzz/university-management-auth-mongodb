import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { User } from '../users/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import bcrypt from 'bcrypt';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtToken } from '../../../shared/jwtToken';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  // check user
  const isUserExist = await User.findOne(
    { id },
    { id: 1, password: 1, role: 1, needsPasswordChange: 1 },
  ).lean();
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist");
  }

  // matched password
  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist.password,
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password isn't matched");
  }

  // create access token
  const { id: userId, role, needsPasswordChange } = isUserExist;
  const accessToken = jwtToken.createToken(
    { userId, role },
    config.jwt_secret as Secret,
    { expiresIn: config.jwt_expires_in },
  );

  // create refresh token
  const refreshToken = jwtToken.createToken(
    { userId, role },
    config.jwt_refresh_token as Secret,
    { expiresIn: config.jwt_refresh_expires_in },
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

// refresh token
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verfiy token
  console.log('token', token);
  let verifyToken = null;
  try {
    verifyToken = await jwtToken.verifyToken(
      token,
      config.jwt_refresh_token as Secret,
    );

    // console.log('verifyToken', verifyToken);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid token');
  }
  // console.log(verifyToken);

  // checking deleted user refresh token
  const userId = verifyToken?.userId;
  // console.log('userId', userId);
  const isUserExist = await User.findOne({ id: userId });
  // console.log('isUserExist', isUserExist);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist");
  }

  // generate new token
  const newAccessToken = await jwtToken.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt_secret as Secret,
    { expiresIn: config.jwt_expires_in },
  );

  return {
    accessToken: newAccessToken,
  };
};

export const authService = {
  loginUser,
  refreshToken,
};
