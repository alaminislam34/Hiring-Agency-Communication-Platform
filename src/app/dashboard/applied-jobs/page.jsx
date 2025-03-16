"use client";

import { useState } from "react";
import DashboardLayout from "../DashboardLayout";
import {
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  EyeIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const AppliedJobs = () => {
  // Demo data for applied jobs
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior React Developer",
      company: "Tech Corp Inc.",
      status: "Pending",
      appliedDate: "2024-03-15",
    },
    {
      id: 2,
      title: "UX Designer",
      company: "Digital Solutions Co.",
      status: "Accepted",
      appliedDate: "2024-03-12",
    },
    {
      id: 3,
      title: "Project Manager",
      company: "InnovateX LLC",
      status: "Rejected",
      appliedDate: "2024-03-10",
    },
  ]);

  const columns = [
    { Header: "Job Title", accessor: "title" },
    { Header: "Company", accessor: "company" },
    { Header: "Status", accessor: "status" },
    { Header: "Applied Date", accessor: "appliedDate" },
    { Header: "Actions", accessor: "actions" },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Applied Jobs</h1>
        <div className="border rounded-lg overflow-x-auto">
          <table className="w-full text-left min-w-max">
            <thead className="bg-gray-100">
              <tr>
                {columns.map((column) => (
                  <th key={column.accessor} className="p-3">
                    {column.Header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <tr key={job.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{job.title}</td>
                    <td className="p-3">{job.company}</td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                          job.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : job.status === "Accepted"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {job.status === "Pending" && (
                          <ClockIcon className="h-4 w-4 mr-1.5" />
                        )}
                        {job.status === "Accepted" && (
                          <CheckCircleIcon className="h-4 w-4 mr-1.5" />
                        )}
                        {job.status === "Rejected" && (
                          <XCircleIcon className="h-4 w-4 mr-1.5" />
                        )}
                        {job.status}
                      </span>
                    </td>
                    <td className="p-3 text-gray-600">{job.appliedDate}</td>
                    <td className="p-3 space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-800 transition"
                        aria-label="View application"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 transition"
                        aria-label="Remove application"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-3 text-gray-500">
                    No applied jobs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AppliedJobs;
