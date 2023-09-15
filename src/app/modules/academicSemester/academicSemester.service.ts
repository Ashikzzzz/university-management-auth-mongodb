import ApiError from '../../../errors/ApiErrors';
import { SemesterResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import status from 'http-status';

// create a semester
const createAcademicSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester> => {
  if (
    !(
      (payload.title === 'Spring' && payload.code === '01') ||
      (payload.title === 'Summer' && payload.code === '02') ||
      (payload.title === 'Fall' && payload.code === '03')
    )
  ) {
    throw new ApiError(status.BAD_REQUEST, 'Invalid Semester Code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

// get all semester
const getAllSemester = async (
  paginationOptions: IPaginationOptions,
): Promise<SemesterResponse> => {
  const { page = 1, limit = 10 } = paginationOptions;
  const skip = (page - 1) * limit;

  const result = await AcademicSemester.find().sort().skip(skip).limit(limit);
  const total = await AcademicSemester.countDocuments();

  return {
    result,
    total,
  };
};

export const academicSemesterService = {
  createAcademicSemester,
  getAllSemester,
};
