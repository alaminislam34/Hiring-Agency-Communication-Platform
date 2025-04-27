// "use client";

// import { useAppContext } from "@/Providers/AppProviders";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import { useState } from "react";
// import {
//   PencilSquareIcon,
//   TrashIcon,
//   EyeIcon,
// } from "@heroicons/react/24/outline";
// import Swal from "sweetalert2";
// import EditJobTwoStep from "./components/EditJob";

// const ManageJobs = () => {
//   const { currentUser } = useAppContext();

//   const [viewJob, setViewJob] = useState(null);
//   const [editJob, setEditJob] = useState(null);

//   /* -------- fetch all jobs by employer -------- */
//   const fetchJobs = async () => {
//     const res = await axios.get("/api/allJobs", {
//       params: { postedBy: currentUser?.email },
//     });
//     return res.data; // array
//   };

//   const {
//     data: jobs = [],
//     isLoading,
//     refetch: refetchJobs,
//   } = useQuery({
//     queryKey: ["jobs", currentUser?.email],
//     queryFn: fetchJobs,
//     enabled: !!currentUser?.email,
//   });

//   /* -------- delete job -------- */
//   const deleteJob = useMutation({
//     mutationFn: (id) => axios.delete(`/api/job/${id}`),
//     onSuccess: () => {
//       Swal.fire("Deleted!", "Job removed successfully", "success");
//       refetchJobs();
//     },
//     onError: () => Swal.fire("Error", "Couldn’t delete job", "error"),
//   });

//   /* -------- handlers -------- */
//   const handleDelete = (job) => {
//     Swal.fire({
//       title: "Delete?",
//       text: "Are you sure you want to remove this job?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#14b8a6",
//       cancelButtonColor: "#d33",
//     }).then((res) => res.isConfirmed && deleteJob.mutate(job._id));
//   };

//   /* ------------- UI ------------- */
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold text-teal-600 mb-6">
//         📋 Manage Your Posted Jobs
//       </h1>

//       {/* ---------- Jobs Table ---------- */}
//       <div className="overflow-x-auto rounded-lg shadow bg-white">
//         <table className="min-w-full text-sm">
//           <thead className="bg-teal-50 text-teal-700 uppercase text-xs">
//             <tr className="*:px-4 *:py-2 text-left">
//               <th className="">Title</th>
//               <th className="">Company</th>
//               <th className="">Salary</th>
//               <th className="">Deadline</th>
//               <th className="">Type</th>
//               <th className="">Category</th>
//               <th className=" text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {isLoading ? (
//               <tr>
//                 <td colSpan={7} className="py-8 text-center">
//                   Loading…
//                 </td>
//               </tr>
//             ) : jobs.length ? (
//               jobs.map((job) => (
//                 <tr
//                   key={job._id}
//                   className="border-b border-gray-300 hover:bg-teal-50 transition"
//                 >
//                   <td className="px-5 py-3 font-medium">{job.title}</td>
//                   <td className="px-5 py-3">{job.company}</td>
//                   <td className="px-5 py-3">
//                     {job?.salary?.min}k – {job?.salary?.max}k
//                   </td>
//                   <td className="px-5 py-3">
//                     {new Date(job?.meta?.deadline).toLocaleDateString()}
//                   </td>
//                   <td className="px-5 py-3">{job.type}</td>
//                   <td className="px-5 py-3">{job?.details?.category}</td>
//                   <td className="px-5 py-3">
//                     <div className="flex justify-center gap-3">
//                       <EyeIcon
//                         onClick={() => setViewJob(job)}
//                         className="h-5 w-5 text-teal-600 cursor-pointer hover:scale-110 transition"
//                       />
//                       <PencilSquareIcon
//                         onClick={() => setEditJob(job)}
//                         className="h-5 w-5 text-amber-500 cursor-pointer hover:scale-110 transition"
//                       />
//                       <TrashIcon
//                         onClick={() => handleDelete(job)}
//                         className="h-5 w-5 text-red-500 cursor-pointer hover:scale-110 transition"
//                       />
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={7} className="py-8 text-center text-gray-500">
//                   No jobs posted yet.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* ---------- View Modal ---------- */}
//       {viewJob && (
//         <Modal onClose={() => setViewJob(null)}>
//           <h2 className="text-xl font-semibold text-teal-700 mb-4">
//             {viewJob.title}
//           </h2>
//           <p className="mb-2">
//             <span className="font-semibold">Company:</span> {viewJob.company}
//           </p>
//           <p className="mb-2">
//             <span className="font-semibold">Location:</span> {viewJob.location}
//           </p>
//           <p className="mb-2">
//             <span className="font-semibold">Salary:</span> {viewJob.salary.min}k
//             – {viewJob.salary.max}k
//           </p>
//           <p className="mb-2">
//             <span className="font-semibold">Deadline:</span>{" "}
//             {new Date(viewJob.meta.deadline).toLocaleDateString()}
//           </p>
//           <p className="mb-2">
//             <span className="font-semibold">Type:</span> {viewJob.type}
//           </p>
//           <p className="mb-4">
//             <span className="font-semibold">Category:</span>{" "}
//             {viewJob.details.category}
//           </p>
//           <h3 className="font-semibold text-teal-600 mb-1">Description</h3>
//           <p className="text-sm text-gray-700 whitespace-pre-line">
//             {viewJob.details.description}
//           </p>
//         </Modal>
//       )}

