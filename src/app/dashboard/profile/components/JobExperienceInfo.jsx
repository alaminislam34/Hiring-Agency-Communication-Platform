"use client";

import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import CommonTitleOrEditBtn from "./CommonTitleOrEditBtn";

const JobExperienceInfo = () => {
  const [isEditingJob, setIsEditingJob] = useState(false);

  const [jobExperience, setJobExperience] = useState({
    jobTitle: "",
    companyName: "",
    isItRelated: "",
    years: "",
    startDate: "",
    endDate: "",
    isPresent: false,
  });

  const handleChange = (field, value) => {
    setJobExperience((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleJobUpdate = (e) => {
    e.preventDefault();
    const {
      jobTitle,
      companyName,
      isItRelated,
      years,
      startDate,
      endDate,
      isPresent,
    } = jobExperience;

    if (
      !jobTitle ||
      !companyName ||
      !isItRelated ||
      !years ||
      !startDate ||
      (!endDate && !isPresent)
    ) {
      alert("Please fill in all fields correctly.");
      return;
    }

    console.log("Updated Job Experience:", jobExperience);
    setIsEditingJob(false);
  };

  return (
    <div className="space-y-4">
      <CommonTitleOrEditBtn title={"Job Experience"} showEdit={"jobs"} />
      {isEditingJob === "jobs" ? (
        <form
          onSubmit={handleJobUpdate}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Designation */}
          <select
            className="border px-3 py-2 rounded text-black"
            value={jobExperience.jobTitle}
            onChange={(e) => handleChange("jobTitle", e.target.value)}
          >
            <option value="">Select Designation</option>
            <option value="Frontend Web Developer">
              Frontend Web Developer
            </option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Full-stack Web Developer">
              Full-stack Web Developer
            </option>
            <option value="Product Manager">Product Manager</option>
            <option value="SEO Expert">SEO Expert</option>
            <option value="Designer">Designer</option>
          </select>

          {/* Company Name */}
          <input
            type="text"
            placeholder="Company Name"
            className="border px-3 py-2 rounded text-black"
            value={jobExperience.companyName}
            onChange={(e) => handleChange("companyName", e.target.value)}
          />

          {/* IT Related? */}
          <select
            className="border px-3 py-2 rounded text-black"
            value={jobExperience.isItRelated}
            onChange={(e) => handleChange("isItRelated", e.target.value)}
          >
            <option value="">Related to IT?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          {/* Years of Experience */}
          <input
            type="text"
            placeholder="Years of Experience"
            className="border px-3 py-2 rounded text-black"
            value={jobExperience.years}
            onChange={(e) => handleChange("years", e.target.value)}
          />

          {/* Start Date */}
          <input
            type="date"
            className="border px-3 py-2 rounded text-black"
            value={jobExperience.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}
          />

          {/* End Date */}
          <input
            type="date"
            className="border px-3 py-2 rounded text-black"
            value={jobExperience.endDate}
            onChange={(e) => handleChange("endDate", e.target.value)}
            disabled={jobExperience.isPresent}
          />

          {/* Present Checkbox */}
          <div className="flex items-center space-x-2 col-span-full">
            <input
              type="checkbox"
              checked={jobExperience.isPresent}
              onChange={(e) =>
                setJobExperience((prev) => ({
                  ...prev,
                  isPresent: e.target.checked,
                  endDate: e.target.checked ? "" : prev.endDate,
                }))
              }
            />
            <label>Currently Working Here</label>
          </div>

          {/* Submit Button */}
          <div className="col-span-full">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save Job Experience
            </button>
          </div>
        </form>
      ) : (
        <ul className="text-sm space-y-1">
          <li>
            <strong>Job Title:</strong>{" "}
            {jobExperience.jobTitle || "Not Provided"}
          </li>
          <li>
            <strong>Company Name:</strong>{" "}
            {jobExperience.companyName || "Not Provided"}
          </li>
          <li>
            <strong>IT Related:</strong>{" "}
            {jobExperience.isItRelated || "Not Provided"}
          </li>
          <li>
            <strong>Experience:</strong> {jobExperience.years || "Not Provided"}{" "}
            years
          </li>
          <li>
            <strong>Start Date:</strong>{" "}
            {jobExperience.startDate || "Not Provided"}
          </li>
          <li>
            <strong>End Date:</strong>{" "}
            {jobExperience.isPresent
              ? "Present"
              : jobExperience.endDate || "Not Provided"}
          </li>
        </ul>
      )}
    </div>
  );
};

export default JobExperienceInfo;
