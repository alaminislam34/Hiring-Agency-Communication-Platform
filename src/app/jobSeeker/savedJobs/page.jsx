"use client";

import { BookmarkCheck, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/Providers/AppProviders";
import React, { useEffect, useState } from "react";
import Pagination from "@/app/components/CommonCommponents/Pagination";

// Helper to safely get bookmarks from localStorage
const getStoredBookmarks = () => {
  try {
    const stored = localStorage.getItem("bookmark");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error parsing bookmarks:", error);
    return [];
  }
};

const SavedJobs = () => {
  const { jobs } = useAppContext();
  const [savedJobs, setSavedJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const router = useRouter();

  useEffect(() => {
    if (!jobs || jobs.length === 0) return; // Wait until jobs are loaded

    const storedJobIds = getStoredBookmarks();

    // Filter jobs that are saved
    const filteredJobs = jobs.filter((job) => storedJobIds.includes(job._id));
    setSavedJobs(filteredJobs);
  }, [jobs]);

  const handleRemoveBookmark = (id) => {
    const updatedSavedJobs = savedJobs.filter((job) => job._id !== id);
    setSavedJobs(updatedSavedJobs);

    // Update localStorage
    const updatedIds = updatedSavedJobs.map((job) => job._id);
    localStorage.setItem("bookmark", JSON.stringify(updatedIds));
  };

  const handleViewDetails = (id) => {
    router.push(`/jobs/${id}`);
  };
  // Pagination calculations
  const totalPages = Math.ceil(savedJobs?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentJobs = savedJobs?.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Saved Jobs</h2>

      {savedJobs.length === 0 ? (
        <p className="text-gray-500">You haven’t saved any jobs yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="table-class">
            <thead className="table-head-class">
              <tr className="table-head-row-class">
                <th>Job Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Salary</th>
                <th>Type</th>
                <th>Deadline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentJobs?.map((job) => (
                <tr key={job._id} className="table-row-class">
                  <td>{job.title}</td>
                  <td>{job.meta?.companyName || "N/A"}</td>
                  <td>{job.location || "N/A"}</td>
                  <td>
                    {job.minSalary && job.maxSalary
                      ? `${job.minSalary} - ${job.maxSalary} ${
                          job.salaryType || ""
                        }`
                      : "Negotiable"}
                  </td>
                  <td>{job.type || "N/A"}</td>
                  <td>{job.meta?.deadline || "N/A"}</td>
                  <td>
                    <div className="flex items-center  gap-2">
                      <button
                        onClick={() => handleViewDetails(job._id)}
                        className="text-teal-500 hover:text-teal-700 transition cursor-pointer"
                        title="View Details"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() => handleRemoveBookmark(job._id)}
                        className="text-teal-500 hover:text-red-500 transition cursor-pointer"
                        title="Remove Bookmark"
                      >
                        <BookmarkCheck size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default SavedJobs;
