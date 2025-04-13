"use client";

import { useState } from "react";
import { FaEdit } from "react-icons/fa";

const ImportantLinksInfo = ({ currentUser }) => {
  const [isEditingLinks, setIsEditingLinks] = useState(false);

  const [importantLinks, setImportantLinks] = useState({
    cv: currentUser?.cv || "",
    github: currentUser?.github || "",
    portfolio: currentUser?.portfolio || "",
    linkedin: currentUser?.linkedinProfile || "",
    image: currentUser?.profileImage || "",
  });

  const handleLinksUpdate = (e) => {
    e.preventDefault();
    const { cv, github, portfolio, linkedin, image } = importantLinks;

    if (!cv || !github || !portfolio || !linkedin || !image) {
      alert("Please fill in all the fields with valid links!");
      return;
    }

    console.log("Updated Important Links:", importantLinks);
    setIsEditingLinks(false);
  };

  return (
    <div className="p-6 rounded-lg shadow space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Important Links</h2>
        <button
          onClick={() => setIsEditingLinks(!isEditingLinks)}
          className="text-black hover:text-teal-400"
        >
          <FaEdit />
        </button>
      </div>

      {isEditingLinks ? (
        <form onSubmit={handleLinksUpdate} className="grid grid-cols-1 gap-4">
          {["cv", "github", "portfolio", "linkedin", "image"].map((field) => (
            <input
              key={field}
              type="url"
              placeholder={`Enter ${
                field.charAt(0).toUpperCase() + field.slice(1)
              } Link`}
              className="border px-3 py-2 rounded text-black"
              value={importantLinks[field]}
              onChange={(e) =>
                setImportantLinks({
                  ...importantLinks,
                  [field]: e.target.value,
                })
              }
            />
          ))}

          {importantLinks.image && (
            <img
              src={importantLinks.image}
              alt="Profile Preview"
              className="w-32 h-32 rounded-full object-cover border"
            />
          )}

          <button
            type="submit"
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 cursor-pointer"
          >
            Save Links
          </button>
        </form>
      ) : (
        <ul className="text-sm space-y-2">
          <li>
            <strong>CV:</strong>{" "}
            <a
              href={importantLinks.cv || "#"}
              target="_blank"
              className="text-teal-500 underline"
            >
              {importantLinks.cv ? "Open CV Link" : "Not Provided"}
            </a>
          </li>
          <li>
            <strong>GitHub:</strong>{" "}
            <a
              href={importantLinks.github || "#"}
              target="_blank"
              className="text-teal-500 underline"
            >
              {importantLinks.github ? "Open GitHub Profile" : "Not Provided"}
            </a>
          </li>
          <li>
            <strong>Portfolio:</strong>{" "}
            <a
              href={importantLinks.portfolio || "#"}
              target="_blank"
              className="text-teal-500 underline"
            >
              {importantLinks.portfolio ? "Open Portfolio" : "Not Provided"}
            </a>
          </li>
          <li>
            <strong>LinkedIn:</strong>{" "}
            <a
              href={importantLinks.linkedin || "#"}
              target="_blank"
              className="text-teal-500 underline"
            >
              {importantLinks.linkedin ? "Open LinkedIn" : "Not Provided"}
            </a>
          </li>
          <li>
            <strong>Profile Image:</strong>{" "}
            <a
              href={importantLinks.image || "#"}
              target="_blank"
              className="text-teal-500 underline"
            >
              {importantLinks.image ? "Open Image" : "Not Provided"}
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ImportantLinksInfo;
