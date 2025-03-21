"use client";

import React from "react";
import DashboardNavbar from "@/components/DashboardNavbar";

const EmployerDashboard = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());
    console.log(formData);
  };

  return (
    <div>
      <DashboardNavbar />
      <div className="m-12">
        <form onSubmit={handleSubmit} >
          <div className=" grid grid-cols-3 gap-4">
            {/* Job Title */}
            <div>
              <label className="fieldset-label text-black mb-2">
                Job Title
              </label>
              <input
                type="text"
                name="jobTitle"
                className="input w-full focus:outline-none focus:ring-0"
                placeholder="Job Title "
              />
            </div>
            {/* Company Name */}
            <div>
              <label className="fieldset-label text-black mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                className="input w-full focus:outline-none focus:ring-0"
                placeholder="Company Name"
              />
            </div>
            {/* Location */}
            <div>
              <label className="fieldset-label text-black mb-2">Location</label>
              <input
                type="text"
                name="location"
                className="input w-full focus:outline-none focus:ring-0"
                placeholder="Location"
              />
            </div>
            {/* Job Type */}
            <div>
              <label className="fieldset-label text-black mb-2">Job Type</label>
              <select name="jobType" className="select w-full focus:outline-none focus:ring-0">
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Remote</option>
                <option>Contract</option>
              </select>
            </div>
            {/* Salary Range */}
            <div>
              <label className="fieldset-label text-black mb-2">
                Salary Range
              </label>
              <input
                type="text"
                name="salaryRange"
                className="input w-full focus:outline-none focus:ring-0"
                placeholder="Salary (e.g., $20,000 - $30,000)"
              />
            </div>
            {/* Required Skills */}
            <div>
              <label className="fieldset-label text-black mb-2">
                Required Skills
              </label>
              <select name="requiredSkills" className="select w-full focus:outline-none focus:ring-0">
                <option disabled selected>
                  Select Required Skills
                </option>
                <option>Customer Service</option>
                <option>Problem-Solving</option>
                <option>Active Listening</option>
                <option>CRM Software</option>
                <option>Multitasking</option>
              </select>
            </div>
            {/* Preferred Skills  */}
            <div>
              <label className="fieldset-label text-black mb-2">
                Preferred Skills
              </label>
              <select name="preferredSkills" className="select w-full focus:outline-none focus:ring-0">
                <option disabled selected>
                  Select Preferred Skills
                </option>
                <option>Experience in Call Centers</option>
                <option>Technical Support</option>
                <option>Fluency in Multiple Languages</option>
              </select>
            </div>
            {/* Qualifications */}
            <div>
              <label className="fieldset-label text-black mb-2">
                Qualifications
              </label>
              <input
                type="text"
                name="qualifications"
                className="input w-full focus:outline-none focus:ring-0"
                placeholder="Qualifications"
              />
            </div>
            {/* Experience Level */}
            <div>
              <label className="fieldset-label text-black mb-2">
                Experience Level
              </label>
              <input
                type="text"
                name="experienceLevel"
                className="input w-full focus:outline-none focus:ring-0"
                placeholder="Experience Level"
              />
            </div>
            {/* Benefits Dropdown */}
            <div>
              <label className="fieldset-label text-black mb-2">Benefits</label>
              <select name="benefits" className="select w-full focus:outline-none focus:ring-0">
                <option disabled selected>
                  Select Benefits
                </option>
                <option>Shift flexibility</option>
                <option>Performance bonuses</option>
                <option>Work-from-home options</option>
              </select>
            </div>
            {/* Contact Info */}
            <div>
              <label className="fieldset-label text-black mb-2">
                Contact Email
              </label>
              <input
                type="email"
                name="contactEmail"
                className="input w-full focus:outline-none focus:ring-0"
                placeholder="Contact Email"
              />
            </div>
            <div>
              <label className="fieldset-label text-black mb-2">
                Contact Phone
              </label>
              <input
                type="text"
                name="contactPhone"
                className="input w-full focus:outline-none focus:ring-0"
                placeholder="Contact Phone"
              />
            </div>
            {/* Company Overview */}
            <div>
              <label className="fieldset-label text-black mb-2">
                Company Overview
              </label>
              <textarea
                name="companyOverview"
                className="textarea w-full focus:outline-none focus:ring-0"
                placeholder="Brief about the company"
              ></textarea>
            </div>
            {/* Job Description */}
            <div>
              <label className="fieldset-label text-black mb-2">
                Job Description
              </label>
              <textarea
                name="jobDescription"
                className="textarea w-full focus:outline-none focus:ring-0"
                placeholder="Describe the job"
              ></textarea>
            </div>
            {/* Application Instructions */}
            <div>
              <label className="fieldset-label text-black mb-2">
                Application Instructions
              </label>
              <textarea
                name="applicationInstructions"
                className="textarea w-full focus:outline-none focus:ring-0"
                placeholder="How to Apply"
              ></textarea>
            </div>
            {/* Category */}
            <div>
              <label className="fieldset-label text-black mb-2">Category</label>
              <input
                type="text"
                name="category"
                className="input w-full focus:outline-none focus:ring-0"
                placeholder="Category"
              />
            </div>
            {/* Job ID */}
            <div>
              <label className="fieldset-label text-black mb-2">Job ID</label>
              <input
                type="text"
                name="jobId"
                className="input w-full focus:outline-none focus:ring-0"
                placeholder="Job ID"
              />
            </div>
            {/* Posted Date */}
            <div>
              <label className="fieldset-label text-black mb-2">
                Posted Date
              </label>
              <input type="date" name="postedDate" className="input w-full focus:outline-none focus:ring-0" />
            </div>
            {/* Application Deadline */}
            <div>
              <label className="fieldset-label text-black mb-2">
                Application Deadline
              </label>
              <input
                type="date"
                name="applicationDeadline"
                className="input w-full focus:outline-none focus:ring-0"
              />
            </div>
          </div>
          {/* Submit Button */}
          <button type="submit" className="btn btn-neutral mt-4 w-full">
            Add Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployerDashboard;
