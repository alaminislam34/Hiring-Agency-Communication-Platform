import React from "react";
import {
  FaUserTie,
  FaMapMarkerAlt,
  FaBriefcase,
  FaEnvelope,
  FaLinkedin,
} from "react-icons/fa";

const candidates = [
  {
    id: 1,
    name: "John Doe",
    role: "Senior React Developer",
    location: "New York, USA",
    email: "johndoe@example.com",
    linkedin: "https://linkedin.com/in/johndoe",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "UI/UX Designer",
    location: "London, UK",
    email: "janesmith@example.com",
    linkedin: "https://linkedin.com/in/janesmith",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 3,
    name: "Ali Khan",
    role: "Full Stack Developer",
    location: "Dubai, UAE",
    email: "alikhan@example.com",
    linkedin: "https://linkedin.com/in/alikhan",
    image: "https://via.placeholder.com/100",
  },
];

const Candidates = () => {
  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold border-b pb-2">Candidates</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="p-4 border rounded-lg shadow-sm bg-gray-50"
          >
            <div className="flex items-center space-x-4">
              <img
                src={candidate.image}
                alt={candidate.name}
                className="w-16 h-16 rounded-full border"
              />
              <div>
                <h2 className="text-lg font-semibold">{candidate.name}</h2>
                <p className="text-gray-600 flex items-center">
                  <FaBriefcase className="mr-2" /> {candidate.role}
                </p>
                <p className="text-gray-500 flex items-center">
                  <FaMapMarkerAlt className="mr-2" /> {candidate.location}
                </p>
              </div>
            </div>
            <div className="flex space-x-4 mt-3">
              <a
                href={`mailto:${candidate.email}`}
                className="text-gray-600 hover:text-blue-500"
              >
                <FaEnvelope size={18} />
              </a>
              <a
                href={candidate.linkedin}
                className="text-gray-600 hover:text-blue-500"
              >
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Candidates;
