import * as z from "zod";

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  accountType: z.string().min(1, { message: "Account type is required" }),
});
