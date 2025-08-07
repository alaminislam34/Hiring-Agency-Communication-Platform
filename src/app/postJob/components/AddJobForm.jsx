"use client";

import { useAppContext } from "@/Providers/AppProviders";
import axios from "axios";
import { useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function AddJobForm() {
  const { currentUser, refetchJobs } = useAppContext();
  const [loading, setLoading] = useState(false);

  // 👉 modal ref
  const modalRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;

    // ----- gather form data -----
    const jobData = {
      jobTitle: form.jobTitle.value.trim(),
      companyName: form.companyName.value.trim(),
      location: form.location.value.trim(),
      jobType: form.jobType.value,
      jobCategory: form.category.value,
      minSalary: parseInt(form.minSalary.value) || 0,
      maxSalary: parseInt(form.maxSalary.value) || 0,
      currency: form.currency.value,
      description: form.jobDetails.value.trim(),
      skills: form.skills.value.trim(),
      requirements: form.requirements.value.trim(),
      contactEmail: form.contactEmail.value.trim(),
      contactPhone: form.contactPhone.value.trim(),
      postDate: new Date().toISOString(),
      deadline: new Date(form.deadline.value).toISOString(),
      employerEmail: currentUser?.email,
    };

    try {
      const res = await axios.post("/api/postJob", jobData);

      if (res.status === 201) {
        // optional server notification
        await axios.post("http://localhost:3002/api/notify-job-post", {
          jobTitle: jobData.jobTitle,
          companyName: jobData.companyName,
          postDate: jobData.postDate,
        });

        refetchJobs();
        form.reset();
        modalRef.current?.close(); // 🔒 uses ref, safe in browser
        await Swal.fire("Job Posted Successfully!", "", "success");
      } else {
        toast.error("Failed to post job. Please try again.");
      }
    } catch (err) {
      console.error("Error posting job:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-center text-teal-600">
        Post a Job
      </h2>

      {/* modal trigger */}
      <button
        onClick={() => modalRef.current?.showModal()}
        className="btn bg-teal-500 hover:bg-teal-600 text-white mb-4"
      >
        Add Job
      </button>

      {/* modal */}
      <dialog
        id="my_modal_5"
        ref={modalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto">
          <h3 className="font-bold text-2xl text-gray-800 mb-6 text-center">
            Job Details
          </h3>

          {/* ---------- FORM ---------- */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Job Title & Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="jobTitle"
                placeholder="Job Title"
                required
                className="py-2 px-3 border border-teal-500/50 rounded-md w-full"
              />
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                required
                className="py-2 px-3 border border-teal-500/50 rounded-md w-full"
              />
            </div>

            {/* Location & Job Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="location"
                placeholder="Location"
                required
                className="py-2 px-3 border border-teal-500/50 rounded-md w-full"
              />
              <select
                name="jobType"
                required
                className="py-2 px-3 border border-teal-500/50 rounded-md w-full"
              >
                <option value="">Select Job Type</option>
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Remote</option>
                <option>Internship</option>
              </select>
            </div>

            {/* Salary Range & Currency */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="number"
                name="minSalary"
                placeholder="Min Salary"
                className="py-2 px-3 border border-teal-500/50 rounded-md w-full"
              />
              <input
                type="number"
                name="maxSalary"
                placeholder="Max Salary"
                className="py-2 px-3 border border-teal-500/50 rounded-md w-full"
              />
              <select
                name="currency"
                className="py-2 px-3 border border-teal-500/50 rounded-md w-full"
              >
                <option value="USD">$ USD</option>
                <option value="BDT">৳ BDT</option>
                <option value="EUR">€ EUR</option>
                <option value="GBP">£ GBP</option>
                <option value="INR">₹ INR</option>
              </select>
            </div>

            {/* Description & Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <textarea
                name="jobDetails"
                placeholder="Job Description"
                required
                className="py-2 px-3 border border-teal-500/50 rounded-md w-full"
              ></textarea>
              <textarea
                name="skills"
                placeholder="Required Skills"
                required
                className="py-2 px-3 border border-teal-500/50 rounded-md w-full"
              ></textarea>
            </div>

            {/* Deadline & Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                name="deadline"
                required
                className="py-2 px-3 border border-teal-500/50 rounded-md w-full"
              />
              <input
                type="email"
                name="contactEmail"
                placeholder="Contact Email"
                required
                className="py-2 px-3 border border-teal-500/50 rounded-md w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="contactPhone"
                placeholder="Contact Phone"
                required
                className="py-2 px-3 border border-teal-500/50 rounded-md w-full"
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                className="py-2 px-3 border border-teal-500/50 rounded-md w-full"
              />
            </div>

            {/* Requirements */}
            <textarea
              name="requirements"
              placeholder="Job Requirements & Responsibilities"
              required
              className="py-2 px-3 border border-teal-500/50 rounded-md w-full"
            ></textarea>

            {/* Submit */}
            <button
              type="submit"
              className={`btn bg-teal-500 hover:bg-teal-600 text-white w-full ${
                loading ? "pointer-events-none" : "cursor-pointer"
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  Adding
                  <ThreeDots
                    height="20"
                    width="20"
                    radius="9"
                    color="#fff"
                    ariaLabel="three-dots-loading"
                    visible={true}
                  />
                </span>
              ) : (
                "Add Job"
              )}
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}
