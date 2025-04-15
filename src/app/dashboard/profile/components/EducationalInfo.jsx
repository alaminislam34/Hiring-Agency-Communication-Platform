"use client";

import { useAppContext } from "@/Providers/AppProviders";
import { useState, useEffect } from "react";
import CommonTitleOrEditBtn from "./CommonTitleOrEditBtn";
import axios from "axios";
import Swal from "sweetalert2";

// Dummy currentUser fallback for safety (replace this with your actual user context or props)
const defaultUser = {
  educationLevel: "",
  degreeTitle: "",
  institution: "",
  passingYear: "",
};

const EducationalInfo = () => {
  const { isEditingInfo, setIsEditingInfo, userRefetch, currentUser } =
    useAppContext();
  const [loading, setLoading] = useState(false);

  const [educationInfo, setEducationInfo] = useState({
    educationLevel: "",
    degreeTitle: "",
    institution: "",
    passingYear: "",
  });

  useEffect(() => {
    // Load user data safely when component mounts
    if (currentUser) {
      setEducationInfo({
        educationLevel: currentUser.educationLevel || "",
        degreeTitle: currentUser.degreeTitle || "",
        institution: currentUser.institution || "",
        passingYear: currentUser.passingYear || "",
      });
    }
  }, [currentUser]);

  const handleEducationUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/updateProfile", educationInfo);
      if (res.data.modifiedCount > 0) {
        userRefetch();
        setIsEditingInfo(false);
        Swal.fire("Success", "Profile updated successfully", "success");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setEducationInfo((prev) => ({ ...prev, [field]: value }));
  };

  const getPassingYearText = () => {
    if (!currentUser?.passingYear) return "N/A";
    const year = parseInt(currentUser?.passingYear);
    if (
      currentUser?.passingYear.toLowerCase().includes("completed") ||
      (!isNaN(year) && year <= new Date().getFullYear())
    ) {
      return "Graduation Completed";
    }
    return currentUser?.passingYear;
  };

  return (
    <div>
      <div className="space-y-4">
        <CommonTitleOrEditBtn
          title={"Educational Info"}
          showEdit={"education"}
        />

        {isEditingInfo === "education" ? (
          <form
            onSubmit={handleEducationUpdate}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-x-6"
          >
            {/* Education Level */}
            <label htmlFor="degreeTitle" className="flex flex-col gap-2">
              <span className="text-gray-500">Education Level</span>
              <select
                className="border border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-teal-500 p-2 rounded-lg"
                value={educationInfo.educationLevel}
                onChange={(e) => handleChange("educationLevel", e.target.value)}
              >
                <option value="">Select Education Level</option>
                <option value="Secondary">Secondary</option>
                <option value="Higher Secondary">Higher Secondary</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor/Honours">Bachelor/Honours</option>
                <option value="Masters">Masters</option>
                <option value="PhD (Doctor of Philosophy)">
                  PhD (Doctor of Philosophy)
                </option>
              </select>
            </label>
            {/* Degree Title */}
            <label htmlFor="degreeTitle" className="flex flex-col gap-2">
              <span className="text-gray-500">Degree Title</span>
              <input
                type="text"
                placeholder="Exam or Degree Title"
                className="border border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-teal-500 p-2 rounded-lg"
                value={educationInfo.degreeTitle}
                onChange={(e) => handleChange("degreeTitle", e.target.value)}
              />
            </label>
            {/* Institution */}
            <label htmlFor="institution" className="flex flex-col gap-2">
              <span className="text-gray-500">Institution</span>
              <input
                type="text"
                placeholder="Institution Name"
                className="border border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-teal-500 p-2 rounded-lg"
                value={educationInfo.institution}
                onChange={(e) => handleChange("institution", e.target.value)}
              />
            </label>
            <label htmlFor="passingYear" className="flex flex-col gap-2">
              <span className="text-gray-500">Passing Year</span>
              <input
                type="text"
                placeholder="Approximate Passing Year"
                className="border border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-teal-500 p-2 rounded-lg"
                value={educationInfo.passingYear}
                onChange={(e) => handleChange("passingYear", e.target.value)}
              />
            </label>

            <div className="col-span-full flex justify-end">
              <button
                type="submit"
                className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 btn cursor-pointer"
              >
                {loading ? (
                  <div>
                    Saving{" "}
                    <span className="loading loading-dots loading-sm"></span>
                  </div>
                ) : (
                  "Save Educational Info"
                )}
              </button>
            </div>
          </form>
        ) : (
          <ul className="space-y-2">
            <li className="flex flex-row gap-2">
              <p className="text-gray-500">Education Level:</p>{" "}
              <p className="md:text-lg">
                {" "}
                {currentUser?.educationLevel || "N/A"}
              </p>
            </li>
            <li className="flex flex-row gap-2">
              <p className="text-gray-500">Degree Title:</p>{" "}
              <p className="md:text-lg"> {currentUser?.degreeTitle || "N/A"}</p>
            </li>
            <li className="flex flex-row gap-2">
              <p className="text-gray-500">Institution:</p>{" "}
              <p className="md:text-lg"> {currentUser?.institution || "N/A"}</p>
            </li>
            <li className="flex flex-row gap-2">
              <p className="text-gray-500">Passing Year:</p>{" "}
              {getPassingYearText()}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default EducationalInfo;
