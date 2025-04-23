"use client";

import { useAppContext } from "@/Providers/AppProviders";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaBriefcase } from "react-icons/fa";

const PostNewJob = () => {
  const [currentUser] = useAppContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const postedBy = {
      postedBy: currentUser?.name,
      posterEmail: currentUser?.email,
      position: currentUser?.position,
    };

    const newJob = {
      id: Math.random().toString(36).substr(2, 9),
      ...postedBy,
      jobDetails: data,
      status: "pending",
    };

    setJobs((prevJobs) => [...prevJobs, newJob]);

    alert("✅ Job Posted Successfully!");
    console.table(newJob);
    reset();
  };

  return (
    <div className="">
      <h1 className="text-2xl font-semibold text-teal-600 mb-6 flex items-center gap-2 p-6">
        <FaBriefcase className="text-teal-500" /> Post New Job
      </h1>
      <h1>{jobs?.length || 0}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border border-gray-100 rounded-lg shadow p-6 space-y-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Job Title */}
          <div>
            <label className="block mb-1 font-medium text-teal-700">
              Job Title
            </label>
            <input
              type="text"
              placeholder="Enter job title"
              {...register("jobTitle", { required: "Job Title is required" })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            {errors.jobTitle && (
              <p className="text-sm text-red-600 mt-1">
                {errors.jobTitle.message}
              </p>
            )}
          </div>

          {/* Company Name */}
          <div>
            <label className="block mb-1 font-medium text-teal-700">
              Company Name
            </label>
            <input
              type="text"
              placeholder="Enter company name"
              {...register("companyName", {
                required: "Company Name is required",
              })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            {errors.companyName && (
              <p className="text-sm text-red-600 mt-1">
                {errors.companyName.message}
              </p>
            )}
          </div>

          {/* Salary Range Min */}
          <div>
            <label className="block mb-1 font-medium text-teal-700">
              Salary Min
            </label>
            <input
              type="number"
              placeholder="৳ Minimum"
              {...register("salaryMin", {
                required: "Minimum salary is required",
              })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            {errors.salaryMin && (
              <p className="text-sm text-red-600 mt-1">
                {errors.salaryMin.message}
              </p>
            )}
          </div>

          {/* Salary Range Max */}
          <div>
            <label className="block mb-1 font-medium text-teal-700">
              Salary Max
            </label>
            <input
              type="number"
              placeholder="৳ Maximum"
              {...register("salaryMax", {
                required: "Maximum salary is required",
              })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            {errors.salaryMax && (
              <p className="text-sm text-red-600 mt-1">
                {errors.salaryMax.message}
              </p>
            )}
          </div>

          {/* Deadline */}
          <div>
            <label className="block mb-1 font-medium text-teal-700">
              Application Deadline
            </label>
            <input
              type="date"
              {...register("deadline", {
                required: "Deadline is required",
              })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            {errors.deadline && (
              <p className="text-sm text-red-600 mt-1">
                {errors.deadline.message}
              </p>
            )}
          </div>

          {/* Job Type */}
          <div>
            <label className="block mb-1 font-medium text-teal-700">
              Job Type
            </label>
            <select
              {...register("jobType", {
                required: "Job type is required",
              })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              <option value="">Select Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Intern">Intern</option>
              <option value="Remote">Remote</option>
            </select>
            {errors.jobType && (
              <p className="text-sm text-red-600 mt-1">
                {errors.jobType.message}
              </p>
            )}
          </div>
          {/* Job Category */}
          <div>
            <label className="block mb-1 font-medium text-teal-700">
              Job Category
            </label>
            <select
              {...register("jobCategory", {
                required: "Job category is required",
              })}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400"
              defaultValue=""
            >
              <option value="" disabled>
                -- Select Job Category --
              </option>
              <option value="Software Development">Software Development</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Customer Support">Customer Support</option>
              <option value="Project Management">Project Management</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Finance & Accounting">Finance & Accounting</option>
              <option value="Education & Training">Education & Training</option>
              <option value="Writing & Editing">Writing & Editing</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Engineering">Engineering</option>
            </select>
            {errors.jobCategory && (
              <p className="text-sm text-red-600 mt-1">
                {errors.jobCategory.message}
              </p>
            )}
          </div>
        </div>
        {/* Job Description */}
        <div>
          <label className="block mb-1 font-medium text-teal-700">
            Job Description
          </label>
          <textarea
            rows="4"
            placeholder="Write at least 3 sentences about the job..."
            {...register("jobDescription", {
              required: "Job description is required",
              validate: (value) =>
                value
                  .trim()
                  .split(/[.!?]\s+/)
                  .filter(Boolean).length >= 3 ||
                "Please write at least 3 sentences.",
            })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          {errors.jobDescription && (
            <p className="text-sm text-red-600 mt-1">
              {errors.jobDescription.message}
            </p>
          )}
        </div>

        {/* Job Requirements */}
        <div>
          <label className="block mb-1 font-medium text-teal-700">
            Job Requirements{" "}
            <span className="text-sm text-gray-500">(At least 3)</span>
          </label>
          <textarea
            rows="4"
            placeholder="List requirements (e.g., experience, skills)..."
            {...register("jobRequirements", {
              required: "Job requirements are required",
              validate: (value) => {
                const list = value
                  .split(/\n|,/)
                  .map((item) => item.trim())
                  .filter((item) => item.length > 0);
                return (
                  list.length >= 3 || "Please mention at least 3 requirements."
                );
              },
            })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          {errors.jobRequirements && (
            <p className="text-sm text-red-600 mt-1">
              {errors.jobRequirements.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-teal-600 cursor-pointer text-white px-5 py-2 rounded hover:bg-teal-700 transition w-full font-medium"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostNewJob;
