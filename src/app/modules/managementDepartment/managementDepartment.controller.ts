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

// get a single department
const getASingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result =
    await managementDepartmentService.getASingleManagementDepartment(id);

  responseForData.sendResponseForCreate<IManagementDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Getting Successful',
    data: result,
  });
});

// delete management department
const deleteManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result =
      await managementDepartmentService.deleteManagementDepartment(id);

    responseForData.sendResponseForCreate<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester Delete Successful',
      data: result,
    });
  },
);

// update management departnmeent
const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const managementDepartment = req.body;
    // console.log(managementDepartment);
    const result = await managementDepartmentService.updateManagementDepartment(
      id,
      managementDepartment,
    );

    responseForData.sendResponseForCreate<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'management department Update Successful',
      data: result,
    });
  },
);

export const managementDepartmentController = {
  createDepartment,
  deleteManagementDepartment,
  getAllDepartment,
  getASingleDepartment,
  updateManagementDepartment,
};
