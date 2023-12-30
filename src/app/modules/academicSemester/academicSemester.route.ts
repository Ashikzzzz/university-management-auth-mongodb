import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation';
import { academicSemesterController } from './academicSemester.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(academicSemesterValidation.academicSemesterZodSchema),
  academicSemesterController.createAcademicSemester,
);

// get a single semester
router.get('/:id', academicSemesterController.getASingleSemester);

// update SemesterRoute
router.patch(
  '/:id',
  validateRequest(academicSemesterValidation.updateSemesterZodSchema),
  academicSemesterController.updateSemester,
);

router.delete('/:id', academicSemesterController.deleteSemester);

// get all semester with pagination sorting filter and search
router.get('/get-all-semester', academicSemesterController.getAllSemester);

export const SemesterRoute = router;
