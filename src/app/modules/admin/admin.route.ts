import express from 'express';
import { adminController } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from '../users/user.validation';

const router = express.Router();

// get a single admin
router.get('/:id', adminController.getASingleAdmin);

// delete a admin
router.delete('/:id', adminController.deleteAdmin);

// update a admin
router.patch(
  '/:id',
  validateRequest(userValidation.createAdminZodSchema),
  adminController.updateAdmin,
);

// get all admin
router.get('/get-all-admin', adminController.getAllAdmin);

export const adminRoute = router;
