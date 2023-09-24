import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOption } from '../../../interfaces/pagination';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { Faculty } from './faculty.model';

const getAllFaculty = async (
  filters: IFacultyFilters,
  paginationOption: IPaginationOption,
): Promise<IGenericResponse<IFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;

  // this is for search
  const facultySearchFiled = [
    'name.firstName',
    'name.lastName',
    'email',
    'contactNo',
  ];
  const andCconditions = [];
  if (searchTerm) {
    andCconditions.push({
      $or: facultySearchFiled.map(field => ({
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

  const result = await Faculty.find(whereConditions)
    .sort({
      createdAt: 'desc',
      year: 'desc',
      code: 'desc',
    })
    .skip(skip)
    .limit(limit);
  const total = await Faculty.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const facultyService = {
  getAllFaculty,
};
