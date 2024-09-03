"use server";

import * as z from "zod";
import { ResetSchema } from "@/schemas";
import { sendPasswordResetEmailUsingNodeMailer } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import axios from "axios";
import { getUserByEmail } from "@/actions/users/action";
import { TUser } from "@/app/ui/navbar/Navbar";

export type TPasswordResetToken = {
  id?: string;
  email: string;
  token: string;
  expires: Date;
};

export const getPasswordResetTokenByToken = async (
  token: string
): Promise<TPasswordResetToken | null> => {
  try {
    const passwordResetToken = await axios
      .get(`http://localhost:3131/api/v1/password-reset-tokens/token/${token}`)
      .then((res) => res.data.body);
    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (
  email: string
): Promise<TPasswordResetToken | null> => {
  try {
    const passwordResetToken = await axios
      .get(`http://localhost:3131/api/v1/password-reset-tokens/email/${email}`)
      .then((res) => res.data.body);
    return passwordResetToken;
  } catch {
    return null;
  }
};

export const deletePasswordResetTokenByToken = async (token: string) => {
  try {
    return await axios.delete(
      `http://localhost:3131/api/v1/password-reset-tokens`,
      { data: { token } }
    );
  } catch {
    return null;
  }
};

export const savePasswordResetToken = async (email: string) => {
  try {
    const passwordResetToken = await axios
      .post(`http://localhost:3131/api/v1/password-reset-tokens`, { email })
      .then((res) => res.data.body);
    return passwordResetToken;
  } catch {
    return null;
  }
};

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields.data;

  const existingUser: TUser = await getUserByEmail(email, values.accountType);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  //   Send verification email using nodemailer
  await sendPasswordResetEmailUsingNodeMailer(
    `${existingUser.firstName} ${existingUser.lastName}`,
    passwordResetToken?.email,
    passwordResetToken?.token,
    values.accountType
  );

  return { success: "Reset email sent!" };
};
