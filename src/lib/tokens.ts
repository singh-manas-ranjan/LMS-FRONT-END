import {
  deletePasswordResetTokenByToken,
  getPasswordResetTokenByEmail,
  savePasswordResetToken,
} from "@/actions/auth/reset";

export const generatePasswordResetToken = async (email: string) => {
  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await deletePasswordResetTokenByToken(existingToken.token);
  }

  return await savePasswordResetToken(email);
};
