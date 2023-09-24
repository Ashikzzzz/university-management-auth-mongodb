import express from 'express';
import { facultyController } from './faculty.controller';

const router = express.Router();

// get all student
router.get('/get-all-teacher', facultyController.getAllFaculty);

export const facultyRoute = router;
