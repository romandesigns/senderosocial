import { z } from "zod";

export const AccountValidation = z
  .object({
    name: z.string().min(2),
    lastName: z.string().min(2),
    dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }), // ISO date string validation
    role: z.string().min(2),
    email: z.string().email(),
    password: z
      .string()
      .min(10, { message: "Password must be at least 10 characters long" })
      .refine((val) => /[0-9]/.test(val), {
        message: "Password must include at least one number",
      })
      .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
        message: "Password must include at least one symbol",
      }),
    confirmPassword: z
      .string()
      .min(10, {
        message: "Confirm password must be at least 10 characters long",
      }),
    createdOn: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }), // ISO date string validation
    phoneVerified: z.boolean(), // Changed from string to boolean
    emailVerified: z.boolean(), // Changed from string to boolean
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // Point the error to confirmPassword
  });

export type Account = z.infer<typeof AccountValidation>;
