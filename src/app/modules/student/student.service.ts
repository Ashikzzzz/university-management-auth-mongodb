import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOption } from '../../../interfaces/pagination';
import { IStudent, IStudentFilters } from './student.interface';
import { Student } from './student.model';

// get all student
const getAllStudent = async (
  filters: IStudentFilters,
  paginationOption: IPaginationOption,
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters;

  // this is for search
  const studentSearchFiled = [
    'name.firstName',
    'name.lastName',
    'email',
    'contactNo',
  ];
  const andCconditions = [];
  if (searchTerm) {
    andCconditions.push({
      $or: studentSearchFiled.map(field => ({
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

  const result = await Student.find(whereConditions)
    .sort({
      createdAt: 'desc',
      year: 'desc',
      code: 'desc',
    })
    .skip(skip)
    .limit(limit);
  const total = await Student.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get a single student
const getASingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id);
  return result;
};

// delete a student
const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findByIdAndDelete(id);
  return result;
};

// update a student
const updateStudent = async (id: string, payload: Partial<IStudent>) => {
  //   console.log('update data', payload);
  const result = await Student.findOneAndUpdate(
    { _id: id },
    { $set: payload },
    {
      new: true,
    },
  );
  return result;
};

export const studentService = {
  getAllStudent,
  getASingleStudent,
  deleteStudent,
  updateStudent,
};
