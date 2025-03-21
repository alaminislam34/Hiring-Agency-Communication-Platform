"use client";

import jsPDF from "jspdf";

export default function ResumeGenerator({ formData }) {
  const handleDownload = () => {
    const pdf = new jsPDF();

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.text(formData.name, 10, 20);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text(`Email: ${formData.email}`, 10, 30);
    pdf.text(`Phone: ${formData.phone}`, 10, 40);

    pdf.setFont("helvetica", "bold");
    pdf.text("Education:", 10, 50);
    pdf.setFont("helvetica", "normal");
    formData.education.forEach((edu, index) => {
      pdf.text(`${edu.degree} - ${edu.institution}`, 10, 60 + index * 10);
    });

    pdf.setFont("helvetica", "bold");
    pdf.text("Work Experience:", 10, 90);
    pdf.setFont("helvetica", "normal");
    formData.workExperience.forEach((work, index) => {
      pdf.text(`${work.position} at ${work.company}`, 10, 100 + index * 10);
    });

    pdf.setFont("helvetica", "bold");
    pdf.text("Skills:", 10, 130);
    pdf.setFont("helvetica", "normal");
    pdf.text(formData.skills.join(", "), 10, 140);

    pdf.save("resume.pdf");
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-3">Resume Preview</h2>
      <div className="p-6 border rounded-lg shadow-lg bg-white text-black">
        <h2 className="text-2xl font-bold">{formData.name}</h2>
        <p>Email: {formData.email}</p>
        <p>Phone: {formData.phone}</p>

        <h3 className="mt-4 font-semibold">Education</h3>
        {formData.education.map((edu, index) => (
          <p key={index}>
            {edu.degree} - {edu.institution}
          </p>
        ))}

        <h3 className="mt-4 font-semibold">Work Experience</h3>
        {formData.workExperience.map((work, index) => (
          <p key={index}>
            {work.position} at {work.company}
          </p>
        ))}

        <h3 className="mt-4 font-semibold">Skills</h3>
        <p>{formData.skills.join(", ")}</p>
      </div>

      <button
        onClick={handleDownload}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Download as PDF
      </button>
    </div>
  );
}
