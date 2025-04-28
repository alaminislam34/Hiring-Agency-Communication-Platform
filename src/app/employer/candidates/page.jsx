"use client";

import { sendApplicationReviewEmail } from "@/lib/sendApplicationReview";
import { useAppContext } from "@/Providers/AppProviders";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Candidates = () => {
  const { currentUser, jobs } = useAppContext();
  const [isReview, setIsReview] = useState(false);
  const [myCandidates, setCandidates] = useState([]);
  const { data: appliedJobsCollection, isLoading } = useQuery({
    queryKey: ["appliedJobs"],
    queryFn: async () => {
      const res = await axios("/api/appliedJobs");
      return res.data;
    },
  });
  useEffect(() => {
    if (!currentUser?.email || !jobs?.length || !appliedJobsCollection?.length)
      return;

    // Step 1: Filter jobs posted by the current user
    const myJobs = jobs?.filter(
      (job) => job?.meta?.postedBy === currentUser?.email
    );

    // Step 2: Get IDs of my jobs
    const myJobIds = myJobs?.map((job) => job._id?.toString());

    // Step 3: Filter candidates who applied to my jobs
    const filteredCandidates = appliedJobsCollection?.filter((candidate) =>
      myJobIds.includes(candidate.jobId?.toString())
    );
    console.log(
      "alJobs:",
      jobs,
      "jobsId:",
      myJobIds,
      "filtered candidates:",
      filteredCandidates
    );
    setCandidates(filteredCandidates);
  }, [appliedJobsCollection, jobs, currentUser]);

  const handleCandidates = async (id, status, email) => {
    console.log("id, status, email", id, status, email, user);
    try {
      // Call sendUpdateEmployerRequest to send the email
      await sendApplicationReviewEmail(id, email, status);

      // Display success message
      Swal.fire({
        icon: "success",
        title: "Status Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
        width: 300,
        background: "#D5F5F6",
        animation: true,
      });
      setIsReview(true);
    } catch (error) {
      // Handle any error that occurs while sending the email
      console.error("Error sending email:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Send Email",
        text: "There was an error while sending the update email. Please try again later.",
        showConfirmButton: true,
        timer: 1500,
        width: 300,
        background: "#D5F5F6",
        animation: true,
      });
    }
  };

  return (
    <div className="p-6">
      {isLoading ? (
        <div className="w-full h-[70vh] flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-semibold text-center mb-6">
            📝 Applied Candidates
          </h1>
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="table-class">
              <thead className="table-head-class">
                <tr className="table-head-row-class">
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Job Title</th>
                  <th>Job Type</th>
                  <th>Deadline</th>
                  <th>Resume</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {myCandidates?.map((user, index) => (
                  <tr key={user._id || index} className="table-row-class">
                    <td>{index + 1}</td>
                    <td>{user.candidateName}</td>
                    <td>{user.candidateEmail}</td>
                    <td>{user.title}</td>
                    <td>{user.jobType}</td>
                    <td>{new Date(user.deadline).toLocaleDateString()}</td>
                    <td>
                      <a
                        href={user.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View
                      </a>
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-2">
                        <button className="bg-teal-500 cursor-pointer text-white px-3 py-1 rounded-md hover:bg-opacity-80 transition">
                          Contact
                        </button>
                        <select
                          disabled={isReview}
                          onChange={(e) =>
                            handleCandidates(
                              user._id,
                              e.target.value,
                              user.candidateEmail
                            )
                          }
                          defaultValue=""
                          className="border border-teal-500 select select-xs"
                        >
                          <option disabled value="">
                            Select
                          </option>
                          <option value="Accepted">Accepted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!myCandidates?.length && (
              <p className="text-center text-gray-500 py-4">
                No candidates found.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Candidates;
