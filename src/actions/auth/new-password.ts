"use server";
import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import {
  deletePasswordResetTokenByToken,
  getPasswordResetTokenByToken,
} from "./reset";
import { getUserByEmail } from "@/actions/users/action";
import { TUser } from "@/app/ui/navbar/Navbar";
import axios from "axios";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null,
  accountType: string | null
) => {
  if (!token) return { error: "Missing token" };

  if (!accountType) return { error: "Invalid reset link!" };

  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid password!" };

  const { password } = validatedFields.data;
  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) return { error: "Invalid token!" };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Token has expired!" };

  const existingUser: TUser = await getUserByEmail(
    existingToken.email,
    accountType
  );

  if (!existingUser) return { error: "Invalid reset link!" };

  // Update user password
  try {
    await axios.post(
      `http://localhost:3131/api/v1/${accountType}/reset-password`,
      { id: existingUser._id, password }
    );
    await deletePasswordResetTokenByToken(token);
    return { success: "Password reset successfully!" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};
