"use client";

import { UserCircle2 } from "lucide-react";

const teamMembers = [
  {
    name: "Ayesha Rahman",
    role: "Support Manager",
  },
  {
    name: "Tanvir Hossain",
    role: "Technical Support",
  },
  {
    name: "Nusrat Jahan",
    role: "Live Chat Agent",
  },
];

const TeamMembers = () => {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 bg-white">
      <h2 className="text-2xl font-semibold text-teal-700 mb-6 text-center">
        Meet Our Support Team
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-teal-50 p-5 rounded-2xl w-full max-w-xs shadow hover:shadow-lg transition-all duration-300 text-center"
          >
            <UserCircle2 className="w-16 h-16 text-teal-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-800">
              {member.name}
            </h3>
            <p className="text-sm text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
