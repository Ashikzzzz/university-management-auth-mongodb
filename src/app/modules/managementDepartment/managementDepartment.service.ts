import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOption } from '../../../interfaces/pagination';
import {
  IManagementDepartment,
  IManagementDepartmentFilters,
} from './managementDepartment.interface';
import { ManagementDepartment } from './managementDepartment.model';

// create a department
const createDepartment = async (
  payload: IManagementDepartment,
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.create(payload);
  return result;
};

// get all department
const getAllManagementDepartment = async (
  filters: IManagementDepartmentFilters,
  paginationOption: IPaginationOption,
): Promise<IGenericResponse<IManagementDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters;

  // this is for search
  const departmentSearchFiled = ['title'];
  const andCconditions = [];
  if (searchTerm) {
    andCconditions.push({
      $or: departmentSearchFiled.map(field => ({
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

  const result = await ManagementDepartment.find(whereConditions)
    .sort({
      createdAt: 'desc',
      year: 'desc',
      code: 'desc',
    })
    .skip(skip)
    .limit(limit);
  const total = await ManagementDepartment.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const managementDepartmentService = {
  createDepartment,
  getAllManagementDepartment,
};
