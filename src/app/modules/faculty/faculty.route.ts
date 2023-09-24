import express from 'express';
import { facultyController } from './faculty.controller';

const router = express.Router();

// get a single faculty
router.get('/:id', facultyController.getASingleFaculty);

// get all student
router.get('/get-all-teacher', facultyController.getAllFaculty);

export const facultyRoute = router;
