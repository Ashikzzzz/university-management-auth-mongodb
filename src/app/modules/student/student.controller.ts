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

// get a single student
const getASingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await studentService.getASingleStudent(id);

  responseForData.sendResponseForCreate<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Getting Successful',
    data: result,
  });
});

// delete a student
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await studentService.deleteStudent(id);

  responseForData.sendResponseForCreate<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Delete Successful',
    data: result,
  });
});

// update a student
const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { student } = req.body;
  const result = await studentService.updateStudent(id, student);

  responseForData.sendResponseForCreate<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Update Successful',
    data: result,
  });
});

export const studentController = {
  getAllStudent,
  getASingleStudent,
  deleteStudent,
  updateStudent,
};
