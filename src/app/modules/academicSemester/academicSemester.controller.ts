import { academicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import { NextFunction, Request, Response } from 'express';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const academicSemesterData = req.body;
    console.log(academicSemesterData);
    const result =
      await academicSemesterService.createAcademicSemester(
        academicSemesterData,
      );
    next();

    res.status(201).json({
      success: true,
      message: 'Academic Semester created successfully',
      data: result,
    });
  },
);

export const academicSemesterController = {
  createAcademicSemester,
};
