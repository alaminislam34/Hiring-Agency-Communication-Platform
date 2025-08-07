"use server";
import nodemailer from "nodemailer";
import { ObjectId } from "mongodb";
import { collection, getCollection } from "./mongodb";

// Function to send review result to candidate
export const sendApplicationReviewEmail = async (id, status, email) => {
  console.log("sendApplicationReviewEmail", id, status, email);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const candidatesCollection = await getCollection(
      collection.appliedCollection
    );
    const candidate = await candidatesCollection.findOne({
      candidateEmail: email,
    });

    if (!candidate) {
      console.log("Candidate not found");
      return;
    }

    if (status === "Accepted") {
      // Send acceptance email
      await transporter.sendMail({
        from: `"JobHive" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your Job Application Has Been Accepted",
        html: `
        <div style="max-width: 600px; margin: auto; padding: 30px; background: #f9f9f9; font-family: Arial; border-radius: 10px; border: 1px solid #ddd;">
          <h2 style="color: #2ecc71;">Great News!</h2>
          <p style="font-size: 16px;">Hi ${email},</p>
          <p style="font-size: 15px;">Your job application has been <strong>accepted</strong>. Our team is impressed with your profile!</p>
          <p style="font-size: 15px;">We will contact you shortly with further steps.</p>
          <p style="margin-top: 30px; font-size: 14px; color: #999;">
            If you have any questions, feel free to contact us.<br/>
            Thanks for applying on JobHive!
          </p>
          <p style="font-size: 12px; text-align: center; color: #aaa;">
            © ${new Date().getFullYear()} JobHive. All rights reserved.
          </p>
        </div>
        `,
      });
      console.log("Accepted email sent to", email);
    } else if (status === "Rejected") {
      // Send rejection email
      await transporter.sendMail({
        from: `"JobHive" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your Job Application Has Been Rejected",
        html: `
        <div style="max-width: 600px; margin: auto; padding: 30px; background: #f9f9f9; font-family: Arial; border-radius: 10px; border: 1px solid #ddd;">
          <h2 style="color: #e74c3c;">Unfortunately, Not This Time</h2>
          <p style="font-size: 16px;">Hi ${email},</p>
          <p style="font-size: 15px;">We appreciate your interest in the position. However, after careful consideration, your application was not selected at this time.</p>
          <p style="font-size: 15px;">Please don't be discouraged — keep applying and improving. We wish you all the best!</p>
          <p style="margin-top: 30px; font-size: 14px; color: #999;">
            Thank you for applying on JobHive.
          </p>
          <p style="font-size: 12px; text-align: center; color: #aaa;">
            © ${new Date().getFullYear()} JobHive. All rights reserved.
          </p>
        </div>
        `,
      });
      console.log("Rejection email sent to", email);
    }
  } catch (error) {
    console.error("Error sending application review email:", error);
  }
};
