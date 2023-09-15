import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation';
import { academicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(academicSemesterValidation.academicSemesterZodSchema),
  academicSemesterController.createAcademicSemester,
);

router.get('/get-all-semester', academicSemesterController.getAllSemester);

export const SemesterRoute = router;
