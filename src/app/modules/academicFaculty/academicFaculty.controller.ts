import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { IAcademicFaculty } from './academicFaculty.interface';
import { responseForData } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { academicFacultyService } from './academicFaculty.service';

// create a academic faculty
const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const academicFacultyData = req.body;
    const result =
      await academicFacultyService.createAcademicFaculty(academicFacultyData);

    responseForData.sendResponseForCreate<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty created Successful',
      data: result,
    });
    // next();
  },
);

export const academicFacultyController = {
  createAcademicFaculty,
};
