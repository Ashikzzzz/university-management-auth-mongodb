// import mongoose from 'mongoose';
// import config from '../../../config/index';
// import ApiError from '../../../errors/ApiErrors';
// import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
// // import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
// import { IStudent } from '../student/student.interface';
// import { Student } from '../student/student.model';
// import { IUser } from './user.interface';
// import { User } from './user.model';
// import { generateStudentId } from './user.utils';
// import httpStatus from 'http-status';
// import { AcademicSemester } from '../academicSemester/academicSemester.model';

// const createStudent = async (
//   user: IUser,
//   student: IStudent,
// ): Promise<IUser | null> => {
//   // default password
//   if (!user.password) {
//     user.password = config.default_student_password as string;
//   }

//   // set role
//   user.role = 'student';

//   const academicSemester = await AcademicSemester.findById(
//     student.academicSemester,
//   );

//   // transection and rollback
//   const session = await mongoose.startSession();
//   try {
//     // generate student id
//     let newUserAllData = null;
//     session.startTransaction();
//     const id = await generateStudentId(
//       academicSemester as unknown as IAcademicSemester,
//     );
//     user.id = id;
//     student.id = id;

//     const createStudent = await Student.create([student], { session });

//     if (!createStudent.length) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create Student');
//     }

//     user.student = createStudent[0]._id;

//     const newUser = await User.create([user], { session });
//     if (!newUser.length) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create User');
//     }
//     newUserAllData = newUser[0];
//     await session.commitTransaction();
//     await session.endSession();
//   } catch (error) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw error;
//   }

//   // if (newUserAllData) {
//   //   newUserAllData = await User.findOne({ id: newUserAllData.id });
//   // }
// };

// export const userService = {
//   createStudent,
// };
