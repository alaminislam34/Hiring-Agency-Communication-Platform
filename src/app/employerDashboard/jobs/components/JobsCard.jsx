"use client";
import { RiDeleteBin6Line } from "react-icons/ri";
import JobDetailsModal from "./JobDetailsModal";
import { useState, useEffect } from "react";
import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import "sweetalert2/src/sweetalert2.scss";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const jobs = async () => {
      const res = await axios.get(`/api/jobs`);
      setJobs(res.data);
    };
    jobs();
  }, []);

  // // ✅ Delete job using useQuery (trigger manually)
  // const { refetch: deleteRefetch } = useQuery({
  //   queryKey: ["deleteJob"],
  //   queryFn: handleDelete,
  //   enabled: false,
  // });

  // // ✅ Handle Delete
  // const handleDelete = (id) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       const res = axios.delete(`/api/jobDelete/${id}`);
  //       console.log(res.data);
  //       deleteRefetch();
  //       Swal.fire({
  //         title: "Deleted!",
  //         text: "Your job has been deleted.",
  //         icon: "success",
  //       });
  //     }
  //   });
  // };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-4">Job Listings</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse text-sm table">
          <thead className="bg-gray-100 text-gray-700 uppercase text-left">
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
            {jobs.map((job) => (
              <tr key={job._id} className="hover:bg-gray-50">
                <td className="font-medium">{job.jobTitle}</td>
                <td>{job.companyName}</td>
                <td>{job.location}</td>
                <td>
                  {job.minSalary} - {job.maxSalary} {job.currency}
                </td>
                <td>{job.jobType}</td>
                <td>{new Date(job.postDate).toISOString().split("T")[0]}</td>
                <td>{new Date(job.deadline).toISOString().split("T")[0]}</td>
                <td className="text-center flex flex-row gap-1">
                  <button
                    onClick={() =>
                      document.getElementById(`my_modal_${job._id}`).showModal()
                    }
                    className="p-2 bg-blue-400 hover:bg-blue-500 text-white rounded-md cursor-pointer"
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
                    // onClick={() => handleDelete(job._id)}
                  >
                    <RiDeleteBin6Line />
                  </button>
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
