"use client";

import { useEffect, useState } from "react";
import CommonTitleOrEditBtn from "./CommonTitleOrEditBtn";
import { useAppContext } from "@/Providers/AppProviders";
import axios from "axios";
import Swal from "sweetalert2";

const JobExperienceInfo = () => {
  const [loading, setLoading] = useState(false);
  const {
    isEditingInfo,
    setIsEditingInfo,
    currentUser,
    userRefetch,
    userLoading,
  } = useAppContext();

  const [jobExperience, setJobExperience] = useState({
    jobTitle: "",
    jobType: "",
    jobDescription: "",
    startDate: "",
    endDate: "",
    companyName: "",
  });

  const handleChange = (field, value) => {
    setJobExperience((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleJobUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const JobExperienceInfo = jobExperience;
    try {
      const res = await axios.post("/api/updateProfile", JobExperienceInfo);
      if (res.data.modifiedCount > 0) {
        userRefetch();
        setIsEditingInfo("");
        Swal.fire("Success", "Profile updated successfully", "success");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <CommonTitleOrEditBtn title={"Job Experience"} showEdit={"jobs"} />
      {isEditingInfo === "jobs" ? (
        <form
          onSubmit={handleJobUpdate}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"
        >
          {/* Job Title */}
          <label htmlFor="jobTitle" className="flex flex-col gap-2">
            <span className="text-gray-500">Job Title</span>
            <input
              className="border border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-teal-500 p-2 rounded-lg"
              value={jobExperience.jobTitle}
              placeholder="Job Title"
              type="text"
              onChange={(e) => handleChange("jobTitle", e.target.value)}
              required
            />
          </label>

          {/* Company Name */}
          <label htmlFor="companyName" className="flex flex-col gap-2">
            <span className="text-gray-500">Company Name</span>
            <input
              type="text"
              placeholder="Company Name"
              className="border border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-teal-500 p-2 rounded-lg"
              value={jobExperience.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              required
            />
          </label>

          {/* Job Type */}
          <label htmlFor="jobType" className="flex flex-col gap-2">
            <span className="text-gray-500">Job Type</span>
            <select
              className="border border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-teal-500 p-2 rounded-lg"
              value={jobExperience.jobType}
              onChange={(e) => handleChange("jobType", e.target.value)}
              required
            >
              <option value="" disabled>
                Select Job Type
              </option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Freelance">Freelance</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
              <option value="On Site">On Site</option>
            </select>
          </label>

          {/* Job Description */}
          <label
            htmlFor="jobDescription"
            className="flex flex-col gap-2 md:col-span-2"
          >
            <span className="text-gray-500">Job Description</span>
            <textarea
              name="jobDescription"
              placeholder="Enter Job Description"
              required
              rows={5}
              maxLength={500}
              className="border border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-teal-500 p-2 rounded-lg"
              value={jobExperience.jobDescription}
              onChange={(e) => handleChange("jobDescription", e.target.value)}
            ></textarea>
          </label>

          {/* Start Date */}
          <label htmlFor="startDate" className="flex flex-col gap-2">
            <span className="text-gray-500">Start Date</span>
            <input
              type="date"
              className="border border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-teal-500 p-2 rounded-lg"
              value={jobExperience.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              required
            />
          </label>

          {/* End Date */}
          <label htmlFor="endDate" className="flex flex-col gap-2">
            <span className="text-gray-500">End Date</span>
            <input
              type="date"
              className="border border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-teal-500 p-2 rounded-lg"
              value={jobExperience.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
            />
          </label>

          {/* Submit Button */}
          <div className="col-span-full flex justify-end">
            <button
              type="submit"
              className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 cursor-pointer btn"
            >
              {loading ? (
                <span className="loading loading-dots loading-sm">
                  Saving...
                </span>
              ) : (
                "Save Job Experience"
              )}
            </button>
          </div>
        </form>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-x-6">
          <li className="flex flex-col gap-2">
            <p className="text-gray-500">Job Title</p>
            <p className="md:text-lg">
              {currentUser?.jobTitle || "Not Provided"}
            </p>
          </li>
          <li className="flex flex-col gap-2">
            <p className="text-gray-500">Company Name</p>
            <p className="md:text-lg">
              {currentUser?.companyName || "Not Provided"}
            </p>
          </li>
          <li className="flex flex-col gap-2">
            <p className="text-gray-500">Job Type</p>
            <p className="md:text-lg">
              {currentUser?.jobType || "Not Provided"}
            </p>
          </li>
          <li className="flex flex-col gap-2">
            <p className="text-gray-500">Job Description</p>
            <p>{currentUser?.jobDescription || "Not Provided"}</p>
          </li>
          <li className="flex flex-col gap-2">
            <p className="text-gray-500">Start Date</p>
            <p className="md:text-lg">
              {currentUser?.startDate || "Not Provided"}
            </p>
          </li>
          <li className="flex flex-col gap-2">
            <p className="text-gray-500">End Date</p>
            <p className="md:text-lg">
              {currentUser?.endDate || "Not Provided"}
            </p>
          </li>
        </ul>
      )}
    </div>
  );
};

export default JobExperienceInfo;
