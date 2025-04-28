"use client";

import Pagination from "@/app/components/CommonCommponents/Pagination";
import { useAppContext } from "@/Providers/AppProviders";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const AppliedJobsPage = () => {
  const { appliedJobsCollection, appliedJobsLoading } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalJobs = appliedJobsCollection?.length || 0;
  const totalPages = Math.ceil(totalJobs / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentJobs = appliedJobsCollection?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="px-4 lg:py-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Applied Jobs</h2>

      {appliedJobsCollection?.length === 0 ? (
        <p className="text-gray-500">You haven’t applied for any jobs yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="table-class">
            <thead className="table-head-class">
              <tr className="table-head-row-class text-left">
                <th>Job Title</th>
                <th>Job Type</th>
                <th>Deadline</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {appliedJobsLoading ? (
                <tr className="flex items-center justify-center table-row-class">
                  <td colSpan={6}>
                    <div className="flex items-center justify-center w-full"></div>
                    <span className="loading loading-spinner loading-lg lg:loading-xl"></span>
                  </td>
                </tr>
              ) : (
                currentJobs?.map((job) => (
                  <tr key={job._id} className="table-row-class">
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {job.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {job.jobType}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {new Date(job.deadline).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {job.minSalary} - {job.maxSalary} {job.salaryType}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs">
                        {job.status || "Applied"}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center justify-center">
                        <Link
                          href={`/jobs/${job.jobId}`}
                          className="py-1 px-2 rounded-lg inline-block bg-teal-50 text-teal-500 hover:text-white hover:bg-teal-500"
                        >
                          <Eye size={18} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Component */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default AppliedJobsPage;
