import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { managementDepartmentService } from './managementDepartment.service';
import { responseForData } from '../../../shared/sendResponse';
import { IManagementDepartment } from './managementDepartment.interface';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const managementDepartmentData = req.body;

  const result = await managementDepartmentService.createDepartment(
    managementDepartmentData,
  );
  responseForData.sendResponseForCreate<IManagementDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department created Successful',
    data: result,
  });
  // next();
});

// get all department
const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['title']);
  const paginationOption = pick(req.query, [
    'limit',
    'page',
    'sortBy',
    'sortOrder',
  ]);

  const result = await managementDepartmentService.getAllManagementDepartment(
    filters,
    paginationOption,
  );

  responseForData.sendResponse<IManagementDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Getting Successful',
    data: result.data,
    meta: result.meta,
  });
  // next();
});

export const managementDepartmentController = {
  createDepartment,
  getAllDepartment,
};
