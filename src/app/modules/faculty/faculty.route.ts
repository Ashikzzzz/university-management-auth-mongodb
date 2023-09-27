import express from 'express';
import { facultyController } from './faculty.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

// get a single faculty
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.STUDENT, ENUM_USER_ROLE.SUPER_ADMIN),
  facultyController.getASingleFaculty,
);

// delete a faculty
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  facultyController.deleteFaculty,
);

// update a faculty
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  facultyController.updateFaculty,
);

// get all student
router.get('/get-all-teacher', facultyController.getAllFaculty);

export const facultyRoute = router;
