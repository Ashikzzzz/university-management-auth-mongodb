import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { adminService } from './admin.service';
import { responseForData } from '../../../shared/sendResponse';
import { IAdmin } from './admin.interface';
import httpStatus from 'http-status';

// get all admin
const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
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

  const result = await adminService.getAllAdmin(filters, paginationOption);

  responseForData.sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Getting Successful',
    data: result.data,
    meta: result.meta,
  });
  // next();
});

// get a single admin
const getASingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await adminService.getASingleAdmin(id);

  responseForData.sendResponseForCreate<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Getting Successful',
    data: result,
  });
});

// delete a admin
const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await adminService.deleteAdmin(id);

  responseForData.sendResponseForCreate<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Delete Successful',
    data: result,
  });
});

// update a admin
const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { faculty } = req.body;
  const result = await adminService.updateAdmin(id, faculty);

  responseForData.sendResponseForCreate<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Update Successful',
    data: result,
  });
});

export const adminController = {
  getAllAdmin,
  getASingleAdmin,
  deleteAdmin,
  updateAdmin,
};