//       {/* ---------- Edit Modal ---------- */}
//       {editJob && (
//         <Modal onClose={() => setEditJob(null)}>
//           <EditJobTwoStep
//             job={editJob}
//             onSave={async (payload) => {
//               try {
//                 await axios.put(`/api/editJob/${editJob._id}`, payload);
//                 Swal.fire("Saved!", "Job updated successfully", "success");
//                 setEditJob(null);
//                 refetchJobs();
//               } catch {
//                 Swal.fire("Error", "Update failed", "error");
//               }
//             }}
//             onCancel={() => setEditJob(null)}
//           />
//         </Modal>
//       )}
//     </div>
//   );
// };

// /* ---------- Reusable Modal component ---------- */
// const Modal = ({ children, onClose }) => (
//   <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
//     <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative">
//       <button
//         onClick={onClose}
//         className="absolute top-2 right-3 text-gray-400 hover:text-gray-600"
//       >
//         ✕
//       </button>
//       {children}
//     </div>
//   </div>
// );

// export default ManageJobs;

//view applicants soho code

//2

// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   EyeIcon,
//   PencilSquareIcon,
//   TrashIcon,
// } from "@heroicons/react/24/solid";
// import Swal from "sweetalert2";

// const ManageJobs = () => {
//   const [viewJob, setViewJob] = useState(null);
//   const [editJob, setEditJob] = useState(null);
//   const [selectedJobForApplicants, setSelectedJobForApplicants] =
//     useState(null);
//   const [applicants, setApplicants] = useState([]);
//   const [isApplicantsModalOpen, setIsApplicantsModalOpen] = useState(false);

//   const [jobs, setJobs] = useState([]);

//   // Fetch all jobs (example: initial loading)
//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await axios.get("/api/allJobs"); // Make sure your backend has this endpoint
//         setJobs(res.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchJobs();
//   }, []);

//   // View Applicants Handler
//   const handleViewApplicants = async (job) => {
//     try {
//       const res = await axios.get(`/applications?jobId=${job._id}`);
//       setApplicants(res.data);
//       setSelectedJobForApplicants(job);
//       setIsApplicantsModalOpen(true);
//     } catch (error) {
//       console.error(error);
//       Swal.fire({
//         icon: "error",
//         title: "Failed to load applicants!",
//       });
//     }
//   };

// <<<<<<< HEAD
//   // Delete Job Handler
//   const handleDelete = async (job) => {
//     try {
//       const res = await axios.delete(`/jobs/${job._id}`);
//       if (res.data.deletedCount > 0) {
//         Swal.fire({
//           icon: "success",
//           title: "Job Deleted Successfully!",
//         });
//         setJobs(jobs.filter((item) => item._id !== job._id));
//       }
//     } catch (error) {
//       console.error(error);
//       Swal.fire({
//         icon: "error",
//         title: "Failed to delete job!",
//       });
//     }
// =======
//   const {
//     data: jobs = [],
//     isLoading,
//     refetch: refetchJobs,
//   } = useQuery({
//     queryKey: ["jobs", currentUser?.email],
//     queryFn: fetchJobs,
//     enabled: !!currentUser?.email,
//   });

//   /* -------- delete job -------- */
//   const deleteJob = useMutation({
//     mutationFn: (id) => axios.delete(`/api/job/${id}`),
//     onSuccess: () => {
//       Swal.fire("Deleted!", "Job removed successfully", "success");
//       refetchJobs();
//     },
//     onError: () => Swal.fire("Error", "Couldn’t delete job", "error"),
//   });

//   /* -------- handlers -------- */
//   const handleDelete = (job) => {
//     Swal.fire({
//       title: "Are you sure ?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#14b8a6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Delete",
//       timer: 1500,
//       width: 300,
//       background: "#D5F5F6",
//       animation: true,
//     }).then((res) => res.isConfirmed && deleteJob.mutate(job._id));
// >>>>>>> 44dc98fa1cd84fa1d2a15eb215160d6f72b40da6
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-semibold mb-6">Manage Jobs</h1>

