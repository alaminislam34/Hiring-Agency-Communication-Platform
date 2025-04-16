"use client";

import { useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaFileAlt,
  FaImage,
  FaEdit,
} from "react-icons/fa";
import CommonTitleOrEditBtn from "./CommonTitleOrEditBtn";
import { useAppContext } from "@/Providers/AppProviders";
import axios from "axios";
import Swal from "sweetalert2";

const ImportantLinksInfo = () => {
  const { isEditingInfo, setIsEditingInfo, userRefetch, currentUser } =
    useAppContext();
  const [loading, setLoading] = useState(false);

  const [importantLinks, setImportantLinks] = useState({
    cv: currentUser?.cv || "",
    github: currentUser?.github || "",
    linkedin: currentUser?.linkedinProfile || "",
    portfolio: currentUser?.portfolio || "",
  });

  const handleLinksUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/updateProfile", importantLinks);
      if (res.data.modifiedCount > 0) {
        userRefetch();
        Swal.fire("Success", "Profile updated successfully", "success");
        setIsEditingInfo("");
      } else {
        Swal.fire("Failed", "Profile update failed", "error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderLinkField = (field, label, icon) => (
    <div key={field} className="flex flex-col gap-2">
      <label className="flex items-center gap-2">
        {icon}
        {label}
      </label>
      <input
        type="url"
        required
        placeholder={`Enter ${label} link`}
        className="border border-teal-500 focus:ring-2 focus:ring-teal-500 p-2 rounded-lg focus:outline-teal-500"
        value={importantLinks[field]}
        onChange={(e) =>
          setImportantLinks({
            ...importantLinks,
            [field]: e.target.value,
          })
        }
      />
    </div>
  );

  return (
    <div className="space-y-4">
      <CommonTitleOrEditBtn
        title="Important Links"
        showEdit={"links"}
        onClickEdit={() => setIsEditingLinks("links")}
      />

      {isEditingInfo === "links" ? (
        <form
          onSubmit={handleLinksUpdate}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-x-6"
        >
          {renderLinkField("cv", "CV", <FaFileAlt />)}
          {renderLinkField("github", "GitHub", <FaGithub />)}
          {renderLinkField("portfolio", "Portfolio", <FaGlobe />)}
          {renderLinkField("linkedin", "LinkedIn", <FaLinkedin />)}

          <div className="col-span-full">
            <button
              type="submit"
              className="w-full border border-teal-500 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg transition duration-200 cursor-pointer btn"
            >
              {loading ? (
                <div className="flex items-end gap-2">
                  Saving{" "}
                  <span className="loading loading-dots loading-sm"></span>
                </div>
              ) : (
                "Save Links"
              )}
            </button>
          </div>
        </form>
      ) : (
        <ul className="text-sm space-y-4">
          {[
            {
              label: "CV",
              value: currentUser?.cv,
              icon: <FaFileAlt className="text-teal-600" />,
            },
            {
              label: "GitHub",
              value: currentUser?.github,
              icon: <FaGithub className="text-teal-600" />,
            },
            {
              label: "Portfolio",
              value: currentUser?.portfolio,
              icon: <FaGlobe className="text-teal-600" />,
            },
            {
              label: "LinkedIn",
              value: currentUser?.linkedin,
              icon: <FaLinkedin className="text-teal-600" />,
            },
          ].map(({ label, value, icon }) => (
            <li key={label} className="flex items-center gap-2 py-1">
              <span className="text-xl"> {icon}</span>
              <span className="">{label}:</span>
              <a
                href={value || "#"}
                target="_blank"
                className={`underline ${
                  value ? "text-teal-500" : "text-gray-400 cursor-not-allowed"
                }`}
              >
                {value ? `Open ${label}` : "Not Provided"}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ImportantLinksInfo;
