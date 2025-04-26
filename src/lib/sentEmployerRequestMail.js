"use server";
import nodemailer from "nodemailer";
import { collection, getCollection } from "./mongodb";

// Function to send the update employer request email
export const sendUpdateEmployerRequest = async (email, status, user) => {
  console.log("sendUpdateEmployerRequest", email, status, user);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Link for job posting
  const jobPostingLink = `${process.env.NEXTAUTH_URL}/employer/addJob`;

  try {
    if (status === "Accepted") {
      // If the request is accepted, send a congratulatory email
      console.log("Sending acceptance email to", email); // Log before sending email
      await transporter.sendMail({
        from: `"JobHive" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your Employer Role Request Has Been Accepted",
        html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 30px; background: #f9f9f9; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 10px;">
          <div style="text-align: center;">
            <h1 style="color: #009688; margin-bottom: 10px;">Congratulations! Your Employer Request Has Been Accepted</h1>
            <p style="font-size: 16px; color: #333;">Hi ${email},</p>
            <p style="font-size: 15px; color: #555; margin: 20px 0;">
              We're excited to inform you that your request to become an employer on JobHive has been approved!
            </p>
            <p style="font-size: 15px; color: #555; margin: 20px 0;">
              You can now start posting job opportunities and connect with talented job seekers.
            </p>
            <a href="${jobPostingLink}" target="_blank"
              style="display: inline-block; padding: 12px 25px; background-color: #009688; color: white; text-decoration: none; font-weight: bold; border-radius: 6px; font-size: 16px; transition: background 0.3s ease;">
              🚀 Start Posting Jobs Now
            </a>
            <p style="margin-top: 30px; font-size: 14px; color: #999;">
              If you have any questions, feel free to contact us.
            </p>
          </div>
          <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; text-align: center; color: #aaa;">
            © ${new Date().getFullYear()} JobHive. All rights reserved.
          </p>
        </div>
        `,
      });
      const userCollection = await getCollection(collection.user_collection);
      const user = await userCollection.findOne({ email: email });
      if (user) {
        await userCollection.updateOne(
          { email: email },
          {
            $set: {
              role: "employer",
              location: user?.location,
              position: user?.position,
              isVerified: true,
            },
          },
          {
            upsert: true,
          }
        );
      } else {
        console.log("User not found");
      }
      console.log("Acceptance email sent to", email); // Log after email is sent
    } else if (status === "Rejected") {
      // If the request is rejected, send a rejection email with encouragement to try again
      console.log("Sending rejection email to", email); // Log before sending email
      await transporter.sendMail({
        from: `"JobHive" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your Employer Role Request Has Been Rejected",
        html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 30px; background: #f9f9f9; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 10px;">
          <div style="text-align: center;">
            <h1 style="color: #e74c3c; margin-bottom: 10px;">Sorry! Your Employer Request Has Been Rejected</h1>
            <p style="font-size: 16px; color: #333;">Hi ${email},</p>
            <p style="font-size: 15px; color: #555; margin: 20px 0;">
              Unfortunately, your request to become an employer on JobHive has been rejected. However, don't be discouraged!
            </p>
            <p style="font-size: 15px; color: #555; margin: 20px 0;">
              You can always improve and apply again in the future. Keep working hard, and we look forward to hearing from you soon.
            </p>
            <p style="margin-top: 30px; font-size: 14px; color: #999;">
              If you have any questions or need more information, feel free to contact us.
            </p>
          </div>
          <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; text-align: center; color: #aaa;">
            © ${new Date().getFullYear()} JobHive. All rights reserved.
          </p>
        </div>
        `,
      });
      console.log("Rejection email sent to", email); // Log after email is sent
    }
  } catch (error) {
    console.error("Error sending email:", error); // Log any errors
  }
};
