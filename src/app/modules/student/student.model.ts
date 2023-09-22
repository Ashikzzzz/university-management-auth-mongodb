import { Schema, model } from 'mongoose';
import { IStudent, StudentModel } from './student.interface';

export const studentSchema = new Schema<IStudent>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    contactNo: {
      type: String,
      required: true,
      unique: true,
    },
    emergencyContactNo: {
      type: String,
    },

    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    gurdian: {
      required: true,
      type: {
        fatherName: {
          type: String,
        },
        fatherOccupation: {
          type: String,
        },
        fatherNo: {
          type: String,
        },
        motherName: {
          type: String,
          required: true,
        },
        motherOccupation: {
          type: String,
        },
        motherNo: {
          type: String,
        },
      },
    },

    localGurdian: {
      required: true,
      type: {
        name: {
          type: String,
          required: true,
        },
        occupation: {
          type: String,
        },
        contactNo: {
          type: String,
        },
        address: {
          type: String,
        },
      },
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const AcademicSemester = model<IStudent, StudentModel>(
  'Student',
  studentSchema,
);
