"use client";

import { useAppContext } from "@/Providers/AppProviders";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { CheckCircle, XCircle, Eye, Trash2 } from "lucide-react"; // optional icons

const ManageJobs = () => {
  const { currentUser } = useAppContext();
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
              <th className="">Title</th>
              <th className="">Company</th>
              <th className="">Salary</th>
              <th className="">Deadline</th>
              <th className="">Type</th>
              <th className="">Category</th>
              <th className="">Status</th>
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
                  <td className="py-3 px-4">{job.title}</td>
                  <td className="py-3 px-4">{job.industry}</td>
                  <td className="py-3 px-4">
                    {job.minSalary} – {job.maxSalary} ({job.salaryType})
                  </td>
                  <td className="py-3 px-4">
                    {new Date(job.meta.deadline).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">{job.type}</td>
                  <td className="py-3 px-4">{job.category}</td>
                  <td className="py-3 px-4 capitalize">{job.status}</td>
                  <td className="py-3 px-4 flex items-center justify-center gap-2">
                    {/* View */}
                    <button
                      onClick={() => setViewJob(job)}
                      className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    {job.status !== "active" && (
                      <>
                        <button
                          onClick={() => handleStatus(job, "active")}
                          className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-600 rounded-full hover:bg-green-200"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleStatus(job, "deactivated")}
                          className="w-8 h-8 flex items-center justify-center bg-yellow-100 text-yellow-600 rounded-full hover:bg-yellow-200"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </>
                    )}

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(job)}
                      className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
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
          <h2 className="text-xl font-semibold text-teal-700 mb-4">
            {viewJob.title}
          </h2>
          <p>
            <b>Company:</b> {viewJob.industry}
          </p>
          <p>
            <b>Location:</b> {viewJob.location}
          </p>
          <p>
            <b>Salary:</b> {viewJob.minSalary} – {viewJob.maxSalary} (
            {viewJob.salaryType})
          </p>
          <p>
            <b>Deadline:</b>{" "}
            {new Date(viewJob.meta.deadline).toLocaleDateString()}
          </p>
          <p>
            <b>Type:</b> {viewJob.type}
          </p>
          <p>
            <b>Category:</b> {viewJob.category}
          </p>
          <h3 className="font-semibold text-teal-600 mt-4">Description</h3>
          <p className="text-gray-700 whitespace-pre-line mt-1">
            {viewJob.description}
          </p>
        </Modal>
      )}
    </div>
  );
};

const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
      <button
        onClick={onClose}
        className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl"
      >
        ✕
      </button>
      {children}
    </div>
  </div>
);

export default ManageJobs;
