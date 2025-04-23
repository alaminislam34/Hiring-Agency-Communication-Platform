"use client";
import { useAppContext } from "@/Providers/AppProviders";
import CandidatesDetails from "./components/CandidatesDetails";
import { RiDeleteBin6Line } from "react-icons/ri";

const Candidates = () => {
  const { jobs, currentUser, appliedJobsCollection } = useAppContext();
  const myJobs = jobs?.filter(
    (job) => job.employerEmail === currentUser?.email
  );
  const ids = myJobs?.map((job) => job.jobId) || [];
  const candidatesApplications =
    appliedJobsCollection?.filter((job) => ids.includes(job._id)) || [];

  return (
    <div className="mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold border-b pb-2">Candidates</h1>
      <div className="overflow-x-auto bg-white shadow-xl rounded-xl border border-teal-500">
        <table className="w-full border-collapse text-sm table">
          <thead className="uppercase text-sm text-left">
            <tr>
              <th>Candidate</th>
              <th>Job Title</th>
              <th>Job Type</th>
              <th>Deadline</th>
              <th className=" text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="">
            {candidatesApplications?.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center">
                  No jobs found
                </td>
              </tr>
            )}
            {candidatesApplications?.map((job) => (
              <tr key={job._id} className="hover:bg-teal-50 ">
                <td className="font-medium">{job.candidateName}</td>
                <td>{job.jobTitle}</td>
                <td>{job.jobType}</td>
                <td className="flex items-center gap-2">
                  {new Date(job.postDate).toISOString().split("T")[0]} -{" "}
                  {new Date(job.deadline).toISOString().split("T")[0]}
                </td>
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
                        <CandidatesDetails job={job} />
                      </div>
                    </dialog>
                    <button className="p-2 bg-red-400 hover:bg-red-500 text-white rounded-md cursor-pointer">
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

export default Candidates;
