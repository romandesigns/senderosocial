import { z } from "zod";

export const phoneValidationSchema = z.object({
  phone: z
    .string()
    .min(1)
    .regex(/^\+?\d[\d\s]+$/, { message: "Invalid phone format" }),
  phoneNumber: z
    .string()
    .min(1)
    .regex(/^\+?\d+$/, { message: "Invalid phone number format" }),
  countryCode: z
    .string()
    .length(2)
    .regex(/^[A-Z]{2}$/, { message: "Invalid country code" }), // ISO Alpha-2 Code
  countryCallingCode: z
    .string()
    .min(1)
    .regex(/^\d+$/, { message: "Invalid country calling code" }),
  nationalNumber: z
    .string()
    .min(1)
    .regex(/^\d+$/, { message: "Invalid national number format" }),
  internationalNumber: z
    .string()
    .min(1)
    .regex(/^\+?\d[\d\s]+$/, {
      message: "Invalid international number format",
    }),
  possibleCountries: z.string().min(1), // Extend if possible countries should be a string array
  isValid: z.boolean(),
  isPossible: z.boolean(),
  twillioLocale: z.string().min(1),
  uri: z
    .string()
    .url()
    .regex(/^tel:\+?\d+$/, { message: "Invalid URI format" }),
  type: z.enum([
    "FIXED_LINE",
    "MOBILE",
    "FIXED_LINE_OR_MOBILE",
    "UNKNOWN",
    "TOLL_FREE",
    "PREMIUM_RATE",
  ]),
});

export const optValidationSchema = z.object({
  opt: z
    .string()
    .length(6)
    .regex(/^\d+$/, { message: "OPT must be a 6-digit numeric string" }),
  locale: z
    .string()
    .length(2)
    .regex(/^[a-z]{2}$/i, {
      message: "Locale must be a 2-letter language code",
    }),
});
