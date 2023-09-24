import express from 'express';
import { adminController } from './admin.controller';

const router = express.Router();

// get a single admin
router.get('/:id', adminController.getASingleAdmin);

// delete a admin
router.delete('/:id', adminController.deleteAdmin);

// update a admin
router.patch('/:id', adminController.updateAdmin);

// get all admin
router.get('/get-all-admin', adminController.getAllAdmin);

export const adminRoute = router;
