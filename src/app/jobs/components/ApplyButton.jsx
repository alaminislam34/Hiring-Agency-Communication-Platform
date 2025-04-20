"use client";
import { useState } from "react";
import Swal from "sweetalert2";

const ApplyButton = ({ job, modalId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: "",
    coverLetter: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const applicationData = {
      ...formData,
      jobId: job._id.toString(),
      jobTitle: job.jobTitle,
      companyName: job.companyName,
      location: job.location,
      jobType: job.jobType,
      postDate: job.postDate,
      deadline: job.deadline,
      description: job.description,
      skills: job.skills,
      requirements: job.requirements,
    };

    try {
      const res = await fetch("/api/apply-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      const result = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted",
          text: "Your job application has been submitted successfully!",
        });
        setFormData({
          name: "",
          email: "",
          resume: "",
          coverLetter: "",
        });
        document.getElementById(modalId).close();
      } else {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: result.error || "Failed to submit application",
        });
      }
    } catch (err) {
      console.error("Submission error:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while submitting your application.",
      });
    }
  };

  return (
    <div>
      <button
        onClick={() => document.getElementById(modalId).showModal()}
        className="text-sm px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded cursor-pointer"
      >
        Easy Apply
      </button>

      <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto">
          <h3 className="font-bold text-2xl text-gray-800 mb-4">
            Apply for This Job
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600">
                Resume Link (Google Drive, etc.)
              </label>
              <input
                type="url"
                name="resume"
                value={formData.resume}
                onChange={handleChange}
                required
                placeholder="https://drive.google.com/..."
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600">
                Cover Letter
              </label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-300"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 cursor-pointer"
                onClick={() => document.getElementById(modalId).close()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ApplyButton;
