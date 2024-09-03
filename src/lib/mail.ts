import nodemailer from "nodemailer";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

//Sending password reset email using nodemailer
export const sendPasswordResetEmailUsingNodeMailer = async (
  name: string,
  email: string,
  token: string,
  accountType: string
) => {
  const resetLink = `${baseUrl}/auth/new-password/?acc-type=${accountType}&token=${token}`;
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    const testResult = await transporter.verify();
    console.log(testResult);
  } catch (error) {
    console.log(error);
    return;
  }

  try {
    const sendResult = await transporter.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: "Reset your password",
      html: `
       <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              padding-bottom: 20px;
            }
            .header h1 {
              color: #333;
            }
            .content {
              font-size: 16px;
              line-height: 1.5;
              color: #555;
              margin-bottom: 20px;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              font-size: 16px;
              color: #ffffff;
              background-color: #007bff;
              border-radius: 4px;
              text-decoration: none;
            }
            .button:hover {
              background-color: #0056b3;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #999;
            }
          </style>
        </head>
        <body>
          <div class="container" style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div class="header" style="text-align: center; padding-bottom: 20px;">
              <h1 style="color: #333;">Password Reset Request</h1>
            </div>
            <div class="content" style="font-size: 16px; line-height: 1.5; color: #555; margin-bottom: 20px;">
              <p>Hello ${name},</p>
              <p>We received a request to reset your password. Click the button below to create a new password:</p>
              <a href="${resetLink}" class="button" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #007bff; border-radius: 4px; text-decoration: none;">Reset Password</a>
              <p>If you did not request this, please ignore this email.</p>
            </div>
            <div class="footer" style="text-align: center; font-size: 12px; color: #999;">
              <p>&copy; 2024 Learnopia. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
    `,
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
};
