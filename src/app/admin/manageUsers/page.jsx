"use client";

import { FaMedal, FaCrown, FaStar } from "react-icons/fa";
import { MdOutlineArrowDropDown } from "react-icons/md";

const users = [
  {
    id: 1,
    name: "Al Amin",
    email: "alamin@example.com",
    joiningDate: "2023-06-01",
    role: "Admin",
    rank: "Platinum",
  },
  {
    id: 4,
    name: "Rony",
    email: "rony@example.com",
    joiningDate: "2023-06-01",
    role: "Employer",
    rank: "Silver",
  },
  {
    id: 2,
    name: "Mehedi Hasan",
    email: "mehedi@example.com",
    joiningDate: "2023-07-15",
    role: "Moderator",
    rank: "Gold",
  },
  {
    id: 3,
    name: "Rakib Gazi",
    email: "rakib@example.com",
    joiningDate: "2023-08-20",
    role: "Job Seeker",
    rank: "Bronze",
  },
];

const getRankIcon = (rank) => {
  switch (rank) {
    case "Gold":
      return <FaCrown className="text-yellow-500 text-lg" />;
    case "Silver":
      return <FaMedal className="text-gray-400 text-lg" />;
    case "Bronze":
      return <FaMedal className="text-amber-600 text-lg" />;
    case "Platinum":
      return <FaStar className="text-indigo-400 text-lg" />;
    default:
      return <FaStar className="text-gray-300 text-lg" />;
  }
};

const ManageUsers = () => {
  return (
    <div className="">
      <h1 className="text-2xl font-semibold text-teal-600 mb-6 p-6">
        👥 Manage Users
      </h1>

      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-100 bg-white">
        <table className="min-w-full table-auto text-sm text-left text-gray-700">
          <thead className="bg-teal-50 text-teal-700 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Rank</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Joining Date</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className="border-b hover:bg-teal-50 transition duration-200"
              >
                <td className="px-6 py-4">{getRankIcon(user.rank)}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.joiningDate}</td>
                <td className="px-6 py-4">
                  {user.role === "Admin" ? (
                    <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-700">
                      {user.role}
                    </span>
                  ) : (
                    <button className="flex items-center gap-1 bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full hover:bg-gray-200 transition">
                      {user.role} <MdOutlineArrowDropDown className="text-lg" />
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 flex gap-2 justify-center *:cursor-pointer">
                  <button className="text-sm bg-teal-100 text-teal-700 px-3 py-1 rounded hover:bg-teal-200 transition">
                    View
                  </button>
                  <button className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
