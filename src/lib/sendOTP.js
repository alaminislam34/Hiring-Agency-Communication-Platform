"use server";
import nodemailer from "nodemailer";
import dbConnect, { collection } from "./dbConnect";

export const sendOTP = async (email) => {
  console.log("Sending OTP to:", email);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const otp = Math.floor(100000 + Math.random() * 900000);
  const userCollection = dbConnect(collection.user_collection);
  await userCollection.updateOne(
    { email: email },
    {
      $set: {
        otp: otp,
        otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
    },
    { upsert: true }
  );
  const mailOptions = {
    from: `"JobHive" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP for JobHive Password Reset",
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 30px; background: #f9f9f9; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 10px;">
        <div style="text-align: center;">
          <h2 style="color: #ff6f00;">JobHive Password Reset</h2>
          <p style="font-size: 16px; color: #333;">Hi <strong>${email}</strong>,</p>
          <p style="font-size: 15px; color: #555; margin: 20px 0;">
            Use the following One-Time Password (OTP) to reset your password:
          </p>
          <div style="font-size: 28px; font-weight: bold; background: #fff; padding: 10px 20px; border-radius: 8px; display: inline-block; border: 1px dashed #ff6f00; color: #333;">
            ${otp}
          </div>
          <p style="margin-top: 20px; font-size: 14px; color: #999;">
            This OTP is valid for 5 minutes. Do not share it with anyone.
          </p>
        </div>
        <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;">
        <p style="font-size: 12px; text-align: center; color: #aaa;">
          © ${new Date().getFullYear()} JobHive. All rights reserved.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
