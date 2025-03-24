"use client"; // Runs on the client side

import { useState } from "react";
import ResumeGenerator from "./ResumeGenerator";

export default function ResumeForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    github: "",
    linkedin: "",
    careerObjective: "",
    skills: [""],
    projects: [
      { name: "", liveLink: "", clientCode: "", serverCode: "", details: "" },
    ],
    education: [{ degree: "", institution: "", year: "" }],
    languages: [{ name: "", proficiency: "" }],
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
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="github"
          placeholder="GitHub"
          value={formData.github}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn"
          value={formData.linkedin}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="careerObjective"
          placeholder="Career Objective"
          value={formData.careerObjective}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        ></textarea>

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

        <h3 className="font-semibold">Projects</h3>
        {formData.projects.map((proj, index) => (
          <div key={index} className="space-y-2">
            <input
              type="text"
              name="name"
              placeholder="Project Name"
              value={proj.name}
              onChange={(e) => handleChange(e, index, "projects")}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="liveLink"
              placeholder="Live Site URL"
              value={proj.liveLink}
              onChange={(e) => handleChange(e, index, "projects")}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="clientCode"
              placeholder="Client Code URL"
              value={proj.clientCode}
              onChange={(e) => handleChange(e, index, "projects")}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="serverCode"
              placeholder="Server Code URL"
              value={proj.serverCode}
              onChange={(e) => handleChange(e, index, "projects")}
              className="w-full p-2 border rounded"
            />
            <textarea
              name="details"
              placeholder="Project Details"
              value={proj.details}
              onChange={(e) => handleChange(e, index, "projects")}
              className="w-full p-2 border rounded"
            ></textarea>
          </div>
        ))}
        <button onClick={() => addField("projects")} className="text-blue-500">
          + Add Project
        </button>

        <h3 className="font-semibold">Education</h3>
        {formData.education.map((edu, index) => (
          <div key={index} className="space-y-2">
            <input
              type="text"
              name="degree"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => handleChange(e, index, "education")}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="institution"
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) => handleChange(e, index, "education")}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="year"
              placeholder="Year"
              value={edu.year}
              onChange={(e) => handleChange(e, index, "education")}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
        <button onClick={() => addField("education")} className="text-blue-500">
          + Add Education
        </button>

        <h3 className="font-semibold">Languages</h3>
        {formData.languages.map((lang, index) => (
          <div key={index} className="space-y-2">
            <input
              type="text"
              name="name"
              placeholder="Language"
              value={lang.name}
              onChange={(e) => handleChange(e, index, "languages")}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="proficiency"
              placeholder="Proficiency"
              value={lang.proficiency}
              onChange={(e) => handleChange(e, index, "languages")}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
        <button onClick={() => addField("languages")} className="text-blue-500">
          + Add Language
        </button>
      </div>

      <ResumeGenerator formData={formData} />
    </div>
  );
}
