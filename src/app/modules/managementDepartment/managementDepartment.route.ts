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

// get a single management department
router.get('/:id', managementDepartmentController.getASingleDepartment);

// update management department
router.patch(
  '/:id',
  validateRequest(
    managementDepartmentValidation.createManagementDepartmentZodSchema,
  ),
  managementDepartmentController.updateManagementDepartment,
);
// delete management department
router.delete(
  '/:id',
  managementDepartmentController.deleteManagementDepartment,
);

// get all management department
router.get(
  '/all-management-department',
  managementDepartmentController.getAllDepartment,
);

export const departmentRoute = router;
