"use client";

import { useState } from "react";
import { FaRegSave } from "react-icons/fa";
import { MdWorkOutline } from "react-icons/md";

const AddJobForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    jobType: "",
    minSalary: "",
    maxSalary: "",
    jobDetails: "",
    qualifications: "",
    experienceLevel: "",
    applicationDeadline: "",
    contactEmail: "",
    contactPhone: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <MdWorkOutline className="text-orange-500" /> Add New Job
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Job Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Job Title"
            name="jobTitle"
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            placeholder="Company Name"
            name="companyName"
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            placeholder="Location (e.g. New York, Remote)"
            name="location"
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <select
            name="jobType"
            className="select select-bordered w-full"
            onChange={handleChange}
            required
          >
            <option value="">Select Job Type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Remote">Remote</option>
            <option value="Internship">Internship</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>

        {/* Salary Range */}
        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Min Salary ($)"
            name="minSalary"
            onChange={handleChange}
            className="input input-bordered w-1/2"
          />
          <input
            type="number"
            placeholder="Max Salary ($)"
            name="maxSalary"
            onChange={handleChange}
            className="input input-bordered w-1/2"
          />
        </div>

        {/* Job Details */}
        <textarea
          placeholder="Job Description, Required Skills, Benefits, Application Instructions"
          name="jobDetails"
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
          required
        />

        {/* Qualifications & Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Qualifications"
            name="qualifications"
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <select
            name="experienceLevel"
            className="select select-bordered w-full"
            onChange={handleChange}
            required
          >
            <option value="">Select Experience Level</option>
            <option value="Entry-Level">Entry-Level</option>
            <option value="Mid-Level">Mid-Level</option>
            <option value="Senior-Level">Senior-Level</option>
          </select>
        </div>

        {/* Application Deadline & Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="date"
            name="applicationDeadline"
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            placeholder="Contact Email"
            name="contactEmail"
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            placeholder="Contact Phone"
            name="contactPhone"
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Job Category */}
        <select
          name="category"
          className="select select-bordered w-full"
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Customer Support">Customer Support</option>
          <option value="Software Development">Software Development</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
          <option value="HR & Recruiting">HR & Recruiting</option>
          <option value="Design">Design</option>
          <option value="Finance">Finance</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary flex items-center gap-2 w-full"
        >
          <FaRegSave /> Submit Job
        </button>
      </form>
    </div>
  );
};

export default AddJobForm;
