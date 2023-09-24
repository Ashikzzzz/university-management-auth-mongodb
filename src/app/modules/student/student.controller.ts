import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { IStudent } from './student.interface';
import { studentService } from './student.service';
import { Request, Response } from 'express';
import { responseForData } from '../../../shared/sendResponse';

// get all student s
const getAllStudent = catchAsync(async (req: Request, res: Response) => {
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

  const result = await studentService.getAllStudent(filters, paginationOption);

  responseForData.sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Getting Successful',
    data: result.data,
    meta: result.meta,
  });
  // next();
});

export const studentController = {
  getAllStudent,
};
