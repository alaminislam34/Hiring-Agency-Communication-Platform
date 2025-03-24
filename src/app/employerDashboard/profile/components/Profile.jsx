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

      {/* Company Overview */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold border-b pb-2">
          Company Overview
        </h2>
        <p className="text-gray-600 mt-4">
          Tech Innovators Ltd. is a global leader in software development,
          providing cutting-edge solutions in AI, web development, and cloud
          computing. Our mission is to innovate and empower businesses
          worldwide.
        </p>
      </div>

      {/* Open Positions */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold border-b pb-2">Open Positions</h2>
        <div className="mt-4">
          <p className="font-semibold flex items-center">
            <FaBriefcase className="mr-2" /> Front-End Developer
          </p>
          <p className="text-gray-600">
            Location: Remote | Salary: $60k - $80k
          </p>
          <p className="text-gray-500">
            We are looking for a skilled React developer to join our growing
            team.
          </p>
        </div>
        <div className="mt-4">
          <p className="font-semibold flex items-center">
            <FaBriefcase className="mr-2" /> UI/UX Designer
          </p>
          <p className="text-gray-600">
            Location: Dhaka, Bangladesh | Salary: $50k - $70k
          </p>
          <p className="text-gray-500">
            Join our design team to create intuitive and user-friendly
            experiences.
          </p>
        </div>
      </div>

      {/* Company Culture */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold border-b pb-2">
          Our Culture & Values
        </h2>
        <p className="text-gray-600 mt-4">
          We believe in teamwork, innovation, and inclusivity. Our company
          fosters a culture of continuous learning and professional growth,
          ensuring that every employee reaches their full potential.
        </p>
      </div>
    </div>
  );
};

export default EmployerProfile;
