"use client";

import { useAppContext } from "@/Providers/AppProviders";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import EditJobTwoStep from "./components/EditJob";

const ManageJobs = () => {
  const { currentUser } = useAppContext();

  const [viewJob, setViewJob] = useState(null);
  const [editJob, setEditJob] = useState(null); // ← এডিটের জন্য পুরো অবজেক্ট

  /* -------- fetch all jobs by employer -------- */
  const fetchJobs = async () => {
    const res = await axios.get("/api/allJobs", {
      params: { postedBy: currentUser?.email },
    });
    return res.data; // array
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

  /* -------- delete job -------- */
  const deleteJob = useMutation({
    mutationFn: (id) => axios.delete(`/api/job/${id}`),
    onSuccess: () => {
      Swal.fire("Deleted!", "Job removed successfully", "success");
      refetchJobs();
    },
    onError: () => Swal.fire("Error", "Couldn’t delete job", "error"),
  });

  /* -------- handlers -------- */
  const handleDelete = (job) => {
    Swal.fire({
      title: "Are you sure ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#14b8a6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      timer: 1500,
      width: 300,
      background: "#D5F5F6",
      animation: true,
    }).then((res) => res.isConfirmed && deleteJob.mutate(job._id));
  };

  /* ------------- UI ------------- */
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-teal-600 mb-6">
        📋 Manage Your Posted Jobs
      </h1>

      {/* ---------- Jobs Table ---------- */}
      <div className="overflow-x-auto rounded-lg shadow bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-teal-50 text-teal-700 uppercase text-xs">
            <tr className="*:px-4 *:py-2 text-left">
              <th className="">Title</th>
              <th className="">Company</th>
              <th className="">Salary</th>
              <th className="">Deadline</th>
              <th className="">Type</th>
              <th className="">Category</th>
              <th className=" text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="py-8 text-center">
                  Loading…
                </td>
              </tr>
            ) : jobs.length ? (
              jobs.map((job) => (
                <tr
                  key={job._id}
                  className="border-b border-gray-300 hover:bg-teal-50 transition"
                >
                  <td className="px-5 py-3 font-medium">{job.title}</td>
                  <td className="px-5 py-3">{job.company}</td>
                  <td className="px-5 py-3">
                    {job.salary.min}k – {job.salary.max}k
                  </td>
                  <td className="px-5 py-3">
                    {new Date(job.meta.deadline).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3">{job.type}</td>
                  <td className="px-5 py-3">{job.details.category}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-center gap-3">
                      <EyeIcon
                        onClick={() => setViewJob(job)}
                        className="h-5 w-5 text-teal-600 cursor-pointer hover:scale-110 transition"
                      />
                      <PencilSquareIcon
                        onClick={() => setEditJob(job)}
                        className="h-5 w-5 text-amber-500 cursor-pointer hover:scale-110 transition"
                      />
                      <TrashIcon
                        onClick={() => handleDelete(job)}
                        className="h-5 w-5 text-red-500 cursor-pointer hover:scale-110 transition"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">
                  No jobs posted yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ---------- View Modal ---------- */}
      {viewJob && (
        <Modal onClose={() => setViewJob(null)}>
          <h2 className="text-xl font-semibold text-teal-700 mb-4">
            {viewJob.title}
          </h2>
          <p className="mb-2">
            <span className="font-semibold">Company:</span> {viewJob.company}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Location:</span> {viewJob.location}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Salary:</span> {viewJob.salary.min}k
            – {viewJob.salary.max}k
          </p>
          <p className="mb-2">
            <span className="font-semibold">Deadline:</span>{" "}
            {new Date(viewJob.meta.deadline).toLocaleDateString()}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Type:</span> {viewJob.type}
          </p>
          <p className="mb-4">
            <span className="font-semibold">Category:</span>{" "}
            {viewJob.details.category}
          </p>
          <h3 className="font-semibold text-teal-600 mb-1">Description</h3>
          <p className="text-sm text-gray-700 whitespace-pre-line">
            {viewJob.details.description}
          </p>
        </Modal>
      )}

      {/* ---------- Edit Modal ---------- */}
      {editJob && (
        <Modal onClose={() => setEditJob(null)}>
          <EditJobTwoStep
            job={editJob}
            onSave={async (payload) => {
              try {
                await axios.put(`/api/editJob/${editJob._id}`, payload);
                Swal.fire("Saved!", "Job updated successfully", "success");
                setEditJob(null);
                refetchJobs();
              } catch {
                Swal.fire("Error", "Update failed", "error");
              }
            }}
            onCancel={() => setEditJob(null)}
          />
        </Modal>
      )}
    </div>
  );
};

/* ---------- Reusable Modal component ---------- */
const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-3 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>
      {children}
    </div>
  </div>
);

export default ManageJobs;
