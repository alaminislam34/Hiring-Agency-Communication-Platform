"use client";
import { useAppContext } from "@/Providers/AppProviders";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaLinkedin,
  FaBriefcase,
} from "react-icons/fa";

const EmployerProfile = () => {
  const { currentUser } = useAppContext();
  console.log(currentUser);
  return (
    <div className="bg-white overflow-hidden mt-10 p-6">
      {/* Profile Header */}
      <div className="flex items-center space-x-6">
        <img
          src={currentUser?.image}
          alt={currentUser?.name}
          className="w-32 h-32 rounded-full border-4 border-gray-300"
        />
        <div>
          <h1 className="text-2xl font-bold">{currentUser?.name}</h1>
          <p className="text-gray-600">Leading Tech Solutions Provider</p>
          <p className="flex items-center text-gray-500 mt-1">
            <FaMapMarkerAlt className="mr-2" /> Dhaka, Bangladesh
          </p>
          <div className="flex space-x-4 mt-2">
            <a
              href="mailto:contact@techinnovators.com"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;
