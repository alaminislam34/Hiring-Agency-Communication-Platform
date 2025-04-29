"use client";

import { useAppContext } from "@/Providers/AppProviders";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { CheckCircle, XCircle, Eye, Trash2 } from "lucide-react"; // optional icons
import { EllipsisVertical } from "lucide-react";

const ManageJobs = () => {
  const { currentUser } = useAppContext();
  const [actions, setActions] = useState(false);
  const [viewJob, setViewJob] = useState(null);

  // Fetch Jobs
  const fetchJobs = async () => {
    const res = await axios.get("/api/allJobs");
    return res.data;
  };

  const {
    data: jobs = [],
    isLoading,
    refetch: refetchJobs,
  } = useQuery({
    queryKey: ["jobs", currentUser?.email],
    queryFn: fetchJobs,
    enabled: !!currentUser?.email,
  });

  // Delete Job
  const deleteJob = useMutation({
    mutationFn: (id) => axios.delete(`/api/jobDelete/${id}`),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        text: "Job removed successfully",
        timer: 1500,
        showConfirmButton: false,
        background: "#D5F5F6",
        width: 300,
      });
      setActions(false);
      refetchJobs();
    },
    onError: () =>
      Swal.fire({
        icon: "error",
        text: "Couldn’t delete job",
        timer: 1500,
        showConfirmButton: false,
        background: "#D5F5F6",
        width: 300,
      }),
  });

  // Update Status
  const updateJobStatus = useMutation({
    mutationFn: ({ id, status }) => axios.put(`/api/job/${id}`, { status }),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        text: "Job status updated successfully",
        timer: 1500,
        showConfirmButton: false,
        background: "#D5F5F6",
        width: 300,
      });
      setActions(false);
      refetchJobs();
    },
    onError: () =>
      Swal.fire({
        icon: "error",
        text: "Couldn’t update job status",
        timer: 1500,
        showConfirmButton: false,
        background: "#D5F5F6",
        width: 300,
      }),
  });

  // Handlers
  const handleDelete = (job) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#14b8a6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      width: 300,
      background: "#D5F5F6",
    }).then((res) => res.isConfirmed && deleteJob.mutate(job._id));
  };

  const handleStatus = (job, status) => {
    Swal.fire({
      text: `Are you sure you want to ${
        status === "active" ? "accept" : "reject"
      } this job?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#14b8a6",
      cancelButtonColor: "#d33",
      confirmButtonText: status === "active" ? "Approve" : "Reject",
      width: 300,
      background: "#D5F5F6",
    }).then((res) => {
      if (res.isConfirmed) {
        updateJobStatus.mutate({ id: job._id, status });
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-teal-700">
        📋 Manage Your Posted Jobs
      </h2>

      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="table-class">
          <thead className="table-head-class">
            <tr className="table-head-row-class">
              <th>Title</th>
              <th>Company</th>
              <th>Salary</th>
              <th>Deadline</th>
              <th>Type</th>
              <th>Category</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  Loading jobs...
                </td>
              </tr>
            ) : jobs.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  No jobs found.
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job._id} className="table-row-class">
                  <td>{job.title}</td>
                  <td>{job.industry}</td>
                  <td>
                    {job.minSalary} – {job.maxSalary} ({job.salaryType})
                  </td>
                  <td>{new Date(job.meta.deadline).toLocaleDateString()}</td>
                  <td>{job.type}</td>
                  <td>{job.category}</td>
                  <td>{job.status}</td>
                  <td className="flex items-center justify-center gap-2">
                    {/* View */}
                    <button
                      onClick={() => setViewJob(job)}
                      className="w-8 h-8 flex items-center cursor-pointer justify-center bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
                    >
                      <Eye size={18} />
                    </button>
                    <div className="relative">
                      <button
                        onClick={() =>
                          setActions(actions === job._id ? false : job._id)
                        }
                        className="py-1 px-1 cursor-pointer bg-teal-200 hover:bg-teal-500 rounded-xl "
                      >
                        <EllipsisVertical size={18} />
                      </button>
                      <div
                        className={`${
                          actions === job._id
                            ? "opacity-100"
                            : "opacity-0 scale-75 pointer-events-none"
                        } absolute duration-300 bottom-0 right-8 px-2 py-1 rounded-lg flex flex-row gap-2 shadow-md bg-white z-20 border border-gray-200 items-center justify-center`}
                      >
                        <button
                          onClick={() => handleStatus(job, "active")}
                          className="accept-btn"
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button
                          onClick={() => handleStatus(job, "deactivate")}
                          className="reject-btn"
                        >
                          <XCircle size={18} />
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(job)}
                          className="delete-btn"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {viewJob && (
        <Modal onClose={() => setViewJob(null)}>
          <h2 className=" text-teal-700 mb-4">{viewJob.title}</h2>
          <p>
            <span className="text-gray-600 mr-2">Company:</span>{" "}
            {viewJob.meta.companyName}
          </p>
          <p>
            <span className="text-gray-600 mr-2">Location:</span>{" "}
            {viewJob.location}
          </p>
          <p>
            <span className="text-gray-600 mr-2">Salary:</span>{" "}
            {viewJob.minSalary} – {viewJob.maxSalary} ({viewJob.salaryType})
          </p>
          <p>
            <span className="text-gray-600 mr-2">Deadline:</span>{" "}
            {new Date(viewJob.meta.deadline).toLocaleDateString()}
          </p>
          <p>
            <span className="text-gray-600 mr-2">Type:</span> {viewJob.type}
          </p>
          <p>
            <span className="text-gray-600 mr-2">Category:</span>{" "}
            {viewJob.category}
          </p>
          <h3 className="font-semibold text-teal-600 mt-4">Description</h3>
          <p className="text-gray-700 whitespace-pre-line mt-1">
            {viewJob.description}
          </p>
          <h3 className="font-semibold text-teal-600 mt-4">Requirements: </h3>
          <p className="text-gray-700 whitespace-pre-line mt-1">
            {viewJob.requirements}
          </p>
          <h3 className="font-semibold text-teal-600 mt-4">Benefits: </h3>
          <p className="text-gray-700 whitespace-pre-line mt-1">
            {viewJob.benefits}
          </p>
        </Modal>
      )}
    </div>
  );
};

const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg max-w-2xl max-h-[500px] overflow-y-auto w-full p-6 relative">
      <button
        onClick={onClose}
        className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl cursor-pointer"
      >
        ✕
      </button>
      {children}
    </div>
  </div>
);

export default ManageJobs;
