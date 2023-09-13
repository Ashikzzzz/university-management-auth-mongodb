import { RequestHandler } from 'express';
import { academicSemesterService } from './academicSemester.service';

const createAcademicSemester: RequestHandler = async (req, res, next) => {
  try {
    const academicSemesterData = req.body;
    console.log(academicSemesterData);
    const result =
      await academicSemesterService.createAcademicSemester(
        academicSemesterData,
      );

    res.status(201).json({
      success: true,
      message: 'Academic Semester created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const academicSemesterController = {
  createAcademicSemester,
};
