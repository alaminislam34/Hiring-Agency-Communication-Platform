"use client";

import { FaBriefcase, FaTrash, FaEye } from "react-icons/fa";

const jobs = [
  {
    id: 1,
    jobTitle: "Frontend Developer",
    companyName: "InnovateX",
    postedBy: "alamin@example.com",
    salaryMin: 25000,
    salaryMax: 40000,
    deadline: "2025-05-15",
    jobType: "Full-time",
    jobCategory: "Tech",
  },
  {
    id: 2,
    jobTitle: "Content Writer",
    companyName: "Creative Minds",
    postedBy: "rakib@example.com",
    salaryMin: 15000,
    salaryMax: 25000,
    deadline: "2025-05-10",
    jobType: "Part-time",
    jobCategory: "Writing",
  },
  {
    id: 3,
    jobTitle: "Sales Executive",
    companyName: "MarketHub",
    postedBy: "rony@example.com",
    salaryMin: 20000,
    salaryMax: 30000,
    deadline: "2025-04-30",
    jobType: "Full-time",
    jobCategory: "Sales",
  },
];

const ManageJobs = () => {
  return (
    <div className="">
      <h1 className="text-2xl font-semibold text-teal-600 mb-6 p-6">
        <FaBriefcase className="inline mr-2" />
        Manage Jobs
      </h1>

      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-100 bg-white">
        <table className="min-w-full table-auto text-sm text-left text-gray-700">
          <thead className="bg-teal-50 text-teal-700 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Job Title</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Posted By</th>
              <th className="px-6 py-4">Salary</th>
              <th className="px-6 py-4">Deadline</th>
              <th className="px-6 py-4">Job Type</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, i) => (
              <tr
                key={i}
                className="border-b hover:bg-teal-50 transition duration-200"
              >
                <td className="px-6 py-4 font-medium">{job.jobTitle}</td>
                <td className="px-6 py-4">{job.companyName}</td>
                <td className="px-6 py-4">{job.postedBy}</td>
                <td className="px-6 py-4">
                  ৳{job.salaryMin.toLocaleString()} - ৳
                  {job.salaryMax.toLocaleString()}
                </td>
                <td className="px-6 py-4">{job.deadline}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      job.jobType === "Full-time"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {job.jobType}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-teal-100 text-teal-700 text-xs px-2 py-1 rounded-full font-medium">
                    {job.jobCategory}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2 justify-center *:cursor-pointer">
                  <button className="text-sm bg-teal-100 text-teal-700 px-3 py-1 rounded hover:bg-teal-200 transition flex items-center gap-1">
                    <FaEye /> View
                  </button>
                  <button className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition flex items-center gap-1">
                    <FaTrash /> Delete
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

export default ManageJobs;
