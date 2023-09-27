import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { User } from '../users/user.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import bcrypt from 'bcrypt';
import { JwtPayload, Secret } from 'jsonwebtoken';
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

// change password
const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword,
): Promise<void> => {
  const { oldPassword, newPassword } = payload;
  console.log('payload', payload);

  // const { userId } = user;
  const isUserExist = await User.findOne({ id: user?.userId }).select(
    'password',
  );
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist");
  }
  console.log('isUserExist', isUserExist);
  // check old password

  const isPasswordMatched = await bcrypt.compare(
    oldPassword,
    isUserExist.password,
  );
  console.log('isPasswordMatched', isPasswordMatched);

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "old Password isn't matched");
  }

  // hash password
  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_round),
  );
  console.log('newHashedPassword', newHashedPassword);
  // update the pass
  const updateData = {
    password: newHashedPassword,
    newHashedPassword: false,
    passwordChangeAt: new Date(),
  };
  await User.findOneAndUpdate({ id: user?.userId }, updateData);
};

export const authService = {
  loginUser,
  refreshToken,
  changePassword,
};
