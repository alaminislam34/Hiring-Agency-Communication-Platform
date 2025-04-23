"use client";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import Swal from "sweetalert2";

const ApplyButton = ({ job, modalId }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    candidateName: "",
    candidateEmail: "",
    resume: "",
    coverLetter: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const applicationData = {
      ...formData,
      jobId: job.id,
      jobTitle: job.jobTitle,
      companyName: job.jobDetails.companyName,
      jobType: job.jobDetails.jobType,
      deadline: job.jobDetails.deadline,
      jobDescription: job.jobDetails.jobDescription,
      jobRequirements: job.jobDetails.jobRequirements,
    };

    try {
      // 🔸 Get existing applications from localStorage
      const storedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];

      // 🔸 Check if already applied to this job
      const alreadyApplied = storedJobs.some(
        (appliedJob) => appliedJob.jobId === job.id
      );

      if (alreadyApplied) {
        Swal.fire({
          icon: "error",
          text: "You have already applied for this job.",
          timer: 2500,
        });
      } else {
        // 🔸 Save new application
        const updatedJobs = [...storedJobs, applicationData];
        localStorage.setItem("appliedJobs", JSON.stringify(updatedJobs));

        Swal.fire({
          icon: "success",
          title: "Application Submitted",
          text: "Your job application has been submitted successfully!",
        });

        setFormData({
          candidateName: "",
          candidateEmail: "",
          resume: "",
          coverLetter: "",
        });
      }
    } catch (err) {
      console.error("❌ Submission error:", err);
      Swal.fire({
        icon: "error",
        text: "Something went wrong. Please try again.",
        timer: 2500,
      });
    } finally {
      setLoading(false);
      document.getElementById(modalId).close();
    }
  };

  return (
    <div>
      <button
        onClick={() => document.getElementById(modalId).showModal()}
        className="text-sm btn px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded cursor-pointer"
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
                name="candidateName"
                value={formData.candidateName}
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
                name="candidateEmail"
                value={formData.candidateEmail}
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
                className={`bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 ${
                  loading ? "pointer-events-none" : "cursor-pointer"
                } btn`}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    Submitting
                    <ThreeDots
                      visible={true}
                      height="20"
                      width="20"
                      color="#fff"
                      radius="9"
                      ariaLabel="three-dots-loading"
                    />
                  </span>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ApplyButton;
