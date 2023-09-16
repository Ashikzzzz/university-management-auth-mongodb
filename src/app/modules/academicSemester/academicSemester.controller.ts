import { academicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { IAcademicSemester } from './academicSemester.interface';
import pick from '../../../shared/pick';
import { responseForData } from '../../../shared/sendResponse';

// create a semester
const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const academicSemesterData = req.body;
    console.log(academicSemesterData);
    const result =
      await academicSemesterService.createAcademicSemester(
        academicSemesterData,
      );
    responseForData.sendResponseForCreate<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester created Successful',
      data: result,
    });
    next();
  },
);

// get all semester
const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOption = pick(req.query, [
      'limit',
      'page',
      'sortBy',
      'sortOrder',
    ]);

    console.log(paginationOption);

    const result =
      await academicSemesterService.getAllSemester(paginationOption);

    responseForData.sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester Getting Successful',
      data: result.data,
      meta: result.meta,
    });
    next();
  },
);

export const academicSemesterController = {
  createAcademicSemester,
  getAllSemester,
};
