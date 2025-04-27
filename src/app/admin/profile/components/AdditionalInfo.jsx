"use client";

import { useAppContext } from "@/Providers/AppProviders";
import { useState, useEffect } from "react";
import CommonTitleOrEditBtn from "./CommonTitleOrEditBtn";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const AdditionalInfo = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser, isEditingInfo, setIsEditingInfo, userRefetch } =
    useAppContext();

  const [additionalInfo, setAdditionalInfo] = useState({
    skills: "",
    phone: "",
    presentAddress: "",
    permanentAddress: "",
    country: "",
    city: "",
  });

  // populate form from currentUser
  useEffect(() => {
    if (currentUser) {
      setAdditionalInfo({
        skills: currentUser.skills || "",
        phone: currentUser.phone || "",
        presentAddress: currentUser.presentAddress || "",
        permanentAddress: currentUser.permanentAddress || "",
        country: currentUser.country || "",
        city: currentUser.city || "",
      });
    }
  }, [currentUser]);

  // handle input change
  const handleChange = (field, value) => {
    setAdditionalInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // handle form submit
  const handleAdditionalUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/updateProfile", additionalInfo);
      if (res.data.modifiedCount > 0) {
        toast.success({
          message: "Profile updated successfully",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        userRefetch();
        setAdditionalInfo(null);
        setIsEditingInfo(false);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <CommonTitleOrEditBtn title="Additional Info" showEdit="additional" />

      {isEditingInfo === "additional" ? (
        <form
          onSubmit={handleAdditionalUpdate}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-x-6"
        >
          <label htmlFor="skills" className="flex flex-col gap-2">
            <span className="text-gray-500">Skills</span>
            {/* Skills */}
            <input
              type="text"
              placeholder="Skills (comma separated)"
              className="p-2 border border-teal-500 rounded-lg focus:outline-teal-500 focus:ring-2 focus:ring-teal-500"
              value={additionalInfo.skills}
              onChange={(e) => handleChange("skills", e.target.value)}
              required
            />
          </label>
          <label htmlFor="phone" className="flex flex-col gap-2">
            <span className="text-gray-500">Phone</span>
            {/* Phone */}
            <input
              type="text"
              placeholder="Phone"
              className="p-2 border border-teal-500 rounded-lg focus:outline-teal-500 focus:ring-2 focus:ring-teal-500"
              value={additionalInfo.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              required
            />
          </label>

          <label htmlFor="presentAddress" className="flex flex-col gap-2">
            <span className="text-gray-500">Present Address</span>
            {/* Present Address */}
            <input
              type="text"
              placeholder="Present Address"
              className="p-2 border border-teal-500 rounded-lg focus:outline-teal-500 focus:ring-2 focus:ring-teal-500"
              value={additionalInfo.presentAddress}
              onChange={(e) => handleChange("presentAddress", e.target.value)}
              required
            />
          </label>

          <label htmlFor="permanentAddress" className="flex flex-col gap-2">
            <span className="text-gray-500">Permanent Address</span>
            {/* Permanent Address */}
            <input
              type="text"
              placeholder="Permanent Address"
              className="p-2 border border-teal-500 rounded-lg focus:outline-teal-500 focus:ring-2 focus:ring-teal-500"
              value={additionalInfo.permanentAddress}
              onChange={(e) => handleChange("permanentAddress", e.target.value)}
              required
            />
          </label>

          <label htmlFor="country" className="flex flex-col gap-2">
            <span className="text-gray-500">Country</span>
            {/* Country */}
            <input
              type="text"
              placeholder="Country"
              className="p-2 border border-teal-500 rounded-lg focus:outline-teal-500 focus:ring-2 focus:ring-teal-500"
              value={additionalInfo.country}
              onChange={(e) => handleChange("country", e.target.value)}
              required
            />
          </label>

          <label htmlFor="city" className="flex flex-col gap-2">
            <span className="text-gray-500">City</span>
            {/* City */}
            <input
              type="text"
              placeholder="City"
              className="p-2 border border-teal-500 rounded-lg focus:outline-teal-500 focus:ring-2 focus:ring-teal-500"
              value={additionalInfo.city}
              onChange={(e) => handleChange("city", e.target.value)}
              required
            />
          </label>

          <div className="col-span-full">
            <button
              type="submit"
              disabled={loading}
              className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 cursor-pointer"
            >
              {loading ? "Saving..." : "Save Additional Info"}
            </button>
          </div>
        </form>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="flex flex-col gap-2">
            <span className="text-gray-500">Skills</span>
            {currentUser?.skills || "N/A"}
          </li>
          <li className="flex flex-col gap-2">
            <span className="text-gray-500">Phone</span>
            {currentUser?.phone || "N/A"}
          </li>
          <li className="flex flex-col gap-2">
            <span className="text-gray-500">Present Address</span>
            {currentUser?.presentAddress || "N/A"}
          </li>
          <li className="flex flex-col gap-2">
            <span className="text-gray-500">Permanent Address</span>
            {currentUser?.permanentAddress || "N/A"}
          </li>
          <li className="flex flex-col gap-2">
            <span className="text-gray-500">Country</span>
            {currentUser?.country || "N/A"}
          </li>
          <li className="flex flex-col gap-2">
            <span className="text-gray-500">City</span>
            {currentUser?.city || "N/A"}
          </li>
        </ul>
      )}
    </div>
  );
};

export default AdditionalInfo;
