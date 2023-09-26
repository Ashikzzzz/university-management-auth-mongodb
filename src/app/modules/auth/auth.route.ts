import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './auth.validation';

const router = express.Router();

// login
router.post('/login', validateRequest(authValidation.authValidationZodSchema));

export const authRoute = router;
