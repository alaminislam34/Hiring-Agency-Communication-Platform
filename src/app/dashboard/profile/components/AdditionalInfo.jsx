"use client";

import { useAppContext } from "@/Providers/AppProviders";
import { useState, useEffect } from "react";
import CommonTitleOrEditBtn from "./CommonTitleOrEditBtn";

const AdditionalInfo = () => {
  const {
    currentUser,
    isEditingInfo,
    setIsEditingInfo,
    updateCurrentUser, // এইটা তোমার AppProvider এ বানাতে হবে
  } = useAppContext();

  const [additionalInfo, setAdditionalInfo] = useState({
    gender: "",
    ageRange: "",
    deviceType: "",
    internetType: "",
    experience: "",
  });

  // populate form from currentUser
  useEffect(() => {
    if (currentUser) {
      setAdditionalInfo({
        gender: currentUser.gender || "",
        ageRange: currentUser.ageRange || "",
        deviceType: currentUser.deviceType || "",
        internetType: currentUser.internetType || "",
        experience: currentUser.experience || "",
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

    try {
      // এখানে তুমি চাইলে backend API call ও করতে পারো
      await updateCurrentUser(additionalInfo); // context থেকে function
      setIsEditingInfo(null); // edit mode বন্ধ
    } catch (error) {
      console.error("Failed to update additional info:", error);
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
          <label htmlFor="gender" className="flex flex-col gap-1">
            <span className="text-gray-500">Gender</span>
            {/* Gender */}
            <select
              className="border p-2 rounded-lg border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-teal-600 text-black"
              value={additionalInfo.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              defaultValue={""}
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label htmlFor="ageRange" className="flex flex-col gap-1">
            <span className="text-gray-500">Age Range</span>
            {/* Age Range */}
            <input
              type="text"
              placeholder="Age Range"
              className="border p-2 rounded-lg border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-teal-600 text-black"
              value={additionalInfo.ageRange}
              onChange={(e) => handleChange("ageRange", e.target.value)}
            />
          </label>
          <label htmlFor=""></label>
          {/* Device Type */}
          <input
            type="text"
            placeholder="Primary Device Type"
            className="border px-3 py-2 rounded text-black"
            value={additionalInfo.deviceType}
            onChange={(e) => handleChange("deviceType", e.target.value)}
          />

          {/* Internet Type */}
          <input
            type="text"
            placeholder="Internet Type"
            className="border px-3 py-2 rounded text-black"
            value={additionalInfo.internetType}
            onChange={(e) => handleChange("internetType", e.target.value)}
          />

          {/* Experience */}
          <input
            type="text"
            placeholder="Years of Experience"
            className="border px-3 py-2 rounded text-black"
            value={additionalInfo.experience}
            onChange={(e) => handleChange("experience", e.target.value)}
          />

          <div className="col-span-full">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save Additional Info
            </button>
          </div>
        </form>
      ) : (
        <ul className="text-sm space-y-1">
          <li>
            <strong>Gender:</strong> {currentUser?.gender || "N/A"}
          </li>
          <li>
            <strong>Age Range:</strong> {currentUser?.ageRange || "N/A"}
          </li>
          <li>
            <strong>Primary Device:</strong> {currentUser?.deviceType || "N/A"}
          </li>
          <li>
            <strong>Internet Type:</strong> {currentUser?.internetType || "N/A"}
          </li>
          <li>
            <strong>Years of Experience:</strong>{" "}
            {currentUser?.experience || "N/A"}
          </li>
        </ul>
      )}
    </div>
  );
};

export default AdditionalInfo;
