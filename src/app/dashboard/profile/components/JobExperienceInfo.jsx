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
          {/* Designation */}
          <label htmlFor="jobTitle" className="flex flex-col gap-2">
            <span className="text-gray-500">Job Title</span>
            <select
              className="border border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-teal-500 p-2 rounded-lg"
              value={jobExperience.jobTitle}
              defaultValue={""}
              onChange={(e) => handleChange("jobTitle", e.target.value)}
              required
            >
              <option value="" disabled>
                Select Designation
              </option>
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
              <option value="Content Writer">Content Writer</option>
            </select>
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
          {/* IT Related? */}
          <label htmlFor="isItRelated" className="flex flex-col gap-2">
            <span className="text-gray-500">Related to IT?</span>
            <select
              className="border border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-teal-500 p-2 rounded-lg"
              value={jobExperience.isItRelated}
              onChange={(e) => handleChange("isItRelated", e.target.value)}
              required
            >
              <option value="">Related to IT?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>

          {/* Years of Experience */}
          <label htmlFor="years" className="flex flex-col gap-2">
            <span className="text-gray-500">Years of Experience</span>
            <input
              type="text"
              placeholder="Years of Experience"
              className="border border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-teal-500 p-2 rounded-lg"
              value={jobExperience.years}
              onChange={(e) => handleChange("years", e.target.value)}
              required
            />
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
            <span className="text-gray-500"> End Date</span>
            <input
              type="date"
              className="border border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-teal-500 p-2 rounded-lg"
              value={jobExperience.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
              disabled={jobExperience.isPresent}
            />
          </label>

          {/* Present Checkbox */}
          <div className="flex items-center space-x-2 col-span-full">
            <input
              type="checkbox"
              checked={jobExperience.isPresent}
              className="checkbox checkbox-accent"
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

          {/* Description */}
          <label
            htmlFor="description"
            className="flex flex-col gap-2 md:col-span-2"
          >
            <span className="text-gray-500">Job Description</span>
            <textarea
              name="jobDescription"
              placeholder="EnterJob Description"
              required
              rows={5}
              maxLength={500}
              className="border border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-teal-500 p-2 rounded-lg"
            ></textarea>
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
            <p className="text-gray-500">Job Title</p>{" "}
            <p className="md:text-lg">
              {" "}
              {currentUser?.jobTitle || "Not Provided"}
            </p>
          </li>
          <li className="flex flex-col gap-2">
            <p className="text-gray-500">Company Name</p>{" "}
            <p className="md:text-lg">
              {" "}
              {currentUser?.companyName || "Not Provided"}
            </p>
          </li>
          <li className="flex flex-col gap-2">
            <p className="text-gray-500">IT Related</p>{" "}
            <p className="md:text-lg">
              {" "}
              {currentUser?.isItRelated || "Not Provided"}
            </p>
          </li>
          <li className="flex flex-col gap-2">
            <p className="text-gray-500">Experience</p>{" "}
            <p className="md:text-lg">
              {" "}
              {currentUser?.years || "Not Provided"} years
            </p>
          </li>
          <li className="flex flex-col gap-2">
            <p className="text-gray-500">Start Date</p>{" "}
            <p className="md:text-lg">
              {" "}
              {currentUser?.startDate || "Not Provided"}
            </p>
          </li>
          <li className="flex flex-col gap-2">
            <p className="text-gray-500">End Date</p>{" "}
            <p className="md:text-lg">
              {" "}
              {currentUser?.isPresent
                ? "Present"
                : currentUser?.endDate || "Not Provided"}
            </p>
          </li>
          <li className="md:col-span-2">
            <p className="text-gray-500">Job Description</p>
            <p>{currentUser?.jobDescription || "N/A"}</p>
          </li>
        </ul>
      )}
    </div>
  );
};

export default JobExperienceInfo;
