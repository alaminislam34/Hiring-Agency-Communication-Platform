"use client";
import React from "react";

const applicants = [
  {
    id: 1,
    name: "Rakib Hossain",
    role: "Frontend Developer",
    jobTitle: "React Developer",
    jobType: "Remote",
    expectedSalary: "30,000 BDT",
    appliedDate: "2025-04-20",
    resume: "/resumes/rakib_resume.pdf",
    status: "Pending",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    role: "UI/UX Designer",
    jobTitle: "Product Designer",
    jobType: "On-site",
    expectedSalary: "28,000 BDT",
    appliedDate: "2025-04-19",
    resume: "/resumes/nusrat_resume.pdf",
    status: "Pending",
  },
];

const Candidates = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-center mb-6">
        📝 Applied Candidates
      </h1>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full   text-left text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase font-semibold">
            <tr className="*:px-4 text-teal-700 *:py-3">
              <th>#</th>
              <th>Name</th>
              <th>User Role</th>
              <th>Job Title</th>
              <th>Job Type</th>
              <th>Expected Salary</th>
              <th>Applied Date</th>
              <th>Resume</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {applicants.map((user, index) => (
              <tr key={user.id} className="*:px-4 *:border-b md:*:py-4 *:py-2">
                <td>{index + 1}</td>
                <td className="font-medium">{user.name}</td>
                <td>{user.role}</td>
                <td>{user.jobTitle}</td>
                <td>{user.jobType}</td>
                <td>{user.expectedSalary}</td>
                <td>{user.appliedDate}</td>
                <td>
                  <a
                    href={user.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View
                  </a>
                </td>
                <td className="flex items-center justify-center gap-2">
                  <button className="bg-teal-500 cursor-pointer text-white px-3 py-1 rounded-md hover:bg-opacity-80 transition">
                    Contact
                  </button>
                  <div>
                    <select
                      defaultValue={""}
                      className="border border-teal-500 select select-xs"
                    >
                      <option disabled value="">
                        Select
                      </option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Candidates;
