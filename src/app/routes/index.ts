import express from 'express';
import { userRoute } from '../modules/users/user.route';
import { SemesterRoute } from '../modules/academicSemester/academicSemester.route';

const router = express.Router();

router.use('/user', userRoute);
router.use('/semester', SemesterRoute);

export default router;
