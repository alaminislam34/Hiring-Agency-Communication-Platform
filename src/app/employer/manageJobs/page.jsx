"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const storedJobs = localStorage.getItem("jobs");
    if (storedJobs) {
      const parsedJobs = JSON.parse(storedJobs);
      setJobs(Array.isArray(parsedJobs) ? parsedJobs : [parsedJobs]);
    }
  }, []);

  const handleDelete = (index) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "teal",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      width: "300px",
    })
      .then((result) => {
        if (result.isConfirmed) {
          const updatedJobs = [...jobs];
          updatedJobs.splice(index, 1);
          setJobs(updatedJobs);
          localStorage.setItem("jobs", JSON.stringify(updatedJobs));
          Swal.fire({
            title: "Deleted!",
            text: "Your job has been deleted.",
            icon: "success",
            showConfirmButton: false,
            timer: 2500,
            width: "300px",
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting job:", error);
      });
  };

  const openEditModal = (index) => {
    setEditIndex(index);
    setEditData(jobs[index].jobDetails);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleUpdate = () => {
    const updatedJobs = [...jobs];
    updatedJobs[editIndex].jobDetails = editData;
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    setEditIndex(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-teal-600 mb-6">
        📋 Manage Your Posted Jobs
      </h1>

      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-100 bg-white">
        <table className="min-w-full table-auto text-sm text-left text-gray-700">
          <thead className="bg-teal-50 text-teal-700 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Job Title</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Salary</th>
              <th className="px-6 py-4">Deadline</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr
                key={index}
                className="border-b hover:bg-teal-50 transition duration-200"
              >
                <td className="px-6 py-4 font-medium">
                  {job.jobDetails?.jobTitle}
                </td>
                <td className="px-6 py-4">{job.jobDetails?.companyName}</td>
                <td className="px-6 py-4">
                  {job.jobDetails?.salaryMin}k - {job.jobDetails?.salaryMax}k
                </td>
                <td className="px-6 py-4">{job.jobDetails?.deadline}</td>
                <td className="px-6 py-4">{job.jobDetails?.jobType}</td>
                <td className="px-6 py-4">{job.jobDetails?.jobCategory}</td>
                <td className="px-6 py-4 flex gap-2 justify-center">
                  <button
                    onClick={() => openEditModal(index)}
                    className="text-sm bg-teal-100 text-teal-700 px-3 py-1 rounded hover:bg-teal-200 transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-8 text-gray-500 italic"
                >
                  No jobs posted yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editIndex !== null && (
        <div className="fixed inset-0 bg-black/10 bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold text-teal-700 mb-4">
              ✏️ Edit Job
            </h2>
            <div className="space-y-3">
              <input
                name="jobTitle"
                value={editData.jobTitle || ""}
                onChange={handleEditChange}
                placeholder="Job Title"
                className="w-full px-4 py-2 border rounded"
              />
              <input
                name="companyName"
                value={editData.companyName || ""}
                onChange={handleEditChange}
                placeholder="Company Name"
                className="w-full px-4 py-2 border rounded"
              />
              <input
                name="salaryMin"
                value={editData.salaryMin || ""}
                onChange={handleEditChange}
                placeholder="Min Salary"
                className="w-full px-4 py-2 border rounded"
              />
              <input
                name="salaryMax"
                value={editData.salaryMax || ""}
                onChange={handleEditChange}
                placeholder="Max Salary"
                className="w-full px-4 py-2 border rounded"
              />
              <input
                name="deadline"
                type="date"
                value={editData.deadline || ""}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border rounded"
              />
              <input
                name="jobType"
                value={editData.jobType || ""}
                onChange={handleEditChange}
                placeholder="Job Type"
                className="w-full px-4 py-2 border rounded"
              />
              <input
                name="jobCategory"
                value={editData.jobCategory || ""}
                onChange={handleEditChange}
                placeholder="Category"
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setEditIndex(null)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded bg-teal-500 text-white hover:bg-teal-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageJobs;
