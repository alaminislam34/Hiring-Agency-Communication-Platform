"use client";

import jsPDF from "jspdf";

export default function ResumeGenerator({ formData = {} }) {
  const handleDownload = () => {
    const pdf = new jsPDF();

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.text(formData.name || "Your Name", 10, 20);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text(`Email: ${formData.email || "example@email.com"}`, 10, 30);
    pdf.text(`Phone: ${formData.phone || "123-456-7890"}`, 10, 40);

    pdf.setFont("helvetica", "bold");
    pdf.text("Career Objective:", 10, 50);
    pdf.setFont("helvetica", "normal");
    pdf.text(formData.careerObjective || "No objective provided", 10, 60);

    pdf.setFont("helvetica", "bold");
    pdf.text("Education:", 10, 80);
    pdf.setFont("helvetica", "normal");
    (formData.education || []).forEach((edu, index) => {
      pdf.text(
        `${edu.degree || ""} - ${edu.institution || ""}`,
        10,
        90 + index * 10
      );
    });

    pdf.setFont("helvetica", "bold");
    pdf.text("Work Experience:", 10, 120);
    pdf.setFont("helvetica", "normal");
    (formData.workExperience || []).forEach((work, index) => {
      pdf.text(
        `${work.position || ""} at ${work.company || ""}`,
        10,
        130 + index * 10
      );
    });

    pdf.setFont("helvetica", "bold");
    pdf.text("Skills:", 10, 160);
    pdf.setFont("helvetica", "normal");
    pdf.text((formData.skills || []).join(", "), 10, 170);

    pdf.setFont("helvetica", "bold");
    pdf.text("Projects:", 10, 190);
    pdf.setFont("helvetica", "normal");
    (formData.projects || []).forEach((project, index) => {
      pdf.text(
        `${project.name || ""} - ${project.link || ""}`,
        10,
        200 + index * 10
      );
    });

    pdf.setFont("helvetica", "bold");
    pdf.text("Languages:", 10, 230);
    pdf.setFont("helvetica", "normal");
    (formData.languages || []).forEach((lang, index) => {
      pdf.text(`${lang.name} (${lang.proficiency})`, 10, 240 + index * 10);
    });

    pdf.save("resume.pdf");
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-3">Resume Preview</h2>
      <div className="p-6 border rounded-lg shadow-lg bg-white text-black">
        <h2 className="text-2xl font-bold">{formData.name || "Your Name"}</h2>
        <p>Email: {formData.email || "example@email.com"}</p>
        <p>Phone: {formData.phone || "123-456-7890"}</p>

        <h3 className="mt-4 font-semibold">Career Objective</h3>
        <p>{formData.careerObjective || "No objective provided"}</p>

        <h3 className="mt-4 font-semibold">Education</h3>
        {(formData.education || []).map((edu, index) => (
          <p key={index}>
            {edu.degree || ""} - {edu.institution || ""}
          </p>
        ))}

        <h3 className="mt-4 font-semibold">Work Experience</h3>
        {(formData.workExperience || []).map((work, index) => (
          <p key={index}>
            {work.position || ""} at {work.company || ""}
          </p>
        ))}

        <h3 className="mt-4 font-semibold">Skills</h3>
        <p>{(formData.skills || []).join(", ")}</p>

        <h3 className="mt-4 font-semibold">Projects</h3>
        {(formData.projects || []).map((project, index) => (
          <p key={index}>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              {project.name}
            </a>
          </p>
        ))}

        <h3 className="mt-4 font-semibold">Languages</h3>
        <ul>
          {(formData.languages || []).map((lang, index) => (
            <li key={index}>
              {lang.name} ({lang.proficiency})
            </li>
          ))}
        </ul>
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
