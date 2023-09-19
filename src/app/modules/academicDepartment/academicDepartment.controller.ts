import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { academicDepartmentService } from './academicDepartment.service';
import { responseForData } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IAcademicDepartment } from './academicDepartment.interface';

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

export const academicDepartmentController = {
  createAcademicDepartment,
};
