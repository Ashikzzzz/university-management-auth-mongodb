import mongoose from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiErrors';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
// import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import httpStatus from 'http-status';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { IAdmin } from '../admin/admin.interface';

// create a student
const createStudent = async (
  user: IUser,
  student: IStudent,
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_student_password as string;
  }

  // set role
  user.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester,
  );
  let newUserAllData = null;
  // transection and rollback
  const session = await mongoose.startSession();
  try {
    // generate student id

    session.startTransaction();
    const id = await generateStudentId(
      academicSemester as unknown as IAcademicSemester,
    );
    user.id = id;
    student.id = id;

    const createStudent = await Student.create([student], { session });

    if (!createStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create Student');
    }

    user.student = createStudent[0]._id;

    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create User');
    }
    newUserAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicDepartment',
        },
      ],
    });
  }
  return newUserAllData;
};

// create a faculty
const createFaculty = async (
  user: IUser,
  faculty: IFaculty,
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_faculty_password as string;
  }

  user.role = 'faculty';

  let newUserAllData = null;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateFacultyId();
    // set custom id into both  faculty & user
    user.id = id;
    faculty.id = id;

    const createFaculty = await Faculty.create([faculty], { session });

    if (!createFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }
    user.faculty = createFaculty[0]._id;
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create user');
    }
    newUserAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }
  return newUserAllData;
};

// create a admin
const createAdmin = async (
  user: IUser,
  admin: IAdmin,
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_faculty_password as string;
  }

  user.role = 'admin';

  let newUserAllData = null;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateAdminId();
    // set custom id into both  faculty & user
    user.id = id;
    admin.id = id;

    const createAdmin = await Faculty.create([admin], { session });

    if (!createAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Admin');
    }
    user.admin = createAdmin[0]._id;
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create user');
    }
    newUserAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      // populate: [
      //   {
      //     path: 'academicDepartment',
      //   },
      //   {
      //     path: 'academicFaculty',
      //   },
      // ],
    });
  }
  return newUserAllData;
};
export const userService = {
  createStudent,
  createFaculty,
  createAdmin,
};
