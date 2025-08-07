"use client";

import { useState } from "react";
import CommonTitleOrEditBtn from "./CommonTitleOrEditBtn";
import { useAppContext } from "@/Providers/AppProviders";
import axios from "axios";
import Swal from "sweetalert2";

const CompanyDetails = () => {
  const [loading, setLoading] = useState(false);
  const { isEditingInfo, setIsEditingInfo, currentUser, userRefetch } =
    useAppContext();

  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    companyWebsite: "",
    companyEmail: "",
    companyLogo: "",
    companyPhone: "",
    companySize: "",
    companyLocation: "",
    companyDescription: "",
  });

  const handleChange = (field, value) => {
    setCompanyInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCompanyUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/updateProfile", companyInfo);
      if (res.data.modifiedCount > 0) {
        userRefetch();
        setIsEditingInfo("");
        Swal.fire("Success", "Company details updated successfully", "success");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <CommonTitleOrEditBtn title="Company Details" showEdit="company" />

      {isEditingInfo === "company" ? (
        <form
          onSubmit={handleCompanyUpdate}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"
        >
          {/* Company Name */}
          <label className="flex flex-col gap-2">
            <span className="text-gray-500">Company Name</span>
            <input
              type="text"
              placeholder="Company Name"
              className="border border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-teal-500 p-2 rounded-lg"
              value={companyInfo.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              required
            />
          </label>

          {/* Company Website */}
          <label className="flex flex-col gap-2">
            <span className="text-gray-500">Company Website</span>
            <input
              type="url"
              placeholder="https://example.com"
              className="border border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-teal-500 p-2 rounded-lg"
              value={companyInfo.companyWebsite}
              onChange={(e) => handleChange("companyWebsite", e.target.value)}
              required
            />
          </label>

          {/* Company Email */}
          <label className="flex flex-col gap-2">
            <span className="text-gray-500">Company Email</span>
            <input
              type="email"
              placeholder="email@example.com"
              className="border border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-teal-500 p-2 rounded-lg"
              value={companyInfo.companyEmail}
              onChange={(e) => handleChange("companyEmail", e.target.value)}
              required
            />
          </label>

          {/* Company Logo URL */}
          <label className="flex flex-col gap-2">
            <span className="text-gray-500">Company Logo URL</span>
            <input
              type="url"
              placeholder="Logo Image URL"
              className="border border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-teal-500 p-2 rounded-lg"
              value={companyInfo.companyLogo}
              onChange={(e) => handleChange("companyLogo", e.target.value)}
              required
            />
          </label>

          {/* Company Phone */}
          <label className="flex flex-col gap-2">
            <span className="text-gray-500">Company Phone</span>
            <input
              type="text"
              placeholder="+880 1234-567890"
              className="border border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-teal-500 p-2 rounded-lg"
              value={companyInfo.companyPhone}
              onChange={(e) => handleChange("companyPhone", e.target.value)}
              required
            />
          </label>

          {/* Company Size */}
          <label className="flex flex-col gap-2">
            <span className="text-gray-500">Company Size</span>
            <input
              type="text"
              placeholder="e.g. 50-100 Employees"
              className="border border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-teal-500 p-2 rounded-lg"
              value={companyInfo.companySize}
              onChange={(e) => handleChange("companySize", e.target.value)}
              required
            />
          </label>

          {/* Company Location */}
          <label className="flex flex-col gap-2">
            <span className="text-gray-500">Company Location</span>
            <input
              type="text"
              placeholder="e.g. Dhaka, Bangladesh"
              className="border border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-teal-500 p-2 rounded-lg"
              value={companyInfo.companyLocation}
              onChange={(e) => handleChange("companyLocation", e.target.value)}
              required
            />
          </label>

          {/* Company Description */}
          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="text-gray-500">Company Description</span>
            <textarea
              placeholder="Write about the company..."
              rows={5}
              maxLength={500}
              className="border border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-teal-500 p-2 rounded-lg"
              value={companyInfo.companyDescription}
              onChange={(e) =>
                handleChange("companyDescription", e.target.value)
              }
              required
            ></textarea>
          </label>

          {/* Submit Button */}
          <div className="col-span-full flex justify-end">
            <button
              type="submit"
              className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 btn"
            >
              {loading ? "Saving..." : "Save Company Details"}
            </button>
          </div>
        </form>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-x-6">
          {[
            { label: "Company Name", value: currentUser?.companyName },
            { label: "Company Website", value: currentUser?.companyWebsite },
            { label: "Company Email", value: currentUser?.companyEmail },
            { label: "Company Logo", value: currentUser?.companyLogo },
            { label: "Company Phone", value: currentUser?.companyPhone },
            { label: "Company Size", value: currentUser?.companySize },
            { label: "Company Location", value: currentUser?.companyLocation },
            {
              label: "Company Description",
              value: currentUser?.companyDescription,
            },
          ].map((item, idx) => (
            <li key={idx} className="flex flex-col gap-2 overflow-hidden">
              <p className="text-gray-500">{item.label}</p>
              <p className="md:text-lg">{item.value || "Not Provided"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompanyDetails;
