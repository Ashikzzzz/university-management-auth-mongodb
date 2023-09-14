import express from 'express';
import { userRoute } from '../modules/users/user.route';
import { SemesterRoute } from '../modules/academicSemester/academicSemester.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/semester',
    route: SemesterRoute,
  },
];

moduleRoutes.map(route => router.use(route.path, route.route));

export default router;
