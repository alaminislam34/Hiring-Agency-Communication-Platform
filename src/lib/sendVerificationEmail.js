import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email, token, name) => {
  console.log("verification email", email, token, name);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"JobHive" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your JobHive Account",
    html: `
      <h2>Hello ${name},</h2>
      <p>Thanks for registering! Please verify your email by clicking the link below:</p>
      <a href="${verificationUrl}" target="_blank">Verify Email</a>
      <p>If you did not create this account, you can ignore this message.</p>
    `,
  });
};
