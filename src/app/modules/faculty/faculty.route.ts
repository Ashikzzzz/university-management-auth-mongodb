import express from 'express';
import { facultyController } from './faculty.controller';

const router = express.Router();

// get a single faculty
router.get('/:id', facultyController.getASingleFaculty);

// delete a faculty
router.delete('/:id', facultyController.deleteFaculty);

// update a faculty
router.patch('/:id', facultyController.updateFaculty);

// get all student
router.get('/get-all-teacher', facultyController.getAllFaculty);

export const facultyRoute = router;
