import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { IAcademicFaculty } from './academicFaculty.interface';
import { responseForData } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { academicFacultyService } from './academicFaculty.service';
import pick from '../../../shared/pick';

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

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'title', 'code', 'year']);
  const paginationOption = pick(req.query, [
    'limit',
    'page',
    'sortBy',
    'sortOrder',
  ]);

  const result = await academicFacultyService.getAllFaculty(
    filters,
    paginationOption,
  );

  responseForData.sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty Getting Successful',
    data: result.data,
    meta: result.meta,
  });
  // next();
});

export const academicFacultyController = {
  createAcademicFaculty,
  getAllFaculty,
};
