import express from 'express';
import { academicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyZodValidation } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(academicFacultyZodValidation.academicFacultyZodSchema),
  academicFacultyController.createAcademicFaculty,
);

router.get('/get-all-faculty', academicFacultyController.getAllFaculty);

export const FacultyRoute = router;
