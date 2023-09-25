import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { managementDepartmentValidation } from './managementDepartment.validation';
import { managementDepartmentController } from './managementDepartment.controller';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(
    managementDepartmentValidation.createManagementDepartmentZodSchema,
  ),
  managementDepartmentController.createDepartment,
);

// get all management department
router.get(
  '/all-management-department',
  managementDepartmentController.getAllDepartment,
);

export const departmentRoute = router;
