import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';

const router = express.Router();

// create a student
router.post(
  '/create-student',
  validateRequest(userValidation.createStudentZodSchema),
  userController.createStudent,
);

// create a faculty
router.post(
  '/create-faculty',
  validateRequest(userValidation.createFacultyZodSchema),
  userController.createFaculty,
);

// create a admin
router.post(
  '/create-admin',
  validateRequest(userValidation.createAdminZodSchema),
  userController.createAdmin,
);

export const userRoute = router;
