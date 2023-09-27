import express from 'express';
import { studentController } from './student.controller';
import { userValidation } from '../users/user.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

// get a single student
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.STUDENT, ENUM_USER_ROLE.FACULTY),
  studentController.getASingleStudent,
);

// delete a student
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  studentController.deleteStudent,
);

// update a student
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(userValidation.createStudentZodSchema),
  studentController.updateStudent,
);

// get all student
router.get('/get-all-student', studentController.getAllStudent);

export const studentRoute = router;
