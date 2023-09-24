import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        middleName: z.string().optional(),
        lastName: z.string({
          required_error: 'Last Name is required',
        }),
      }),
      gender: z.enum(['male', 'female'], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({
        required_error: 'date Of Birth is required ',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
        required_error: 'Blood group is required',
      }),
      contactNo: z.string({
        required_error: 'Contact No is Required',
      }),
      emergencyContactNo: z.string().optional(),
      presentAddress: z.string({
        required_error: 'Address is required',
      }),
      permanentAddress: z.string({
        required_error: 'permanent Address is required',
      }),
      gurdian: z.object({
        fatherName: z.string({
          required_error: 'Father name is required',
        }),
        fatherOccupation: z.string({
          required_error: 'Father occupation is Required',
        }),
        fatherNo: z.string({
          required_error: 'Father number is Required',
        }),
        motherName: z.string({
          required_error: 'mother Name is required',
        }),
        motherOccupation: z.string({
          required_error: 'Mother occupation is required',
        }),
        motherNo: z.string({
          required_error: 'Mother number is Required',
        }),
      }),
      localGurdian: z.object({
        name: z.string({
          required_error: 'Name is require',
        }),
        occupation: z.string({
          required_error: 'This filed is required',
        }),
        contactNo: z.string({
          required_error: 'This filed is required',
        }),
        address: z.string({
          required_error: 'This filed is required',
        }),
      }),
      academicSemester: z.string({
        required_error: 'Academic semester is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic faculty is required',
      }),
    }),
  }),
});
// console.log('createUserZodValidation', createUserZodValidation)

export const userValidation = {
  createUserZodSchema,
};
