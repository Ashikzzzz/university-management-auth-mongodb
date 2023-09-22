import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface';

export type StudentName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type Gurdian = {
  fatherName: string;
  fatherOccupation: string;
  fatherNo: string;
  motherName: string;
  motherOccupation: string;
  motherNo: string;
};

export type LocalGurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type IStudent = {
  id: string;
  name: StudentName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  gurdian: Gurdian;
  localGurdian: LocalGurdian;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  academicSemester: Types.ObjectId | IAcademicSemester;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
};

export type StudentModel = Model<IStudent, Record<string, unknown>>;
