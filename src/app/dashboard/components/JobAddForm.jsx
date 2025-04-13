"use client";

import axios from "axios";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AddJobForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const jobTitle = form.jobTitle.value.trim();
    const companyName = form.companyName.value.trim();
    const location = form.location.value.trim();
    const jobType = form.jobType.value;
    const jobCategory = form.category.value;
    const minSalary = parseInt(form.minSalary.value) || 0;
    const maxSalary = parseInt(form.maxSalary.value) || 0;
    const currency = form.currency.value;
    const description = form.jobDetails.value.trim();
    const requirements = form.requirements.value.trim();
    const skills = form.skills.value.trim();
    const contactEmail = form.contactEmail.value.trim();
    const contactPhone = form.contactPhone.value.trim();
    const postDate = new Date().toISOString(); // ISO format
    const deadline = new Date(form.deadline.value).toISOString();

    const jobData = {
      jobTitle,
      companyName,
      location,
      jobType,
      jobCategory,
      minSalary,
      maxSalary,
      currency,
      description,
      skills,
      requirements,
      contactEmail,
      contactPhone,
      postDate,
      deadline,
    };

    try {
      const res = await axios.post("/api/postJob", jobData);
      if (res.status === 201) {
        form.reset();
        document.getElementById("my_modal_5").close();
        Swal.fire("Job Posted Successfully!", "", "success");
      } else {
        toast.error("Failed to post job. Please try again.");
      }
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-center text-teal-600">
        Post a Job
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Job Title & Company */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            className="py-2 px-3 border border-teal-300 focus:outline-teal-600 focus:ring-2 focus:ring-teal-600 rounded-lg w-full"
            required
          />
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            className="py-2 px-3 border border-teal-300 focus:outline-teal-600 focus:ring-2 focus:ring-teal-600 rounded-lg w-full"
            required
          />
        </div>

        {/* Location & Job Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="py-2 px-3 border border-teal-300 focus:outline-teal-600 focus:ring-2 focus:ring-teal-600 rounded-lg w-full"
            required
          />
          <div>
            <select
              name="jobType"
              className="py-2 px-3 border border-teal-300 focus:outline-teal-600 focus:ring-2 focus:ring-teal-600 rounded-lg w-full"
              required
            >
              <option value="">Select Job Type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Remote">Remote</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>

        {/* Salary Range & Currency */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="number"
            name="minSalary"
            placeholder="Min Salary ($)"
            className="py-2 px-3 border border-teal-300 focus:outline-teal-600 focus:ring-2 focus:ring-teal-600 rounded-lg w-full"
          />
          <input
            type="number"
            name="maxSalary"
            placeholder="Max Salary ($)"
            className="py-2 px-3 border border-teal-300 focus:outline-teal-600 focus:ring-2 focus:ring-teal-600 rounded-lg w-full"
          />
          <select
            name="currency"
            className="py-2 px-3 border border-teal-300 focus:outline-teal-600 focus:ring-2 focus:ring-teal-600 rounded-lg w-full"
          >
            <option value="USD">$ USD</option>
            <option value="BDT">৳ BDT</option>
            <option value="EUR">€ EUR</option>
            <option value="GBP">£ GBP</option>
            <option value="INR">₹ INR</option>
          </select>
        </div>

        {/* Job Details & Required Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <textarea
            name="jobDetails"
            placeholder="Job Description"
            className="py-2 px-3 border border-teal-300 focus:outline-teal-600 focus:ring-2 focus:ring-teal-600 rounded-lg w-full"
            required
          ></textarea>
          <textarea
            name="skills"
            placeholder="Required Skills"
            className="py-2 px-3 border border-teal-300 focus:outline-teal-600 focus:ring-2 focus:ring-teal-600 rounded-lg w-full"
            required
          ></textarea>
        </div>
        {/* Application Deadline & Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="date"
            name="deadline"
            className="py-2 px-3 border border-teal-300 focus:outline-teal-600 focus:ring-2 focus:ring-teal-600 rounded-lg w-full placeholder:text-gray-400"
            required
          />
          <input
            type="email"
            name="contactEmail"
            placeholder="Contact Email"
            className="py-2 px-3 border border-teal-300 focus:outline-teal-600 focus:ring-2 focus:ring-teal-600 rounded-lg w-full"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="contactPhone"
            placeholder="Contact Phone"
            className="py-2 px-3 border border-teal-300 focus:outline-teal-600 focus:ring-2 focus:ring-teal-600 rounded-lg w-full"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            className="py-2 px-3 border border-teal-300 focus:outline-teal-600 focus:ring-2 focus:ring-teal-600 rounded-lg w-full"
          />
        </div>
        {/* Job Requirements */}
        <textarea
          name="requirements"
          placeholder="Job Requirements & Responsibilities"
          className="py-2 px-3 border border-teal-300 focus:outline-teal-600 focus:ring-2 focus:ring-teal-600 rounded-lg w-full"
          required
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn bg-teal-500 hover:bg-teal-600 rounded-xl text-white btn-lg w-full"
        >
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJobForm;
