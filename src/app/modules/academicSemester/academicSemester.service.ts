import ApiError from '../../../errors/ApiErrors';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemester = async (payload: IAcademicSemester) => {
  if (
    !(
      (payload.title === 'Spring' && payload.code === '01') ||
      (payload.title === 'Summer' && payload.code === '02') ||
      (payload.title === 'Fall' && payload.code === '03')
    )
  ) {
    throw new ApiError(401, 'Invalid Semester Code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

export const academicSemesterService = {
  createAcademicSemester,
};
