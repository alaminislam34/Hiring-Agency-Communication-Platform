"use client";
import { useEffect, useState } from "react";

const EmployerRoleApplications = () => {
  const [applications, setApplications] = useState([]);
  return (
    <div className="bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 p-6">
        Employer Role Applications
      </h1>

      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-100 bg-white">
        <table className="min-w-full table-auto text-sm text-left text-gray-700">
          <thead className="bg-teal-50 text-teal-700 uppercase text-xs font-semibold">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Company</th>
              <th className="py-3 px-4">Position</th>
              <th className="py-3 px-4">Salary</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((app, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-teal-50 transition duration-200"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{app.name}</td>
                  <td className="py-3 px-4">{app.email}</td>
                  <td className="py-3 px-4">{app.company}</td>
                  <td className="py-3 px-4">{app.position}</td>
                  <td className="py-3 px-4">${app.salary}</td>
                  <td className="py-3 px-4">
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full">
                      {app.status || "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-6 text-center text-gray-500">
                  No applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployerRoleApplications;
