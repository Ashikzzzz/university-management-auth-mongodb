import express from 'express';
import { studentController } from './student.controller';
import { userValidation } from '../users/user.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

// get a single student
router.get('/:id', studentController.getASingleStudent);

// delete a student
router.delete('/:id', studentController.deleteStudent);

// update a student
router.patch(
  '/:id',
  validateRequest(userValidation.createStudentZodSchema),
  studentController.updateStudent,
);

// get all student
router.get('/get-all-student', studentController.getAllStudent);

export const studentRoute = router;
