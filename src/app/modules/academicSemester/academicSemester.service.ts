import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemester = async (payload: IAcademicSemester) => {
  const result = await AcademicSemester.create(payload);
  return result;
};

export const academicSemesterService = {
  createAcademicSemester,
};
