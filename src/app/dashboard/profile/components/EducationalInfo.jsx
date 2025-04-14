"use client";

import { useAppContext } from "@/Providers/AppProviders";
import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import CommonTitleOrEditBtn from "./CommonTitleOrEditBtn";

// Dummy currentUser fallback for safety (replace this with your actual user context or props)
const defaultUser = {
  educationLevel: "",
  degreeTitle: "",
  institution: "",
  passingYear: "",
};

const EducationalInfo = ({ currentUser = defaultUser }) => {
  const { isEditingInfo, setIsEditingInfo } = useAppContext();

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
    console.log("Updated Education Info:", educationInfo);
    setIsEditingEducation(false);
  };

  const handleChange = (field, value) => {
    setEducationInfo((prev) => ({ ...prev, [field]: value }));
  };

  const getPassingYearText = () => {
    if (!educationInfo.passingYear) return "N/A";
    const year = parseInt(educationInfo.passingYear);
    if (
      educationInfo.passingYear.toLowerCase().includes("completed") ||
      (!isNaN(year) && year <= new Date().getFullYear())
    ) {
      return "Graduation Completed";
    }
    return educationInfo.passingYear;
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
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <select
              className="border px-3 py-2 rounded text-black"
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

            <input
              type="text"
              placeholder="Exam or Degree Title"
              className="border px-3 py-2 rounded text-black"
              value={educationInfo.degreeTitle}
              onChange={(e) => handleChange("degreeTitle", e.target.value)}
            />

            <input
              type="text"
              placeholder="Institution Name"
              className="border px-3 py-2 rounded text-black"
              value={educationInfo.institution}
              onChange={(e) => handleChange("institution", e.target.value)}
            />

            <input
              type="text"
              placeholder="Approximate Passing Year"
              className="border px-3 py-2 rounded text-black"
              value={educationInfo.passingYear}
              onChange={(e) => handleChange("passingYear", e.target.value)}
            />

            <div className="col-span-full">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save Educational Info
              </button>
            </div>
          </form>
        ) : (
          <ul className="text-sm space-y-1">
            <li>
              <strong>Education Level:</strong>{" "}
              {educationInfo.educationLevel || "N/A"}
            </li>
            <li>
              <strong>Degree Title:</strong>{" "}
              {educationInfo.degreeTitle || "N/A"}
            </li>
            <li>
              <strong>Institution:</strong> {educationInfo.institution || "N/A"}
            </li>
            <li>
              <strong>Passing Year:</strong> {getPassingYearText()}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default EducationalInfo;
