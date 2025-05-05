"use client";

import { useAppContext } from "@/Providers/AppProviders";
import axios from "axios";
import { useState, useRef } from "react";
import { ThreeDots } from "react-loader-spinner";
import Swal from "sweetalert2";

export default function ApplyButton({ job, modalId, alreadyApplied }) {
  console.log(job);
  const { currentUser, appliedJobsRefetch } = useAppContext();
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    candidateId: currentUser?._id || "",
    candidateName: "",
    candidateEmail: "",
    resume: "",
    coverLetter: "",
    experience: "",
    educationLevel: currentUser?.degreeTitle || "",
    candidateSkills: currentUser?.skills || "",
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
      jobId: job?._id?.toString() || null,
      title: job?.title,
      jobType: job?.type,
      deadline: job?.meta?.deadline,
      minSalary: job?.minSalary,
      maxSalary: job?.maxSalary,
      salaryType: job?.salaryType,
      category: job?.category,
      companyName: job?.meta?.companyName,
      postedById: job?.meta?.postedById,
      postedBy: job?.meta?.postedBy,
      appliedAt: new Date().toISOString(),
      status: "Applied",
    };

    try {
      if (currentUser?.role !== "jobSeeker") {
        return Swal.fire({
          icon: "warning",
          text: "Only job seekers can apply.",
        });
      }

      const res = await axios.post("/api/apply-job", applicationData);

      if (res?.status === 200) {
        appliedJobsRefetch();
        modalRef.current?.close();
        Swal.fire({
          text: res.data?.message || "Application submitted successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          background: "#D5F5F6",
        });
      }
    } catch (err) {
      console.error("❌ Error applying:", err.message);
      Swal.fire({
        icon: "error",
        text: "You have already applied for this job.",
        timer: 1500,
        background: "#D5F5F6",
        showConfirmButton: false,
      });
    } finally {
      appliedJobsRefetch();
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => modalRef.current?.showModal()}
        disabled={alreadyApplied}
        className={`text-sm btn px-4 py-2 rounded transition duration-300 ${
          alreadyApplied
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-white text-teal-500 hover:bg-teal-600 hover:text-white border border-teal-500 hover:shadow-lg"
        }`}
      >
        {alreadyApplied ? "Applied" : "Easy Apply"}
      </button>

      {/* Modal */}
      <dialog
        id={modalId}
        ref={modalRef}
        className="modal modal-middle my-auto"
      >
        <div className="modal-box bg-white shadow-lg rounded-lg p-6 w-full max-w-lg mx-auto">
          <h3 className="font-bold text-2xl text-teal-700 text-center mb-4">
            Apply for This Job
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { name: "candidateName", label: "Full Name", type: "text" },
              { name: "candidateEmail", label: "Email Address", type: "email" },
              { name: "experience", label: "Experience", type: "text" },
              {
                name: "educationLevel",
                label: "Education Level",
                type: "text",
              },
              { name: "candidateSkills", label: "Skills", type: "text" },
              { name: "resume", label: "Resume Link", type: "url" },
            ].map(({ name, label, type }) => (
              <div key={name}>
                <label className="form-label">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder={`Enter your ${label.toLowerCase()}`}
                />
              </div>
            ))}

            {/* Cover Letter */}
            <div>
              <label className="form-label">Cover Letter</label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows={4}
                className="form-input"
                placeholder="Write your cover letter"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
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
                    <ThreeDots height="20" width="20" color="#fff" />
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
