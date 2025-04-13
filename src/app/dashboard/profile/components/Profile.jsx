"use client";
import { useState } from "react";
import { useAppContext } from "@/Providers/AppProviders";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaLinkedin,
  FaGlobe,
  FaUserEdit,
  FaEdit,
} from "react-icons/fa";

const EmployerProfile = () => {
  const { currentUser } = useAppContext();

  // State for handling all the info
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAdditional, setIsEditingAdditional] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingEducation, setIsEditingEducation] = useState(false);
  const [isEditingLinks, setIsEditingLinks] = useState(false);
  const [isEditingJob, setIsEditingJob] = useState(false);

  // Educational Info
  const [educationInfo, setEducationInfo] = useState({
    educationLevel: currentUser?.educationLevel || "",
    degreeTitle: currentUser?.degreeTitle || "",
    institution: currentUser?.institution || "",
    passingYear: currentUser?.passingYear || "",
  });

  // Job Experience data
  const [jobExperience, setJobExperience] = useState({
    jobTitle: "",
    companyName: "",
    isItRelated: "",
    years: "",
    startDate: "",
    endDate: "",
    isPresent: false,
  });
  // Additional Info data
  const [addressInfo, setAddressInfo] = useState({
    country: currentUser?.country || "",
    division: currentUser?.division || "",
    street: currentUser?.street || "",
  });
  // Important Links Info
  const [importantLinks, setImportantLinks] = useState({
    cv: currentUser?.cv || "",
    github: currentUser?.github || "",
    portfolio: currentUser?.portfolio || "",
    linkedin: currentUser?.linkedinProfile || "",
    image: currentUser?.profileImage || "",
  });

  // Profile data
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    linkedin: currentUser?.linkedin || "",
    website: currentUser?.website || "",
    location: currentUser?.location || "Dhaka, Bangladesh",
  });
  // Additional Information
  const [additionalInfo, setAdditionalInfo] = useState({
    gender: currentUser?.gender || "",
    ageRange: currentUser?.ageRange || "",
    deviceType: currentUser?.deviceType || "",
    internetType: currentUser?.internetType || "",
    experience: currentUser?.experience || "",
  });
  // address data
  const countrydivisionMap = {
    Bangladesh: ["Dhaka", "Chittagong", "Khulna", "Rajshahi", "Sylhet"],
    India: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
    USA: ["New York", "California", "Texas", "Florida"],
    Canada: ["Toronto", "Vancouver", "Montreal", "Ottawa", "Calgary"],
    UK: ["London", "Manchester", "Liverpool", "Birmingham", "Leeds"],
  };

  // Edit Profile handler
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("Updated Profile Data:", formData);
    setIsEditing(false);
  };
  // edit Additional Information handler
  const handleAdditionalUpdate = async (e) => {
    e.preventDefault();
    console.log("Updated Additional Info:", additionalInfo);
    setIsEditingAdditional(false);
  };
  //  address handler
  const handleAddressUpdate = (e) => {
    e.preventDefault();
    console.log("Updated Address Info:", addressInfo);
    setIsEditingAddress(false);
  };
  // education handler
  const handleEducationUpdate = async (e) => {
    e.preventDefault();
    console.log("Updated Education Info:", educationInfo);
    setIsEditingEducation(false);
  };
  // Links handler
  const handleLinksUpdate = (e) => {
    e.preventDefault();
    console.log("Updated Important Links:", importantLinks);
    setIsEditingLinks(false);
  };

  // job experience handler
  const handleJobUpdate = async (e) => {
    e.preventDefault();
    console.log("Updated Job Experience:", jobExperience);
    setIsEditingJob(false);
  };

  return (
    <div className="bg-white mt-10 p-8 rounded-xl shadow-xl max-w-4xl mx-auto space-y-8">
      {/* Main Profile */}
      <div className="flex flex-col gap-4 md:flex-row justify-between items-start">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center space-x-0 md:space-x-8 space-y-4 md:space-y-0">
          <img
            src={currentUser?.image}
            alt={formData.name}
            className="w-32 h-32 rounded-full border-4 border-blue-300"
          />
          <div>
            {isEditing ? (
              <form onSubmit={handleUpdate} className="space-y-2">
                <input
                  type="text"
                  className="border w-full px-3 py-2 rounded"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Name"
                />
                <input
                  type="email"
                  className="border w-full px-3 py-2 rounded"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Email"
                />
                <input
                  type="text"
                  className="border w-full px-3 py-2 rounded"
                  value={formData.linkedin}
                  onChange={(e) =>
                    setFormData({ ...formData, linkedin: e.target.value })
                  }
                  placeholder="LinkedIn"
                />
                <input
                  type="text"
                  className="border w-full px-3 py-2 rounded"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  placeholder="Website"
                />
                <input
                  type="text"
                  className="border w-full px-3 py-2 rounded"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="Location"
                />
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Save Changes
                </button>
              </form>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-gray-800">
                  {formData.name}
                </h1>
                <p className="text-gray-600 mb-1">
                  Leading Tech Solutions Provider
                </p>
                <p className="flex items-center text-gray-500">
                  <FaMapMarkerAlt className="mr-2" /> {formData.location}
                </p>
                <div className="flex space-x-4 mt-2">
                  <a
                    href={`mailto:${formData.email}`}
                    className="text-gray-600 hover:text-blue-500">
                    <FaEnvelope size={20} />
                  </a>
                  <a
                    href={formData.linkedin}
                    className="text-gray-600 hover:text-blue-500"
                    target="_blank">
                    <FaLinkedin size={20} />
                  </a>
                  <a
                    href={formData.website}
                    className="text-gray-600 hover:text-blue-500"
                    target="_blank">
                    <FaGlobe size={20} />
                  </a>
                </div>
              </>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          <FaUserEdit className="mr-2" />{" "}
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* Additional Info Section */}
      <div className="  p-6 rounded-lg shadow space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Additional Info</h2>
          <button
            onClick={() => setIsEditingAdditional(!isEditingAdditional)}
            className="text-black hover:text-blue-400">
            <FaEdit />
          </button>
        </div>

        {isEditingAdditional ? (
          <form
            onSubmit={handleAdditionalUpdate}
            className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Gender Select Dropdown */}
            <select
              className="border px-3 py-2 rounded text-black"
              value={additionalInfo.gender}
              onChange={(e) =>
                setAdditionalInfo({ ...additionalInfo, gender: e.target.value })
              }>
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
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
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

      {/* Address Info Section */}
      <div className="p-6 rounded-lg shadow space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Address Info</h2>
          <button
            onClick={() => setIsEditingAddress(!isEditingAddress)}
            className="text-black hover:text-blue-400">
            <FaEdit />
          </button>
        </div>

        {isEditingAddress ? (
          <form
            onSubmit={handleAddressUpdate}
            className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Country Select */}
            <select
              className="border px-3 py-2 rounded text-black"
              value={addressInfo.country}
              onChange={(e) => {
                const selectedCountry = e.target.value;
                setAddressInfo({
                  ...addressInfo,
                  country: selectedCountry,
                  division: "", // reset division when country changes
                });
              }}>
              <option value="">Select Country</option>
              {Object.keys(countrydivisionMap).map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            {/* division Select */}
            <select
              className="border px-3 py-2 rounded text-black"
              value={addressInfo.division}
              onChange={(e) =>
                setAddressInfo({ ...addressInfo, division: e.target.value })
              }
              disabled={!addressInfo.country}>
              <option value="">Select Division</option>
              {(countrydivisionMap[addressInfo.country] || []).map(
                (division) => (
                  <option key={division} value={division}>
                    {division}
                  </option>
                )
              )}
            </select>

            {/* Street Address Input */}
            <input
              type="text"
              placeholder="Street Address"
              className="border px-3 py-2 rounded text-black col-span-full"
              value={addressInfo.street}
              onChange={(e) =>
                setAddressInfo({ ...addressInfo, street: e.target.value })
              }
            />

            <div className="col-span-full">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Save Address Info
              </button>
            </div>
          </form>
        ) : (
          <ul className="text-sm space-y-1">
            <li>
              <strong>Country:</strong> {addressInfo.country || "N/A"}
            </li>
            <li>
              <strong>division:</strong> {addressInfo.division || "N/A"}
            </li>
            <li>
              <strong>Street:</strong> {addressInfo.street || "N/A"}
            </li>
          </ul>
        )}
      </div>

      {/* Education Info Section */}
      <div className="p-6 rounded-lg shadow space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Educational Info</h2>
          <button
            onClick={() => setIsEditingEducation(!isEditingEducation)}
            className="text-black hover:text-blue-400">
            <FaEdit />
          </button>
        </div>

        {isEditingEducation ? (
          <form
            onSubmit={handleEducationUpdate}
            className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              className="border px-3 py-2 rounded text-black"
              value={educationInfo.educationLevel}
              onChange={(e) =>
                setEducationInfo({
                  ...educationInfo,
                  educationLevel: e.target.value,
                })
              }>
              <option value="">Select Education Level</option>
              <option value="Secondary">Secondary</option>
              <option value="Higher Secondary">Higher Secondary</option>
              <option value="Diploma">Diploma</option>
              <option value="Bachelor/Honours">Bachelor/Honors</option>
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
              onChange={(e) =>
                setEducationInfo({
                  ...educationInfo,
                  degreeTitle: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Institution Name"
              className="border px-3 py-2 rounded text-black"
              value={educationInfo.institution}
              onChange={(e) =>
                setEducationInfo({
                  ...educationInfo,
                  institution: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Approximate Passing Year"
              className="border px-3 py-2 rounded text-black"
              value={educationInfo.passingYear}
              onChange={(e) =>
                setEducationInfo({
                  ...educationInfo,
                  passingYear: e.target.value,
                })
              }
            />
            <div className="col-span-full">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
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
              <strong>Passing Year:</strong>{" "}
              {educationInfo.passingYear
                ? educationInfo.passingYear
                    .toLowerCase()
                    .includes("completed") ||
                  parseInt(educationInfo.passingYear) <=
                    new Date().getFullYear()
                  ? "Graduation Completed"
                  : educationInfo.passingYear
                : "N/A"}
            </li>
          </ul>
        )}
      </div>
      {/* Important Links Section */}
      <div className="p-6 rounded-lg shadow space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Important Links</h2>
          <button
            onClick={() => setIsEditingLinks(!isEditingLinks)}
            className="text-black hover:text-blue-400">
            <FaEdit />
          </button>
        </div>

        {isEditingLinks ? (
          <form onSubmit={handleLinksUpdate} className="grid grid-cols-1 gap-4">
            <input
              type="url"
              placeholder="CV Link (Google Drive)"
              className="border px-3 py-2 rounded text-black"
              value={importantLinks.cv}
              onChange={(e) =>
                setImportantLinks({ ...importantLinks, cv: e.target.value })
              }
            />
            <input
              type="url"
              placeholder="GitHub Profile"
              className="border px-3 py-2 rounded text-black"
              value={importantLinks.github}
              onChange={(e) =>
                setImportantLinks({ ...importantLinks, github: e.target.value })
              }
            />
            <input
              type="url"
              placeholder="Portfolio Link"
              className="border px-3 py-2 rounded text-black"
              value={importantLinks.portfolio}
              onChange={(e) =>
                setImportantLinks({
                  ...importantLinks,
                  portfolio: e.target.value,
                })
              }
            />
            <input
              type="url"
              placeholder="LinkedIn Profile"
              className="border px-3 py-2 rounded text-black"
              value={importantLinks.linkedin}
              onChange={(e) =>
                setImportantLinks({
                  ...importantLinks,
                  linkedin: e.target.value,
                })
              }
            />
            <input
              type="url"
              placeholder="Professional Image Link"
              className="border px-3 py-2 rounded text-black"
              value={importantLinks.image}
              onChange={(e) =>
                setImportantLinks({ ...importantLinks, image: e.target.value })
              }
            />
            <div>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Save Links
              </button>
            </div>
          </form>
        ) : (
          <ul className="text-sm space-y-2">
            <li>
              <strong>CV:</strong>{" "}
              <a
                href={importantLinks.cv}
                target="_blank"
                className="text-blue-500 underline">
                Open CV Link
              </a>
            </li>
            <li>
              <strong>GitHub:</strong>{" "}
              <a
                href={importantLinks.github}
                target="_blank"
                className="text-blue-500 underline">
                Open GitHub Profile
              </a>
            </li>
            <li>
              <strong>Portfolio:</strong>{" "}
              <a
                href={importantLinks.portfolio}
                target="_blank"
                className="text-blue-500 underline">
                Open Portfolio Link
              </a>
            </li>
            <li>
              <strong>LinkedIn:</strong>{" "}
              <a
                href={importantLinks.linkedin}
                target="_blank"
                className="text-blue-500 underline">
                Open LinkedIn Profile
              </a>
            </li>
            <li>
              <strong>Profile Image:</strong>{" "}
              <a
                href={importantLinks.image}
                target="_blank"
                className="text-blue-500 underline">
                Open Professional Image
              </a>
            </li>
          </ul>
        )}
      </div>
      {/* Job Experience Section */}
      <div className="p-6 rounded-lg shadow space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Job Experience</h2>
          <button
            onClick={() => setIsEditingJob(!isEditingJob)}
            className="text-black hover:text-blue-400">
            <FaEdit />
          </button>
        </div>

        {isEditingJob ? (
          <form
            onSubmit={handleJobUpdate}
            className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Job Designation */}
            <select
              className="border px-3 py-2 rounded text-black"
              value={jobExperience.jobTitle}
              onChange={(e) =>
                setJobExperience({ ...jobExperience, jobTitle: e.target.value })
              }>
              <option value="">Select Designation</option>
              <option value="Frontend Web Developer">
                Frontend Web Developer
              </option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Full-stack Web Developer">
                Full-stack Web Developer
              </option>
              <option value="Product Manager">Product Manager</option>
              <option value="SEO Expert">SEO Expert</option>
              <option value="Designer">Designer</option>
            </select>

            {/* Company Name */}
            <input
              type="text"
              placeholder="Company Name"
              className="border px-3 py-2 rounded text-black"
              value={jobExperience.companyName}
              onChange={(e) =>
                setJobExperience({
                  ...jobExperience,
                  companyName: e.target.value,
                })
              }
            />

            {/* IT Related? */}
            <select
              className="border px-3 py-2 rounded text-black"
              value={jobExperience.isItRelated}
              onChange={(e) =>
                setJobExperience({
                  ...jobExperience,
                  isItRelated: e.target.value,
                })
              }>
              <option value="">Related to IT?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            {/* Years of Experience */}
            <input
              type="text"
              placeholder="Years of Experience"
              className="border px-3 py-2 rounded text-black"
              value={jobExperience.years}
              onChange={(e) =>
                setJobExperience({ ...jobExperience, years: e.target.value })
              }
            />

            {/* Start Date */}
            <input
              type="date"
              className="border px-3 py-2 rounded text-black"
              value={jobExperience.startDate}
              onChange={(e) =>
                setJobExperience({
                  ...jobExperience,
                  startDate: e.target.value,
                })
              }
            />

            {/* End Date */}
            <input
              type="date"
              className="border px-3 py-2 rounded text-black"
              value={jobExperience.endDate}
              onChange={(e) =>
                setJobExperience({ ...jobExperience, endDate: e.target.value })
              }
              disabled={jobExperience.isPresent}
            />

            {/* Present Checkbox */}
            <div className="flex items-center space-x-2 col-span-full">
              <input
                type="checkbox"
                checked={jobExperience.isPresent}
                onChange={(e) =>
                  setJobExperience({
                    ...jobExperience,
                    isPresent: e.target.checked,
                    endDate: e.target.checked ? "" : jobExperience.endDate,
                  })
                }
              />
              <label>Currently Working Here</label>
            </div>

            <div className="col-span-full">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Save Job Experience
              </button>
            </div>
          </form>
        ) : (
          <ul className="text-sm space-y-1">
            <li>
              <strong>Job Title:</strong> {jobExperience.jobTitle || "N/A"}
            </li>
            <li>
              <strong>Company Name:</strong>{" "}
              {jobExperience.companyName || "N/A"}
            </li>
            <li>
              <strong>IT Related:</strong> {jobExperience.isItRelated || "N/A"}
            </li>
            <li>
              <strong>Experience:</strong> {jobExperience.years || "N/A"} years
            </li>
            <li>
              <strong>Start Date:</strong> {jobExperience.startDate || "N/A"}
            </li>
            <li>
              <strong>End Date:</strong>{" "}
              {jobExperience.isPresent
                ? "Present"
                : jobExperience.endDate || "N/A"}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default EmployerProfile;
