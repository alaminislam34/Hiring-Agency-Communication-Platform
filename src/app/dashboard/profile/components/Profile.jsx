"use client";
import { useAppContext } from "@/Providers/AppProviders";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaLinkedin,
  FaGlobe,
  FaUserEdit,
} from "react-icons/fa";

const EmployerProfile = () => {
  const { currentUser } = useAppContext();

  return (
    <div className="bg-white mt-10 p-8 rounded-xl shadow-xl max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Employer Profile</h2>
        <button className="flex items-center text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          <FaUserEdit className="mr-2" /> Edit Profile
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center space-x-0 md:space-x-8 space-y-4 md:space-y-0">
        <img
          src={currentUser?.image}
          alt={currentUser?.name}
          className="w-32 h-32 rounded-full border-4 border-blue-300"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {currentUser?.name}
          </h1>
          <p className="text-gray-600 mb-1">Leading Tech Solutions Provider</p>
          <p className="flex items-center text-gray-500">
            <FaMapMarkerAlt className="mr-2" /> Dhaka, Bangladesh
          </p>
          <div className="flex space-x-4 mt-2">
            <a
              href={`mailto:${currentUser?.email}`}
              className="text-gray-600 hover:text-blue-500"
            >
              <FaEnvelope size={20} />
            </a>
            <a
              href="https://linkedin.com/company/techinnovators"
              className="text-gray-600 hover:text-blue-500"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://techinnovators.com"
              className="text-gray-600 hover:text-blue-500"
            >
              <FaGlobe size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-500">Company Name</p>
          <p className="text-base font-medium text-gray-800">
            Tech Innovators Ltd.
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Website</p>
          <p className="text-base font-medium text-blue-600 underline">
            https://techinnovators.com
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Founded</p>
          <p className="text-base font-medium text-gray-800">2015</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Employees</p>
          <p className="text-base font-medium text-gray-800">50-100</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Hiring Status</p>
          <p className="text-base font-medium text-green-600">
            Actively Hiring
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;
