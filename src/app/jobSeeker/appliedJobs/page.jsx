"use client";
import { useEffect, useState } from "react";

const AppliedJobsPage = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    setAppliedJobs(storedJobs);
  }, []);

  return (
    <div className="px-4 lg:py-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Applied Jobs</h2>

      {appliedJobs.length === 0 ? (
        <p className="text-gray-500">You haven’t applied for any jobs yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full  ">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Job Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Job Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Deadline
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className=" ">
              {appliedJobs.map((job, index) => (
                <tr key={index} className="hover:bg-gray-50 *:border-b">
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {job.jobTitle}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {job.companyName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {job.jobType}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {job.deadline}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs">
                      Pending
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AppliedJobsPage;
