"use client";
import { BookmarkCheck, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/Providers/AppProviders";
import React, { useEffect, useState } from "react";

const SavedJobs = () => {
  const { jobs } = useAppContext();
  const [savedJobs, setSavedJobs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("bookmark")) || [];
    const filtered = jobs?.filter((job) => storedJobs.includes(job._id));
    setSavedJobs(filtered);
  }, [jobs]);

  const handleRemoveBookmark = (id) => {
    const updatedBookmarks = savedJobs.filter((job) => job._id !== id);
    setSavedJobs(updatedBookmarks);
    localStorage.setItem(
      "bookmark",
      JSON.stringify(updatedBookmarks.map((job) => job._id))
    );
  };

  const handleViewDetails = (id) => {
    router.push(`/jobs/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Saved Jobs</h2>

      {savedJobs?.length === 0 ? (
        <p className="text-gray-500">You haven’t saved any jobs yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Job Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Salary
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Deadline
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {savedJobs?.map((job) => (
                <tr key={job._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {job.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {job.meta?.companyName || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {job.location || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {job.minSalary && job.maxSalary
                      ? `${job.minSalary} - ${job.maxSalary} ${
                          job.salaryType || ""
                        }`
                      : "Negotiable"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {job.type || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {job.meta?.deadline || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-center flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleViewDetails(job._id)}
                      className="text-blue-500 hover:text-blue-700 transition"
                      title="View Details"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      onClick={() => handleRemoveBookmark(job._id)}
                      className="text-teal-500 hover:text-red-500 transition"
                      title="Remove Bookmark"
                    >
                      <BookmarkCheck size={20} />
                    </button>
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

export default SavedJobs;
