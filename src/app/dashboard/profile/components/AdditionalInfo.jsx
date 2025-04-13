"use client";

import { useAppContext } from "@/Providers/AppProviders";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";

const AdditionalInfo = () => {
  const { currentUser } = useAppContext();
  // Additional Information
  const [additionalInfo, setAdditionalInfo] = useState({
    gender: currentUser?.gender || "",
    ageRange: currentUser?.ageRange || "",
    deviceType: currentUser?.deviceType || "",
    internetType: currentUser?.internetType || "",
    experience: currentUser?.experience || "",
  });
  // Additional Info data
  const [addressInfo, setAddressInfo] = useState({
    country: currentUser?.country || "",
    division: currentUser?.division || "",
    street: currentUser?.street || "",
  });
  // edit Additional Information handler
  const handleAdditionalUpdate = async (e) => {
    e.preventDefault();
    console.log("Updated Additional Info:", additionalInfo);
    setIsEditingAdditional(false);
  };
  const [isEditingAdditional, setIsEditingAdditional] = useState(false);
  return (
    <div>
      {/* Additional Info Section */}
      <div className="  p-6 rounded-lg shadow space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Additional Info</h2>
          <button
            onClick={() => setIsEditingAdditional(!isEditingAdditional)}
            className="text-black hover:text-blue-400"
          >
            <FaEdit />
          </button>
        </div>

        {isEditingAdditional ? (
          <form
            onSubmit={handleAdditionalUpdate}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Gender Select Dropdown */}
            <select
              className="border px-3 py-2 rounded text-black"
              value={additionalInfo.gender}
              onChange={(e) =>
                setAdditionalInfo({
                  ...additionalInfo,
                  gender: e.target.value,
                })
              }
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            {/* Other input fields remain the same */}
            <input
              type="text"
              placeholder="Age Range"
              className="border px-3 py-2 rounded text-black"
              value={additionalInfo.ageRange}
              onChange={(e) =>
                setAdditionalInfo({
                  ...additionalInfo,
                  ageRange: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Primary Device Type"
              className="border px-3 py-2 rounded text-black"
              value={additionalInfo.deviceType}
              onChange={(e) =>
                setAdditionalInfo({
                  ...additionalInfo,
                  deviceType: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Internet Type"
              className="border px-3 py-2 rounded text-black"
              value={additionalInfo.internetType}
              onChange={(e) =>
                setAdditionalInfo({
                  ...additionalInfo,
                  internetType: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Years of Experience"
              className="border px-3 py-2 rounded text-black"
              value={additionalInfo.experience}
              onChange={(e) =>
                setAdditionalInfo({
                  ...additionalInfo,
                  experience: e.target.value,
                })
              }
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
              <strong>Gender:</strong> {additionalInfo.gender || "N/A"}
            </li>
            <li>
              <strong>Age Range:</strong> {additionalInfo.ageRange || "N/A"}
            </li>
            <li>
              <strong>Primary Device:</strong>{" "}
              {additionalInfo.deviceType || "N/A"}
            </li>
            <li>
              <strong>Internet Type:</strong>{" "}
              {additionalInfo.internetType || "N/A"}
            </li>
            <li>
              <strong>Years of Experience:</strong>{" "}
              {additionalInfo.experience || "N/A"}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdditionalInfo;
