import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { facultyService } from './faculty.service';
import { responseForData } from '../../../shared/sendResponse';
import { IFaculty } from './faculty.interface';
import httpStatus from 'http-status';

// get all faculty
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

// get a single faculty
const getASingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await facultyService.getASingleFaculty(id);

  responseForData.sendResponseForCreate<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Getting Successful',
    data: result,
  });
});

// delete a faculty
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await facultyService.deleteFaculty(id);

  responseForData.sendResponseForCreate<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Delete Successful',
    data: result,
  });
});

export const facultyController = {
  getAllFaculty,
  getASingleFaculty,
  deleteFaculty,
};
