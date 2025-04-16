"use client";

import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppliedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    fetch("/api/appliedJobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
      })
      .catch((error) => {
        console.error("Failed to fetch applied jobs:", error);
        toast.error("Failed to fetch applied jobs");
      });
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/appliedJobs/${id}`, {
            method: "DELETE",
          });

          const data = await res.json();

          if (!res.ok) {
            toast.error(data?.error || "Delete failed");
            return;
          }

          setJobs(jobs.filter((job) => job._id !== id));
          toast.success("Job deleted successfully");
        } catch (error) {
          console.error("Error deleting job:", error);
          toast.error("Something went wrong");
        }
      }
    });
  };

  const openModal = (job) => {
    setSelectedJob(job);
    document.getElementById("job_details_modal").showModal();
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="p-6 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Applied Jobs</h1>
        <div className="border rounded-lg overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-teal-500 text-white">
              <tr>
                <th className="p-4">Job Title</th>
                <th className="p-4">Company</th>
                <th className="p-4">Location</th>
                <th className="p-4">Job Type</th>
                <th className="p-4">Deadline</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length > 0 ? (
                jobs.map((job, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 text-sm text-gray-800"
                  >
                    <td className="p-4 font-semibold">{job.jobTitle}</td>
                    <td className="p-4">{job.companyName}</td>
                    <td className="p-4">{job.location}</td>
                    <td className="p-4">{job.jobType}</td>
                    <td className="p-4">{job.deadline}</td>
                    <td className="p-4 flex items-center gap-2">
                      <button
                        className="bg-teal-500 hover:bg-teal-600 text-white text-xs px-3 py-1 rounded"
                        onClick={() => openModal(job)}
                      >
                        Details
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white p-1 rounded"
                        onClick={() => handleDelete(job._id)}
                      >
                        <TrashIcon className="h-4 w-4 text-white" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center p-4 text-gray-500">
                    No applied jobs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stylish Daisy UI Modal */}
      <dialog id="job_details_modal" className="modal">
        <div className="modal-box rounded-xl border border-teal-500 shadow-lg">
          <h3 className="font-bold text-xl text-teal-600 mb-4 border-b pb-2">
            📝 Job Details
          </h3>
          {selectedJob && (
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-semibold text-teal-600">Title:</span>{" "}
                {selectedJob.jobTitle}
              </p>
              <p>
                <span className="font-semibold text-teal-600">Company:</span>{" "}
                {selectedJob.companyName}
              </p>
              <p>
                <span className="font-semibold text-teal-600">Location:</span>{" "}
                {selectedJob.location}
              </p>
              <p>
                <span className="font-semibold text-teal-600">
                  Description:
                </span>{" "}
                {selectedJob.description}
              </p>
              <p>
                <span className="font-semibold text-teal-600">Skills:</span>{" "}
                {selectedJob.Skills}
              </p>
              <p>
                <span className="font-semibold text-teal-600">
                  Requirements:
                </span>{" "}
                {selectedJob.requirements}
              </p>
              <p>
                <span className="font-semibold text-teal-600">Salary:</span>{" "}
                {selectedJob.salary}
              </p>
              <p>
                <span className="font-semibold text-teal-600">Job Type:</span>{" "}
                {selectedJob.jobType}
              </p>
              <p>
                <span className="font-semibold text-teal-600">Posted:</span>{" "}
                {selectedJob.posted}
              </p>
              <p>
                <span className="font-semibold text-teal-600">
                  Applied Date:
                </span>{" "}
                {new Date(selectedJob.appliedAt).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold text-teal-600">Status:</span>{" "}
                {selectedJob.status}
              </p>
              <p>
                <span className="font-semibold text-teal-600">Deadline:</span>{" "}
                {selectedJob.deadline}
              </p>
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm border-none bg-teal-500 hover:bg-teal-600 text-white">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AppliedJobs;
