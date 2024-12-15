import { z } from "zod";

export const newAccountValidation = z
  .object({
    name: z.string().min(2),
    lastName: z.string().min(2),
    dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }), // ISO date string validation
    role: z.string().min(2),
    locale: z.string().min(2, {
      message: "Locale must be at least 3 characters long",
    }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 10 characters long" })
      .refine((val) => /[0-9]/.test(val), {
        message: "Password must include at least one number from 0-9",
      })
      .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
        message: "Password must include at least one these symbols @,#,$,*",
      }),
    confirmPassword: z.string().min(8, {
      message: "Confirm password must be at least 10 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // Point the error to confirmPassword
  });

export type Account = z.infer<typeof newAccountValidation>;
