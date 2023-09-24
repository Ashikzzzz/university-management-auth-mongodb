import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { facultyService } from './faculty.service';
import { responseForData } from '../../../shared/sendResponse';
import { IFaculty } from './faculty.interface';
import httpStatus from 'http-status';

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, [
    'name.firstName',
    'name.lastName',
    'email',
    'contactNo',
  ]);
  const paginationOption = pick(req.query, [
    'limit',
    'page',
    'sortBy',
    'sortOrder',
  ]);

  const result = await facultyService.getAllFaculty(filters, paginationOption);

  responseForData.sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Getting Successful',
    data: result.data,
    meta: result.meta,
  });
  // next();
});

export const facultyController = {
  getAllFaculty,
};
