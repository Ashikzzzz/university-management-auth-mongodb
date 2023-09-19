import { z } from 'zod';

const academicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is Required',
    }),
    academicFaculty: z.string({
      required_error: 'Academic Faculty is required',
    }),
  }),
});

export const academicDepartmentZodValidation = {
  academicDepartmentZodSchema,
};
