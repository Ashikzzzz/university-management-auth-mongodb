import express from 'express';
import { userRoute } from '../modules/users/user.route';
import { SemesterRoute } from '../modules/academicSemester/academicSemester.route';
import { FacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { DepartmentRoute } from '../modules/academicDepartment/academicDepartment.route';
import { studentRoute } from '../modules/student/student.route';
import { facultyRoute } from '../modules/faculty/faculty.route';

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
  {
    path: '/faculty',
    route: FacultyRoute,
  },
  {
    path: '/department',
    route: DepartmentRoute,
  },
  {
    path: '/student',
    route: studentRoute,
  },
  {
    path: '/faculty-teacher',
    route: facultyRoute,
  },
];

moduleRoutes.map(route => router.use(route.path, route.route));

export default router;
