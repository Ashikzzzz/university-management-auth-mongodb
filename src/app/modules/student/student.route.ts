import express from 'express';
import { studentController } from './student.controller';

const router = express.Router();

// get all student
router.get('/get-all-student', studentController.getAllStudent);

export const studentRoute = router;
