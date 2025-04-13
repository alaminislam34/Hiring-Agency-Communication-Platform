"use client";
import { useEffect, useState } from "react";
import { useAppContext } from "@/Providers/AppProviders";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaLinkedin,
  FaGlobe,
  FaUserEdit,
  FaBookReader,
  FaGraduationCap,
  FaLink,
} from "react-icons/fa";
import { PiAddressBookTabs } from "react-icons/pi";
import { TbFileInfo } from "react-icons/tb";
import AdditionalInfo from "./AdditionalInfo";
import AddressInfo from "./AddressInfo";
import EducationalInfo from "./EducationalInfo";
import ImportantLinksInfo from "./ImportantLinksInfo";
import JobExperienceInfo from "./JobExperienceInfo";

const EmployerProfile = () => {
  const { currentUser } = useAppContext();

  // Info tab state (saved in localStorage)
  const [infoBtn, setInfoBtn] = useState(() => {
    return localStorage.getItem("infoLink") || "Additional Info";
  });

  useEffect(() => {
    localStorage.setItem("infoLink", infoBtn);
  }, [infoBtn]);

  // Profile edit mode and form data
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    linkedin: currentUser?.linkedin || "",
    website: currentUser?.website || "",
    location: currentUser?.location || "Dhaka, Bangladesh",
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Updated Profile Data:", formData);
    setIsEditing(false);
  };

  const info = [
    { name: "Additional Info", icon: <TbFileInfo /> },
    { name: "Address", icon: <PiAddressBookTabs /> },
    { name: "Education", icon: <FaBookReader /> },
    { name: "Important Links", icon: <FaLink /> },
    { name: "Job Experience", icon: <FaGraduationCap /> },
  ];

  return (
    <div className="mt-10 mx-auto space-y-8">
      {/* Main Profile */}
      <div className="flex flex-col gap-4 md:flex-row justify-between items-start">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center space-y-4 md:space-y-0 md:space-x-8">
          <img
            src={currentUser?.image}
            alt={formData.name}
            className="w-32 h-32 rounded-full border-4 border-teal-500"
          />
          <div>
            {isEditing ? (
              <form onSubmit={handleUpdate} className="space-y-2">
                {["name", "email", "linkedin", "website", "location"].map(
                  (field) => (
                    <input
                      key={field}
                      type="text"
                      className="border w-full px-3 py-2 rounded"
                      value={formData[field]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field]: e.target.value })
                      }
                      placeholder={
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }
                    />
                  )
                )}
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-gray-800">
                  {currentUser?.name}
                </h1>
                <p className="text-gray-600 mb-1">
                  Leading Tech Solutions Provider
                </p>
                <p className="flex items-center text-gray-500">
                  <FaMapMarkerAlt className="mr-2" /> {formData.location}
                </p>
                <div className="flex space-x-4 mt-2">
                  {formData.email && (
                    <a
                      href={`mailto:${formData.email}`}
                      className="text-gray-600 hover:text-teal-500"
                    >
                      <FaEnvelope size={20} />
                    </a>
                  )}
                  {formData.linkedin && (
                    <a
                      href={formData.linkedin}
                      target="_blank"
                      className="text-gray-600 hover:text-teal-500"
                    >
                      <FaLinkedin size={20} />
                    </a>
                  )}
                  {formData.website && (
                    <a
                      href={formData.website}
                      target="_blank"
                      className="text-gray-600 hover:text-teal-500"
                    >
                      <FaGlobe size={20} />
                    </a>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center text-sm bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition"
        >
          <FaUserEdit className="mr-2" />
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* Info Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 gap-4 lg:gap-6">
        <ul className="md:col-span-2 lg:col-span-2 shadow-xl border border-teal-500 rounded-xl p-4 flex lg:flex-col flex-wrap">
          {info.map(({ name, icon }) => (
            <li
              key={name}
              onClick={() => setInfoBtn(name)}
              className={`flex items-center gap-2 p-2 cursor-pointer duration-300 border-transparent border-b-2
                 hover:border-b-teal-500 ${
                   infoBtn === name ? "border-b-teal-600 font-medium" : ""
                 }`}
            >
              {icon} {name}
            </li>
          ))}
        </ul>
        <div className="md:col-span-4 lg:col-span-6 border border-dashed border-teal-500 rounded">
          <p className="text-gray-600">
            {infoBtn === "Additional Info" && <AdditionalInfo />}
            {infoBtn === "Address" && <AddressInfo />}
            {infoBtn === "Education" && <EducationalInfo />}
            {infoBtn === "Important Links" && <ImportantLinksInfo />}
            {infoBtn === "Job Experience" && <JobExperienceInfo />}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;
