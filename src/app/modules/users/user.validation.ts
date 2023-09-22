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
    }),
    presentAddress: z.string({
      required_error: 'Address is required',
    }),
    permanentAddress: z.string({
      required_error: 'permanent Address is required',
    }),
    gurdian: z.object({
      fatherName: z.string().optional(),
      fatherOccupation: z.string().optional(),
      fatherNo: z.string().optional(),
      motherName: z.string({
        required_error: 'mother Name is required',
      }),
      motherOccupation: z.string().optional(),
      motherNo: z.string().optional(),
    }),
    localGurdian: z.object({
      name: z.string({
        required_error: 'Name is require',
      }),
      occupation: z.string().optional(),
      contactNo: z.string().optional(),
      address: z.string().optional(),
    }),
  }),
});
// console.log('createUserZodValidation', createUserZodValidation)

export const userValidation = {
  createUserZodSchema,
};
