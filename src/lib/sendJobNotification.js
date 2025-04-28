"use server";
import nodemailer from "nodemailer";
import { collection, getCollection } from "./mongodb";

export const sendJobNotificationEmail = async (userEmails, userName, job) => {
  console.log(
    "Sending job match email to users:",
    userEmails,
    "for job:",
    job.title
  );

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Job apply link (you can customize this)
  const applyLink = `${process.env.NEXTAUTH_URL}/jobs/${job._id}`;

  // Ensure userEmails is an array
  const emailArray = Array.isArray(userEmails) ? userEmails : [userEmails];

  // Prepare the BCC recipients
  const bccEmails = emailArray?.join(", "); // Join all user emails for BCC

  try {
    await transporter.sendMail({
      from: `"JobHive" <${process.env.EMAIL_USER}>`,
      to: userEmails[0], // Send to the first email, BCC will handle the rest
      bcc: bccEmails, // All the users will be BCCed
      subject: `New Job Opportunity Matching Your Skills: ${job.title}`,
      html: `
        <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px;">
          <div style="text-align: center;">
            <h2 style="color: #009688;">Great News, ${userName}!</h2>
            <p style="font-size: 16px; color: #555;">A new job posting matches your skills on <strong>JobHive</strong>.</p>
          </div>

          <div style="margin-top: 20px;">
            <h3 style="color: #333;">Job Details:</h3>
            <p><strong>Title:</strong> ${job.title}</p>
            <p><strong>Location:</strong> ${job.location}</p>
            <p><strong>Description:</strong></p>
            <p style="background-color: #fff; padding: 15px; border-radius: 5px; border: 1px solid #eee; color: #555;">${job.description}</p>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <a href="${applyLink}" target="_blank" style="padding: 12px 24px; background-color: #009688; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
              🚀 Apply Now
            </a>
          </div>

          <p style="margin-top: 40px; font-size: 13px; text-align: center; color: #aaa;">
            You received this email because your skills match this opportunity. <br/>
            Stay tuned for more exciting opportunities from JobHive!
          </p>
        </div>
      `,
    });

    console.log(
      `Job notification email sent to ${userEmails.length} users via BCC`
    );
  } catch (error) {
    console.error("Error sending job notification email:", error);
  }
};
