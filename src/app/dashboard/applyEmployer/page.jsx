"use client";

import { useAppContext } from "@/Providers/AppProviders";
import axios from "axios";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function ApplyForEmployer() {
  const [step, setStep] = useState(1);
  const { currentUser } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || "John Doe",
    email: currentUser?.email,
    phone: "+8801XXXXXXXXX",
    companyName: "",
    companyType: "",
    website: "",
    role: "",
    reason: "",
    experience: "",
    linkedin: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Send formData to backend here
    const application = { ...formData };
    try {
      const res = await axios.post("/api/applyForEmployer", application);
      if (res.data) {
        Swal.fire("Success", "Application submitted successfully", "success");
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg max-w-3xl mx-auto">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-teal-700 text-center mb-6">
        {step === 1 ? "Your Basic Information" : "Apply to Become an Employer"}
      </h2>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-teal-700 font-medium mb-1">
                Full Name
              </label>
              <input
                required
                type="text"
                name="name"
                defaultValue={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div>
              <label className="block text-teal-700 font-medium mb-1">
                Email (not editable)
              </label>
              <input
                type="email"
                name="email"
                defaultValue={formData?.email}
                readOnly
                disabled
                className="w-full px-4 py-2 border pointer-events-none border-gray-200 bg-gray-100 rounded-md cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-teal-700 font-medium mb-1">
                Phone Number
              </label>
              <input
                required
                type="text"
                name="phone"
                defaultValue={formData?.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div>
              <button
                type="button"
                onClick={handleNext}
                className="mt-4 bg-teal-600 cursor-pointer text-white px-6 py-2 rounded-md hover:bg-teal-700 transition"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-teal-700 font-medium mb-1">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div>
              <label className="block text-teal-700 font-medium mb-1">
                Company Type
              </label>
              <select
                name="companyType"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <option value="">Select type</option>
                <option value="Software">Software</option>
                <option value="Agency">Agency</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Startup">Startup</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-teal-700 font-medium mb-1">
                Company Website
              </label>
              <input
                type="url"
                name="website"
                required
                onChange={handleChange}
                placeholder="https://yourcompany.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div>
              <label className="block text-teal-700 font-medium mb-1">
                Your Role in Company
              </label>
              <input
                type="text"
                name="role"
                required
                onChange={handleChange}
                placeholder="e.g. HR Manager, CTO"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div>
              <label className="block text-teal-700 font-medium mb-1">
                Why do you want to become an employer?
              </label>
              <textarea
                name="reason"
                required
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              ></textarea>
            </div>

            <div>
              <label className="block text-teal-700 font-medium mb-1">
                Do you have previous hiring experience?
              </label>
              <div className="flex gap-4 mt-2">
                <label>
                  <input
                    type="radio"
                    name="experience"
                    value="yes"
                    onChange={handleChange}
                    required
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="experience"
                    value="no"
                    onChange={handleChange}
                    required
                  />{" "}
                  No
                </label>
              </div>
            </div>

            <div>
              <label className="block text-teal-700 font-medium mb-1">
                LinkedIn Profile (optional)
              </label>
              <input
                type="url"
                name="linkedin"
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div>
              <label className="block text-teal-700 font-medium mb-1">
                Your Location / Timezone (optional)
              </label>
              <input
                type="text"
                name="location"
                onChange={handleChange}
                placeholder="e.g. Dhaka, Bangladesh"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="mt-4 bg-teal-600 cursor-pointer text-white px-6 py-2 rounded-md hover:bg-teal-700 transition"
              >
                Back
              </button>
              <button
                type="submit"
                className={`${
                  loading ? "pointer-events-none " : ""
                } mt-4 bg-teal-600 cursor-pointer text-white px-6 py-2 rounded-md hover:bg-teal-700 transition`}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    Submitting{" "}
                    <ThreeDots
                      visible={true}
                      height="20"
                      width="20"
                      color="#fff"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
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
  );
}
