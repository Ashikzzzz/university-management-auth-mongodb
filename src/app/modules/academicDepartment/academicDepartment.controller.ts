import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { academicDepartmentService } from './academicDepartment.service';
import { responseForData } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IAcademicDepartment } from './academicDepartment.interface';
import pick from '../../../shared/pick';

// create a academic department
const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const academicDepartmentData = req.body;
    const result = await academicDepartmentService.createAcademicDepartment(
      academicDepartmentData,
    );

    responseForData.sendResponseForCreate<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department created Successful',
      data: result,
    });
    // next();
  },
);

// get all department with pagination filters search
const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'title']);
  const paginationOption = pick(req.query, [
    'limit',
    'page',
    'sortBy',
    'sortOrder',
  ]);

  const result = await academicDepartmentService.getAllDepartment(
    filters,
    paginationOption,
  );

  responseForData.sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Getting Successful',
    data: result.data,
    meta: result.meta,
  });
  // next();
});

// get a single department

const getASingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await academicDepartmentService.getASingleDepartment(id);

  responseForData.sendResponseForCreate<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Getting Successful',
    data: result,
  });
});

// update a department
const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await academicDepartmentService.updateDepartment(
    id,
    updateData,
  );

  responseForData.sendResponseForCreate<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department Update Successful',
    data: result,
  });
});

// delete department

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await academicDepartmentService.deleteDepartment(id);

  responseForData.sendResponseForCreate<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty Delete Successful',
    data: result,
  });
});

export const academicDepartmentController = {
  createAcademicDepartment,
  getAllDepartment,
  getASingleDepartment,
  updateDepartment,
  deleteDepartment,
};
