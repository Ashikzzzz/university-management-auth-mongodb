import { z } from 'zod';

// login valiation data
const authValidationZodSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'ID is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

// refresh token zod schema
const refreshTokenValidationZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required',
    }),
  }),
});

// change password
const changePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old Password is required',
    }),
    newPassword: z.string({
      required_error: 'New password filed is required',
    }),
  }),
});

export const authValidation = {
  authValidationZodSchema,
  refreshTokenValidationZodSchema,
  changePasswordZodSchema,
};
