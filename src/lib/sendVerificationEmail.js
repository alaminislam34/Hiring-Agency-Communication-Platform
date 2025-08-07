"use server";
import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email) => {
  console.log("verification email", email);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const verifyLink = `${process.env.NEXTAUTH_URL}/verifyEmail?email=${email}`;

  await transporter.sendMail({
    from: `"JobHive" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your JobHive Account",
    html: `
  <div style="max-width: 600px; margin: 0 auto; padding: 30px; background: #f9f9f9; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 10px;">
    <div style="text-align: center;">
      <h1 style="color: #009688; margin-bottom: 10px;">Welcome to JobHive</h1>
      <p style="font-size: 16px; color: #333;">Hi <p className="text-sm">${email}</p>,</p>
      <p style="font-size: 15px; color: #555; margin: 20px 0;">
        Thanks for registering with us! You're one step away from accessing all the opportunities on JobHive.
      </p>
      <a href="${verifyLink}" target="_blank"
        style="display: inline-block; padding: 12px 25px; background-color: #009688; color: white; text-decoration: none; font-weight: bold; border-radius: 6px; font-size: 16px; transition: background 0.3s ease;">
        ✅ Verify Your Email
      </a>
      <p style="margin-top: 30px; font-size: 14px; color: #999;">
        If you didn’t create this account, feel free to ignore this message.
      </p>
    </div>
    <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;">
    <p style="font-size: 12px; text-align: center; color: #aaa;">
      © ${new Date().getFullYear()} JobHive. All rights reserved.
    </p>
  </div>
`,
  });
};
