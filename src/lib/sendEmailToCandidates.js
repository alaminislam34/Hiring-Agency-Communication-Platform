"use server";
import nodemailer from "nodemailer";

export const sendEmailToCandidates = async (selectedCandidates) => {
  if (!selectedCandidates?.length) return;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const emailList = selectedCandidates.map((c) => c.email);
  const uniqueEmails = [...new Set(emailList)];
  const bccEmails = uniqueEmails.join(", ");

  const job = selectedCandidates[0]; // For simplicity

  const interviewLink = `${process.env.NEXTAUTH_URL}/jobs/${job.jobId}`;

  const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px;">
        <h2 style="color: #00796b;">🎉 You're Shortlisted for an Interview!</h2>
        <p>Hello,</p>
        <p>We are excited to inform you that you have been shortlisted for an interview for the following position:</p>

        <ul>
          <li><strong>Position:</strong> ${job.title}</li>
          <li><strong>Company:</strong> ${job.companyName}</li>
          <li><strong>Location:</strong> ${job.location}</li>
          <li><strong>Deadline:</strong> ${new Date(
            job.deadline
          ).toLocaleDateString()}</li>
        </ul>

        <h3 style="margin-top: 20px;">📝 Job Description</h3>
        <p style="line-height: 1.6;">${
          job.description || "No description provided."
        }</p>

        <p style="margin-top: 20px;">To view more details and confirm your interview, click the button below:</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${interviewLink}" target="_blank" style="padding: 12px 24px; background-color: #00796b; color: white; text-decoration: none; border-radius: 6px;">
            View Job Details
          </a>
        </div>

        <p>We look forward to connecting with you soon.</p>

        <p style="margin-top: 30px;">Best regards,<br/>JobHive Team</p>

        <hr style="margin-top: 30px;" />
        <p style="font-size: 12px; color: #888;">This message was sent because you applied for a job on JobHive.</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"JobHive" <${process.env.EMAIL_USER}>`,
      to: uniqueEmails[0],
      bcc: bccEmails,
      subject: `📩 Interview Invitation for ${job.title}`,
      html: htmlTemplate,
    });

    console.log(`Interview emails sent to ${uniqueEmails.length} candidates.`);
  } catch (err) {
    console.error("Error sending interview emails:", err);
    throw err;
  }
};
