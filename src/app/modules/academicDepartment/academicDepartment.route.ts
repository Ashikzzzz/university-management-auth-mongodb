import express from 'express';
import { academicDepartmentController } from './academicDepartment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicDepartmentZodValidation } from './academicDepartment.validation';

const router = express.Router();

// create a academic department
router.post(
  '/create-academic-department',
  validateRequest(academicDepartmentZodValidation.academicDepartmentZodSchema),
  academicDepartmentController.createAcademicDepartment,
);

// get all department
router.get(
  '/get-all-department',
  academicDepartmentController.getAllDepartment,
);

export const DepartmentRoute = router;
