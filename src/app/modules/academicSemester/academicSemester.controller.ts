import { academicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const academicSemesterData = req.body;
    console.log(academicSemesterData);
    const result =
      await academicSemesterService.createAcademicSemester(
        academicSemesterData,
      );
    next();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester created Successful',
      data: result,
    });
  },
);

export const academicSemesterController = {
  createAcademicSemester,
};
