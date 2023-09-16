import ApiError from '../../../errors/ApiErrors';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOption } from '../../../interfaces/pagination';
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
  paginationOption: IPaginationOption,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page = 1, limit = 10 } = paginationOption;
  const skip = (page - 1) * limit;

  const result = await AcademicSemester.find().sort().skip(skip).limit(limit);
  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const academicSemesterService = {
  createAcademicSemester,
  getAllSemester,
};
