import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './auth.validation';
import { authController } from './auth.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

// login
router.post(
  '/login',
  validateRequest(authValidation.authValidationZodSchema),
  authController.loginUser,
);

// refresh token
router.post(
  '/refresh-token',
  validateRequest(authValidation.refreshTokenValidationZodSchema),
  authController.refreshToken,
);

// change password
router.post(
  '/change-password',
  validateRequest(authValidation.changePasswordZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT,
  ),
  authController.changePassword,
);

export const authRoute = router;
