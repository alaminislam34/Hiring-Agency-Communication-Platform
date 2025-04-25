"use client";

import axios from "axios";
import { useState, useRef } from "react";
import { ThreeDots } from "react-loader-spinner";
import Swal from "sweetalert2";

export default function ApplyButton({ job, modalId, alreadyApplied }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    candidateName: "",
    candidateEmail: "",
    resume: "",
    coverLetter: "",
  });

  const modalRef = useRef(null);

  // -------- handlers --------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const applicationData = {
      ...formData,
      jobId: job._id,
      title: job.title,
      jobType: job.type,
      deadline: job.meta.deadline,
      salary: job.salary,
      category: job.details.category,
      company: job.company,
      status: "Applied",
    };

    try {
      const res = await axios.post("/api/apply-job", applicationData);
      if (res?.status === 200) {
        // ✅ First close modal
        modalRef.current?.close();

        // ✅ Then show Swal
        setTimeout(() => {
          Swal.fire({
            title: "Success!",
            text: res.data?.message || "Application submitted successfully.",
            icon: "success",
            showConfirmButton: false,
            timer: 2500,
            width: "300px",
          });
        }, 100); // small delay so modal closes first
      }
    } catch (err) {
      console.error("❌ Submission error:", err);
      Swal.fire({
        icon: "error",
        text: "Something went wrong. Please try again.",
        timer: 2500,
        showCloseButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  // -------- UI --------
  return (
    <div>
      <button
        onClick={() => modalRef.current?.showModal()}
        disabled={alreadyApplied}
        className={`text-sm btn px-4 py-2 rounded ${
          alreadyApplied
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-teal-600 hover:bg-teal-700 text-white"
        }`}
      >
        {alreadyApplied ? "Applied" : "Easy Apply"}
      </button>

      {/* Modal */}
      <dialog
        id={modalId}
        ref={modalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto">
          <h3 className="font-bold text-2xl text-gray-800 mb-4">
            Apply for This Job
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
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

            {/* Email */}
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

            {/* Resume */}
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

            {/* Cover letter */}
            <div>
              <label className="block text-sm text-gray-600">
                Cover Letter
              </label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-300"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                onClick={() => modalRef.current?.close()}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded-lg btn ${
                  loading
                    ? "bg-teal-400 cursor-not-allowed text-gray-600"
                    : "bg-teal-600 hover:bg-teal-700 text-white"
                }`}
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
}
