import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOption } from '../../../interfaces/pagination';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

// create a department
const createAcademicDepartment = async (
  payload: IAcademicDepartment,
): Promise<IAcademicDepartment> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty',
  );
  return result;
};

// get all faculty
const getAllDepartment = async (
  filters: IAcademicDepartmentFilters,
  paginationOption: IPaginationOption,
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters;

  // this is for search
  const academicFacultySearchFiled = ['title'];
  const andCconditions = [];
  if (searchTerm) {
    andCconditions.push({
      $or: academicFacultySearchFiled.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // this is for filter part

  if (Object.keys(filtersData).length) {
    andCconditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions =
    andCconditions.length > 0 ? { $and: andCconditions } : {};

  // this is for pagination

  const { page = 1, limit = 10 } = paginationOption;
  const skip = (page - 1) * limit;

  const result = await AcademicDepartment.find(whereConditions)
    .populate('academicFaculty')
    .sort({
      createdAt: 'desc',
      year: 'desc',
      code: 'desc',
    })
    .skip(skip)
    .limit(limit);
  const total = await AcademicDepartment.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const academicDepartmentService = {
  createAcademicDepartment,
  getAllDepartment,
};
