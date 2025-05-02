"use client";

import { useState } from "react";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "@/Providers/AppProviders";
import { Dialog } from "@headlessui/react";
import Chat from "@/app/jobSeeker/chatbox/components/chat";
import { Edit } from "lucide-react";
import EditJob from "./components/EditJob";

const ManageJobs = () => {
  const [edit, setEdit] = useState(null);
  // const [selectedJobForApplicants, setSelectedJobForApplicants] =
  //   useState(null);
  // const [applicants, setApplicants] = useState([]);
  // const [isApplicantsModalOpen, setIsApplicantsModalOpen] = useState(false);
  const [chatApplicant, setChatApplicant] = useState(null);
  const { currentUser } = useAppContext();

  const fetchJobs = async () => {
    const res = await axios("/api/allJobs", {
      params: { postedById: currentUser?._id },
    });
    return res.data;
  };

  const {
    data: jobs,
    isLoading,
    refetch: refetchJobs,
  } = useQuery({
    queryKey: ["jobs", currentUser?._id],
    queryFn: fetchJobs,
    enabled: !!currentUser?._id,
  });

  const deleteJob = useMutation({
    mutationFn: (id) => axios.delete(`/api/jobDelete/${id}`),
    onSuccess: () => {
      Swal.fire("Deleted!", "Job removed successfully", "success");
      refetchJobs();
    },
    onError: () => Swal.fire("Error", "Couldn’t delete job", "error"),
  });
  console.log("this is my jobs", jobs);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#14b8a6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      background: "#D5F5F6",
      width: 300,
    }).then((res) => res.isConfirmed && deleteJob.mutate(id));
  };

  // const handleViewApplicants = async (job) => {
  //   try {
  //     const res = await axios.get(`/api/employer/applicants/${job._id}`);
  //     setApplicants(res.data || []);
  //     setSelectedJobForApplicants(job);
  //     setIsApplicantsModalOpen(true);
  //   } catch (error) {
  //     console.error(error);
  //     Swal.fire({ icon: "error", title: "Failed to load applicants!" });
  //   }
  // };

  const handleStartChat = (applicant) => {
    console.log("Starting chat with applicant:", applicant);
    setChatApplicant(applicant);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-teal-600 font-semibold text-xl">Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Manage Jobs</h1>
      <div className="overflow-x-auto">
        <table className="table-class">
          <thead className="table-head-class">
            <tr className="table-head-row-class">
              <th>Title</th>
              <th>Category</th>
              <th>Type</th>
              <th>Salary</th>
              <th>Deadline</th>
              <th>AppliedCount</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {jobs?.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-400">
                  No jobs posted yet.
                </td>
              </tr>
            ) : (
              jobs?.map((job) => (
                <tr key={job._id} className="table-row-class">
                  <td>{job.title}</td>
                  <td>{job.category}</td>
                  <td>{job.type}</td>
                  <td>
                    {job.minSalary}k – {job.maxSalary}k
                  </td>
                  <td>{new Date(job.meta?.deadline).toLocaleDateString()}</td>
                  <td>{job.meta.appliedCount}</td>
                  <td>
                    <div className="flex flex-wrap justify-center gap-2">
                      <Edit
                        onClick={() => setEdit(job._id)}
                        className="h-5 w-5 text-teal-600 cursor-pointer hover:scale-110 transition"
                      />
                      <div
                        className={`${
                          edit === job._id ? "block" : "hidden"
                        } fixed w-screen h-screen top-0 left-0 bg-black/50 flex items-center justify-center`}
                      >
                        <div className="max-w-4xl mx-auto h-3/4 overflow-y-auto  bg-white shadow-2xl rounded-3xl p-4 lg:p-6 border ">
                          <EditJob
                            job={job}
                            setEdit={setEdit}
                            refetchJobs={refetchJobs}
                          />
                        </div>
                      </div>
                      <TrashIcon
                        onClick={() => handleDelete(job._id)}
                        className="h-5 w-5 text-red-500 cursor-pointer hover:scale-110 transition"
                      />
                      {/* <button
                        onClick={() => handleViewApplicants(job)}
                        className="bg-teal-100 text-teal-700 px-2 py-1 rounded text-xs hover:bg-teal-200 transition"
                      >
                        View Applicants
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Applicants Modal */}
      {/* <Dialog
        open={isApplicantsModalOpen}
        onClose={() => setIsApplicantsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md rounded bg-white p-6">
            <Dialog.Title className="text-lg font-bold mb-4">
              Applicants for: {selectedJobForApplicants?.title}
            </Dialog.Title>

            {applicants.length === 0 ? (
              <p className="text-gray-500 text-center">No applicants yet.</p>
            ) : (
              <ul className="space-y-3">
                {applicants.map((applicant, index) => (
                  <li
                    key={index}
                    className="p-2 border rounded flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">
                        {applicant?.candidateName || "Unknown"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {applicant?.candidateEmail}
                      </p>
                    </div>
                    <button
                      onClick={() => handleStartChat(applicant)}
                      className="text-teal-600 hover:underline text-sm"
                    >
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
          </Dialog.Panel>
        </div>
      </Dialog> */}
      {/* Chat Modal */}
      {/* <Dialog
        open={!!chatApplicant}
        onClose={() => setChatApplicant(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto w-full max-w-lg rounded-lg bg-white p-6">
            <Dialog.Title className="text-lg font-bold mb-4">
              Chat with {chatApplicant?.candidateName}
            </Dialog.Title>

            <Chat
              roomId={generateRoomId(
                currentUser?.email,
                chatApplicant?.candidateEmail
              )}
              userType="employer"
            />

            <div className="text-right mt-4">
              <button
                onClick={() => setChatApplicant(null)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog> */}
    </div>
  );
};

export default ManageJobs;

// Helper function
// function generateRoomId(email1, email2) {
//   return [email1, email2].sort().join("_");
// }
