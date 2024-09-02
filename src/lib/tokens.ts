import {
  deletePasswordResetTokenByToken,
  getPasswordResetTokenByEmail,
  savePasswordResetToken,
} from "@/actions/auth/reset";
import { v4 as uuidv4 } from "uuid";

export const generatePasswordResetToken = async (email: string) => {
  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await deletePasswordResetTokenByToken(existingToken.token);
  }

  return await savePasswordResetToken(email);
};
