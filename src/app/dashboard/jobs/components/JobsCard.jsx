"use client";
import { RiDeleteBin6Line } from "react-icons/ri";
import JobDetailsModal from "./JobDetailsModal";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import JobAddModal from "./JobAddModal";
import { useAppContext } from "@/Providers/AppProviders";
// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import "sweetalert2/src/sweetalert2.scss";

const JobsPage = () => {
  const { jobs, refetchJobs } = useAppContext();
  console.log(jobs);
  const handleDeleteJob = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`/api/jobDelete/${id.toString()}`);

          if (res.data.deletedCount > 0) {
            refetchJobs();
            Swal.fire({
              title: "Deleted!",
              text: "Your job has been deleted.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Failed!",
              text: "No job was deleted.",
              icon: "error",
            });
          }
        } catch (err) {
          console.error("Delete error:", err);
          Swal.fire({
            title: "Error!",
            text: "Something went wrong.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-xl md:text-2xl font-semibold">Job Listings</h1>

        <JobAddModal />
      </div>
      <div className="overflow-x-auto bg-white shadow-xl rounded-xl border border-[#00847D]">
        <table className="w-full border-collapse text-sm table">
          <thead className="bg-[#00847D] text-white first-letter:uppercase text-sm text-left">
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Salary</th>
              <th>Job Type</th>
              <th>Posted</th>
              <th>Deadline</th>
              <th className=" text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {jobs?.map((job) => (
              <tr key={job._id} className="hover:bg-teal-50 *:border-b">
                <td className="font-medium">{job.jobTitle}</td>
                <td>{job.companyName}</td>
                <td>{job.location}</td>
                <td>
                  {job.minSalary} - {job.maxSalary} {job.currency}
                </td>
                <td>{job.jobType}</td>
                <td>{new Date(job.postDate).toISOString().split("T")[0]}</td>
                <td>{new Date(job.deadline).toISOString().split("T")[0]}</td>
                <td className="">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        document
                          .getElementById(`my_modal_${job._id}`)
                          .showModal()
                      }
                      className="p-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md cursor-pointer"
                    >
                      Details
                    </button>
                    <dialog
                      id={`my_modal_${job._id}`}
                      className="modal modal-middle"
                    >
                      <div className="modal-box relative max-w-5xl w-11/12">
                        <div className="modal-action absolute top-0 right-5">
                          <form method="dialog">
                            <button className="btn">Close</button>
                          </form>
                        </div>
                        <JobDetailsModal id={job._id} />
                      </div>
                    </dialog>
                    <button
                      className="p-2 bg-red-400 hover:bg-red-500 text-white rounded-md cursor-pointer"
                      onClick={() => handleDeleteJob(job._id)}
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobsPage;
