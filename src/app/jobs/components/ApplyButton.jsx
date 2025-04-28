"use client";

import { useAppContext } from "@/Providers/AppProviders";
import axios from "axios";
import { useState, useRef } from "react";
import { ThreeDots } from "react-loader-spinner";
import Swal from "sweetalert2";

export default function ApplyButton({ job, modalId, alreadyApplied }) {
  console.log("job data in apply button", job);
  const { currentUser, appliedJobsRefetch } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    candidateId: currentUser?._id,
    candidateName: "",
    candidateEmail: "",
    resume: "",
    coverLetter: "",
    experience: "",
    educationLevel: currentUser?.degreeTitle || "",
    candidateSkills: currentUser?.skills || "",
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
      jobId: job?._id.toString() || null,
      title: job.title,
      jobType: job.type,
      deadline: job.meta.deadline,
      minSalary: job.minSalary,
      maxSalary: job.maxSalary,
      salaryType: job.salaryType,
      category: job.category,
      companyName: job.meta.companyName,
      postedById: job.meta.postedById,
      postedBy: job.meta.postedBy,
      appliedAt: new Date().toISOString(),
      status: "Applied",
    };

    try {
      const res = await axios.post("/api/apply-job", applicationData);
      if (res?.status === 200) {
        modalRef.current?.close();
        appliedJobsRefetch();
        setTimeout(() => {
          Swal.fire({
            text: res.data?.message || "Application submitted successfully.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            width: "300px",
            background: "#D5F5F6",
            animation: true,
          });
        }, 100);
      }
    } catch (err) {
      console.error("❌ Submission error:", err);
      modalRef.current?.close();
      Swal.fire({
        icon: "error",
        text: "You have already apply this job.",
        timer: 1500,
        showCloseButton: false,
        width: "300px",
        background: "#D5F5F6",
        animation: true,
      });
    } finally {
      appliedJobsRefetch();
      setLoading(false);
    }
  };

  // -------- UI --------
  return (
    <div>
      <button
        onClick={() => modalRef.current?.showModal()}
        disabled={alreadyApplied}
        className={`text-sm btn px-4 py-2 rounded  ${
          alreadyApplied
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "hover:bg-teal-600 bg-white text-teal-500 hover:text-white border border-teal-500 hover:-translate-y-1 duration-300 transition ease-in-out hover:scale-105 hover:shadow-teal-300 hover:shadow-lg"
        }`}
      >
        {alreadyApplied ? "Applied" : "Easy Apply"}
      </button>

      {/* Modal */}
      <dialog
        id={modalId}
        ref={modalRef}
        className="modal modal-bottom my-auto"
      >
        <div className="modal-box bg-white shadow-lg rounded-lg p-6 w-10/12 md:w-8/12 lg:w-6/12 mx-auto my-auto">
          <h3 className="font-bold text-2xl text-teal-700 text-center mb-4">
            Apply for This Job
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="candidateName"
                value={formData.candidateName}
                placeholder="Enter your full name"
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            {/* Email */}
            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="candidateEmail"
                placeholder="Enter your email address"
                value={formData.candidateEmail}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div>
              {/* experience */}
              <label className="form-label">Experience</label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                placeholder="Enter your experience"
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div>
              {/* education level */}
              <label className="form-label">Education Level</label>
              <input
                type="text"
                name="degreeTitle"
                placeholder="Enter your degree title"
                value={formData.degreeTitle}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div>
              {/* skills */}
              <label className="form-label">Skills</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                placeholder="Enter your skills"
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            {/* Resume */}
            <div>
              <label className="form-label">
                Resume Link (Google Drive, etc.)
              </label>
              <input
                type="url"
                name="resume"
                value={formData.resume}
                onChange={handleChange}
                required
                placeholder="https://drive.google.com/..."
                className="form-input"
              />
            </div>

            {/* Cover letter */}
            <div>
              <label className="form-label">Cover Letter</label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                placeholder="Enter your cover letter"
                onChange={handleChange}
                rows={4}
                className="form-input"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 cursor-pointer"
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
