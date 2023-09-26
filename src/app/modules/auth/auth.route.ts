import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './auth.validation';
import { authController } from './auth.controller';

const router = express.Router();

// login
router.post(
  '/login',
  validateRequest(authValidation.authValidationZodSchema),
  authController.loginUser,
);

export const authRoute = router;
