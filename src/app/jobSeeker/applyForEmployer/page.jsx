"use client";

import { useAppContext } from "@/Providers/AppProviders";
import axios from "axios";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function ApplyForEmployer() {
  const [step, setStep] = useState(1);
  const { currentUser } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    companyName: "",
    companyType: "",
    website: "",
    role: "",
    reason: "",
    experience: "",
    linkedin: "",
    location: currentUser?.location || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    // basic validation
    if (!formData.name || !formData.phone) {
      toast.warn("Please fill in your name and phone number", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        style: { backgroundColor: "#014451", color: "#fff" },
      });
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/applyForEmployer", formData);
      if (res?.data?.success) {
        Swal.fire(
          "Application Submitted",
          "We'll review and contact you soon.",
          "success"
        );
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error("You have already applied for this role.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[400px] flex justify-center items-center">
      <div className="p-6 bg-white rounded-2xl shadow-lg max-w-3xl mx-auto w-full">
        <h2 className="text-2xl md:text-3xl font-semibold text-teal-700 text-center mb-6">
          {step === 1 ? "Step 1: Basic Info" : "Step 2: Employer Application"}
        </h2>

        <form onSubmit={handleSubmit} className="w-full">
          {step === 1 && (
            <div className="grid grid-cols-1 w-full gap-4">
              {/* Name */}
              <input
                type="text"
                name="name"
                required
                placeholder="Your Full Name"
                value={formData.name}
                onChange={handleChange}
                className="input w-full"
              />

              {/* Email (readonly) */}
              <input
                type="email"
                name="email"
                value={currentUser?.email}
                readOnly
                className="input w-full"
              />

              {/* Phone */}
              <input
                type="number"
                name="phone"
                required
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="input w-full"
              />

              <button
                type="button"
                onClick={handleNext}
                className="bg-teal-600 text-white cursor-pointer btn"
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="companyName"
                required
                placeholder="Company Name"
                onChange={handleChange}
                className="input w-full"
              />

              <select
                name="companyType"
                required
                onChange={handleChange}
                className="input w-full"
              >
                <option value="">Select Company Type</option>
                <option value="Software">Software</option>
                <option value="Agency">Agency</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Startup">Startup</option>
                <option value="Other">Other</option>
              </select>

              <input
                type="url"
                name="website"
                required
                placeholder="Company Website"
                onChange={handleChange}
                className="input w-full"
              />

              <input
                type="text"
                name="role"
                required
                placeholder="Your Role (e.g. HR Manager)"
                onChange={handleChange}
                className="input w-full"
              />

              <textarea
                name="reason"
                required
                placeholder="Why do you want to become an employer?"
                rows="3"
                onChange={handleChange}
                className="input w-full"
              ></textarea>

              <div>
                <p className="text-teal-700 font-medium mb-1">
                  Hiring Experience?
                </p>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="experience"
                    value="yes"
                    required
                    onChange={handleChange}
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="experience"
                    value="no"
                    required
                    onChange={handleChange}
                  />{" "}
                  No
                </label>
              </div>

              <input
                type="url"
                name="linkedin"
                placeholder="LinkedIn Profile (optional)"
                onChange={handleChange}
                className="input w-full"
              />

              <input
                type="text"
                name="location"
                placeholder="Your Location / Timezone (optional)"
                onChange={handleChange}
                className="input w-full"
              />

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn bg-transparent border border-gray-500"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className={`btn bg-teal-600 hover:bg-teal-700 text-white ${
                    loading ? "pointer-events-none" : ""
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      Submitting{" "}
                      <ThreeDots height="18" width="18" color="#fff" />
                    </span>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}

// Utility classes for cleaner code
const inputClass =
  "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400";
const btnPrimary =
  "mt-4 bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition";
const btnSecondary =
  "mt-4 bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition";
