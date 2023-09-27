import express from 'express';
import { adminController } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from '../users/user.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

// get a single admin
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  adminController.getASingleAdmin,
);

// delete a admin
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  adminController.deleteAdmin,
);

// update a admin
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(userValidation.createAdminZodSchema),
  adminController.updateAdmin,
);

// get all admin
router.get(
  '/get-all-admin',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  adminController.getAllAdmin,
);

export const adminRoute = router;
