"use client";
import React, { useEffect, useState } from "react";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("bookmark")) || []; // job IDs
    setSavedJobs(storedJobs);

    const allJobs = JSON.parse(localStorage.getItem("jobs")) || []; // all jobs

    const matchedJobs = allJobs.filter((job) => storedJobs.includes(job.id));

    setFilteredJobs(matchedJobs);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Saved Jobs</h2>
      <div>
        {filteredJobs.map((job, i) => (
          <div key={i}>{job}</div>
        ))}
        {savedJobs.map((job, i) => (
          <div key={i}>{job}</div>
        ))}
      </div>
      {savedJobs.length === 0 ? (
        <p className="text-gray-500">You haven’t saved any jobs yet.</p>
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
                  Bookmark
                </th>
              </tr>
            </thead>
            <tbody className=" ">
              {savedJobs.map((job, index) => (
                <tr key={index} className="hover:bg-gray-50">
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
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                      Bookmarked
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

export default SavedJobs;