//       <div className="overflow-x-auto">
//         <table className="table w-full">
//           <thead>
//             <tr className="bg-teal-100">
//               <th>Title</th>
//               <th>Company</th>
//               <th>Category</th>
//               <th>Type</th>
//               <th>Salary</th>
//               <th>Deadline</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {jobs?.map((job) => (
//               <tr key={job?._id}>
//                 <td>{job?.title}</td>
//                 <td>{job?.company}</td>
//                 <td>{job?.category}</td>
//                 <td>{job?.type}</td>
//                 <td>
//                   {job?.salary?.min}k – {job?.salary?.max}k
//                 </td>
//                 <td>{new Date(job?.meta?.deadline).toLocaleDateString()}</td>
//                 <td>
//                   <div className="flex justify-center gap-3">
//                     {/* View Job Details */}
//                     <EyeIcon
//                       onClick={() => setViewJob(job)}
//                       className="h-5 w-5 text-teal-600 cursor-pointer hover:scale-110 transition"
//                     />
//                     {/* Edit Job */}
//                     <PencilSquareIcon
//                       onClick={() => setEditJob(job)}
//                       className="h-5 w-5 text-amber-500 cursor-pointer hover:scale-110 transition"
//                     />
//                     {/* Delete Job */}
//                     <TrashIcon
//                       onClick={() => handleDelete(job)}
//                       className="h-5 w-5 text-red-500 cursor-pointer hover:scale-110 transition"
//                     />
//                     {/* View Applicants */}
//                     <button
//                       onClick={() => handleViewApplicants(job)}
//                       className="bg-teal-100 text-teal-700 px-2 py-1 rounded text-xs hover:bg-teal-200 transition"
//                     >
//                       View Applicants
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Applicants Modal */}
//       {isApplicantsModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto">
//             <h2 className="text-xl font-semibold mb-4">
//               Applicants for: {selectedJobForApplicants?.jobTitle}
//             </h2>

//             {applicants.length === 0 ? (
//               <p className="text-gray-500 text-center">No applicants yet.</p>
//             ) : (
//               <ul className="space-y-3">
//                 {applicants.map((applicant) => (
//                   <li
//                     key={applicant._id}
//                     className="p-2 border rounded flex justify-between items-center"
//                   >
//                     <div>
//                       <p className="font-medium">{applicant.name}</p>
//                       <p className="text-sm text-gray-500">{applicant.email}</p>
//                     </div>
//                     <button className="text-teal-600 hover:underline text-sm">
//                       Chat
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             )}

//             <div className="text-right mt-6">
//               <button
//                 onClick={() => setIsApplicantsModalOpen(false)}
//                 className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageJobs;

//3

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import Swal from "sweetalert2";

const ManageJobs = () => {
  const [viewJob, setViewJob] = useState(null);
  const [editJob, setEditJob] = useState(null);
  const [selectedJobForApplicants, setSelectedJobForApplicants] =
    useState(null);
  const [applicants, setApplicants] = useState([]);
  const [isApplicantsModalOpen, setIsApplicantsModalOpen] = useState(false);

  // const [jobs, setJobs] = useState([]);

  // Fetch all jobs (example: initial loading)
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("/api/allJobs"); // Make sure your backend has this endpoint
        setJobs(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);

  // View Applicants Handler
  const handleViewApplicants = async (job) => {
    try {
      const res = await axios.get(`/applications?jobId=${job._id}`);
      setApplicants(res.data);
      setSelectedJobForApplicants(job);
      setIsApplicantsModalOpen(true);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed to load applicants!",
      });
    }
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Manage Jobs</h1>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-teal-100">
              <th>Title</th>
              <th>Company</th>
              <th>Category</th>
              <th>Type</th>
              <th>Salary</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {jobs?.map((job) => (
              <tr key={job?._id}>
                <td>{job?.title}</td>
                <td>{job?.company}</td>
                <td>{job?.category}</td>
                <td>{job?.type}</td>
                <td>
                  {job?.salary?.min}k – {job?.salary?.max}k
                </td>
                <td>{new Date(job?.meta?.deadline).toLocaleDateString()}</td>
                <td>
                  <div className="flex justify-center gap-3">
                    {/* View Job Details */}
                    <EyeIcon
                      onClick={() => setViewJob(job)}
                      className="h-5 w-5 text-teal-600 cursor-pointer hover:scale-110 transition"
                    />
                    {/* Edit Job */}
                    <PencilSquareIcon
                      onClick={() => setEditJob(job)}
                      className="h-5 w-5 text-amber-500 cursor-pointer hover:scale-110 transition"
                    />
                    {/* Delete Job */}
                    <TrashIcon
                      onClick={() => handleDelete(job)}
                      className="h-5 w-5 text-red-500 cursor-pointer hover:scale-110 transition"
                    />
                    {/* View Applicants */}
                    <button
                      onClick={() => handleViewApplicants(job)}
                      className="bg-teal-100 text-teal-700 px-2 py-1 rounded text-xs hover:bg-teal-200 transition"
                    >
                      View Applicants
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Applicants Modal */}
      {isApplicantsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              Applicants for: {selectedJobForApplicants?.jobTitle}
            </h2>

            {applicants.length === 0 ? (
              <p className="text-gray-500 text-center">No applicants yet.</p>
            ) : (
              <ul className="space-y-3">
                {applicants.map((applicant) => (
                  <li
                    key={applicant._id}
                    className="p-2 border rounded flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{applicant.name}</p>
                      <p className="text-sm text-gray-500">{applicant.email}</p>
                    </div>
                    <button className="text-teal-600 hover:underline text-sm">
                      Chat
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="text-right mt-6">
              <button
                onClick={() => setIsApplicantsModalOpen(false)}
                className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageJobs;
