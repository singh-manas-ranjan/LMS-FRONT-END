import * as z from "zod";

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  accountType: z.string().min(1, { message: "Account type is required" }),
});

const passwordValidation = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long." })
  .regex(/\d/, { message: "Password must include at least one digit." })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter.",
  })
  .regex(/[A-Z]/, { message: "Password needs at least one uppercase letter." })
  .regex(/[^\w\s]/, {
    message: "Include at least one special character (e.g., !, @, #, $, %).",
  });

export const NewPasswordSchema = z
  .object({
    password: passwordValidation,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
