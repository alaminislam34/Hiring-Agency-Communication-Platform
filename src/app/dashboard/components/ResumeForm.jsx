"use client"; // Runs on the client side

import { useState } from "react";
import ResumeGenerator from "./ResumeGenerator";

export default function ResumeForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: [{ degree: "", institution: "" }],
    workExperience: [{ company: "", position: "" }],
    skills: [""],
  });

  const handleChange = (e, index, section) => {
    const updatedData = { ...formData };
    if (section) updatedData[section][index][e.target.name] = e.target.value;
    else updatedData[e.target.name] = e.target.value;
    setFormData(updatedData);
  };

  const addField = (section) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], section === "skills" ? "" : {}],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold mb-4">Resume Form</h2>

      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* Education Section */}
        <h3 className="font-semibold">Education</h3>
        {formData.education.map((edu, index) => (
          <div key={index} className="flex space-x-2">
            <input
              type="text"
              name="degree"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => handleChange(e, index, "education")}
              className="flex-1 p-2 border rounded"
            />
            <input
              type="text"
              name="institution"
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) => handleChange(e, index, "education")}
              className="flex-1 p-2 border rounded"
            />
          </div>
        ))}
        <button onClick={() => addField("education")} className="text-blue-500">
          + Add Education
        </button>

        {/* Work Experience Section */}
        <h3 className="font-semibold">Work Experience</h3>
        {formData.workExperience.map((work, index) => (
          <div key={index} className="flex space-x-2">
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={work.company}
              onChange={(e) => handleChange(e, index, "workExperience")}
              className="flex-1 p-2 border rounded"
            />
            <input
              type="text"
              name="position"
              placeholder="Position"
              value={work.position}
              onChange={(e) => handleChange(e, index, "workExperience")}
              className="flex-1 p-2 border rounded"
            />
          </div>
        ))}
        <button
          onClick={() => addField("workExperience")}
          className="text-blue-500"
        >
          + Add Experience
        </button>

        {/* Skills Section */}
        <h3 className="font-semibold">Skills</h3>
        {formData.skills.map((skill, index) => (
          <input
            key={index}
            type="text"
            name="skills"
            placeholder="Skill"
            value={skill}
            onChange={(e) => {
              const newSkills = [...formData.skills];
              newSkills[index] = e.target.value;
              setFormData({ ...formData, skills: newSkills });
            }}
            className="w-full p-2 border rounded"
          />
        ))}
        <button onClick={() => addField("skills")} className="text-blue-500">
          + Add Skill
        </button>
      </div>

      <ResumeGenerator formData={formData} />
    </div>
  );
}
