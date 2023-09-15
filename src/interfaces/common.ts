import { IAcademicSemester } from '../app/modules/academicSemester/academicSemester.interface';
import { IGenericErrorMessage } from './error';

export type IGenericResponseMessage = {
  statusCode: number;
  message: string;
  errorMessage: IGenericErrorMessage[];
};

// export type IGenericResponse<T> = {
//   meta: {
//     page: number;
//     limit: number;
//     total: number;
//   };
//   data: T;
// };

export type SemesterResponse = {
  result: IAcademicSemester[];
  total: number;
};
