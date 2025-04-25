"use client";
import { useEffect, useState } from "react";
import { useAppContext } from "@/Providers/AppProviders";
import { FaBookReader, FaGraduationCap, FaLink } from "react-icons/fa";
import { TbFileInfo } from "react-icons/tb";
import AdditionalInfo from "./AdditionalInfo";
import AddressInfo from "./AddressInfo";
import EducationalInfo from "./EducationalInfo";
import ImportantLinksInfo from "./ImportantLinksInfo";
import JobExperienceInfo from "./JobExperienceInfo";
import ProfileInfo from "./ProfileInfo";
import { LucideVerified } from "lucide-react";

const EmployerProfile = () => {
  const { currentUser } = useAppContext();

  // Info tab state (saved in localStorage)
  const [infoBtn, setInfoBtn] = useState("Profile Info");

  useEffect(() => {
    localStorage.setItem("infoLink", infoBtn);
  }, [infoBtn]);

  // Profile edit mode and form data

  const info = [
    { name: "Profile Info", icon: <TbFileInfo /> },
    // { name: "Additional Info", icon: <TbFileInfo /> },
    { name: "Education Info", icon: <FaBookReader /> },
    { name: "Important Links", icon: <FaLink /> },
    { name: "Job Experience", icon: <FaGraduationCap /> },
  ];

  return (
    <div className="flex flex-col gap-4 md:flex-row justify-between items-start relative">
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 gap-4 lg:gap-6 w-full">
        <div className="md:col-span-2 lg:col-span-2 shadow-xl border border-teal-500 bg-gradient-to-br from-teal-50 via-teal-50 to-white rounded-xl p-4 flex lg:flex-col flex-wrap ">
          <div className="flex flex-col items-center p-2 border-b border-teal-500 border-dashed mb-2 w-full lg:mb-4 space-y-2">
            <div className="w-32 h-32 rounded-full relative">
              <img
                src={currentUser?.image || "/fakeUser.jpg"}
                alt={currentUser?.name}
                className="border-4 rounded-full border-teal-500 w-full h-full object-cover bg-cover bg-center"
              />
              {currentUser?.isVerified ? (
                <div className="absolute w-6 h-6 right-2 top-2 flex items-center justify-center rounded-full bg-green-500">
                  <LucideVerified className="text-xl md:text-2xl lg:text-3xl text-white" />
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="text-center">
              <h3 className="text-base md:text-lg lg:text-xl">
                {currentUser?.name}
              </h3>
              <p className="text-sm flex flex-row items-center gap-2 text-gray-500">
                UserId: {currentUser?._id}
              </p>
            </div>
          </div>
          <ul className="duration-500 transition-all ease-in-out space-y-2 w-full">
            {info.map(({ name, icon }) => (
              <li
                key={name}
                onClick={() => setInfoBtn(name)}
                className={`flex items-center gap-2 py-1 px-2 cursor-pointer rounded-md transition-all duration-300 ease-in-out border-l-4 w-full ${
                  infoBtn === name
                    ? "border-l-teal-600 bg-gradient-to-r from-teal-100 to-teal-50 shadow-md"
                    : "border-transparent hover:bg-gradient-to-tr from-teal-100 to-teal-50 hover:shadow-md"
                }`}
              >
                <span
                  className={`border ${
                    infoBtn === name
                      ? "bg-gradient-to-tr from-teal-600 to-teal-400 text-white"
                      : "border-transparent"
                  } w-9 h-9 rounded-full flex items-center justify-center`}
                >
                  {icon}
                </span>
                <span className="text-sm font-medium">{name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4 lg:col-span-6 border border-dashed border-teal-500 bg-gradient-to-br from-teal-50 via-teal-50 to-white rounded-xl shadow-xl p-4">
          {infoBtn === "Profile Info" && <ProfileInfo />}
          {infoBtn === "Additional Info" && <AdditionalInfo />}
          {infoBtn === "Address Info" && <AddressInfo />}
          {infoBtn === "Education Info" && <EducationalInfo />}
          {infoBtn === "Important Links" && <ImportantLinksInfo />}
          {infoBtn === "Job Experience" && <JobExperienceInfo />}
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;
