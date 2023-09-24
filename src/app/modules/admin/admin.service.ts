import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOption } from '../../../interfaces/pagination';
import { IAdmin, IAdminFilters } from './admin.interface';
import { Admin } from './admin.model';

const getAllAdmin = async (
  filters: IAdminFilters,
  paginationOption: IPaginationOption,
): Promise<IGenericResponse<IAdmin[]>> => {
  const { searchTerm, ...filtersData } = filters;

  // this is for search
  const adminSearchFiled = [
    'name.firstName',
    'name.lastName',
    'email',
    'contactNo',
  ];
  const andCconditions = [];
  if (searchTerm) {
    andCconditions.push({
      $or: adminSearchFiled.map(field => ({
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

  const result = await Admin.find(whereConditions)
    .sort({
      createdAt: 'desc',
      year: 'desc',
      code: 'desc',
    })
    .skip(skip)
    .limit(limit);
  const total = await Admin.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get a single admin
const getASingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById(id);
  return result;
};

// delete a admin
const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findByIdAndDelete(id);
  return result;
};

// update a admin
const updateAdmin = async (id: string, payload: Partial<IAdmin>) => {
  //   console.log('update data', payload);
  const result = await Admin.findOneAndUpdate(
    { _id: id },
    { $set: payload },
    {
      new: true,
    },
  );
  return result;
};

export const adminService = {
  getAllAdmin,
  getASingleAdmin,
  deleteAdmin,
  updateAdmin,
};
