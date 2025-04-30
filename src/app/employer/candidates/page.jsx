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
  const [selectedCandidateIds, setSelectedCandidateIds] = useState([]);

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

    const myJobs = jobs?.filter(
      (job) => job?.meta?.postedBy === currentUser?.email
    );
    const myJobIds = myJobs?.map((job) => job._id?.toString());
    const filteredCandidates = appliedJobsCollection?.filter((candidate) =>
      myJobIds.includes(candidate.jobId?.toString())
    );

    setCandidates(filteredCandidates);
  }, [appliedJobsCollection, jobs, currentUser]);

  const handleCandidates = async (id, status, email) => {
    try {
      await sendApplicationReviewEmail(id, email, status);

      Swal.fire({
        icon: "success",
        title: "Status Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
        width: 300,
        background: "#D5F5F6",
      });
      setIsReview(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Send Email",
        text: "There was an error while sending the update email.",
        showConfirmButton: true,
        timer: 1500,
        width: 300,
        background: "#D5F5F6",
      });
    }
  };

  const getSkillMatchPercentage = (requiredSkills, candidateSkills) => {
    if (!Array.isArray(requiredSkills) || !Array.isArray(candidateSkills))
      return 0;
    const matchCount = candidateSkills.filter((skill) =>
      requiredSkills.includes(skill)
    ).length;

    return Math.round((matchCount / requiredSkills.length) * 100);
  };

  const handleSelectCandidate = (id) => {
    setSelectedCandidateIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
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
            <table className="table w-full">
              <thead>
                <tr className="bg-teal-100 text-left">
                  <th>Select</th>
                  <th>#</th>
                  <th>Name</th>
                  <th>Job Title</th>
                  <th>Experience</th>
                  <th>Match</th>
                  <th>Skills Match %</th>
                  <th>Job Type</th>
                  <th>Deadline</th>
                  <th>Resume</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {myCandidates?.map((user, index) => {
                  const job = jobs.find((j) => j._id === user.jobId);
                  const requiredSkills = job?.requiredSkills || [];
                  const candidateSkills = Array.isArray(user?.skills)
                    ? user.skills
                    : [];
                  const experienceMatch =
                    parseInt(user?.experience) >= parseInt(job?.experience);
                  const matchPercentage = getSkillMatchPercentage(
                    requiredSkills,
                    candidateSkills
                  );

                  return (
                    <tr key={user._id || index} className="hover:bg-teal-50">
                      <td>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                          checked={selectedCandidateIds.includes(user._id)}
                          onChange={() => handleSelectCandidate(user._id)}
                        />
                      </td>
                      <td>{index + 1}</td>
                      <td>{user.candidateName}</td>
                      <td>{user.title}</td>
                      <td>{user.experience} yrs</td>
                      <td>
                        {experienceMatch ? (
                          <span className="text-green-600 font-bold">✔️</span>
                        ) : (
                          <span className="text-red-500 font-bold">❌</span>
                        )}
                      </td>
                      <td className="font-semibold">{matchPercentage}%</td>
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
                          className="border border-teal-500 select select-sm"
                        >
                          <option disabled value="">
                            Select
                          </option>
                          <option value="Accepted">Accepted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {!myCandidates?.length && (
              <p className="text-center text-gray-500 py-4">
                No candidates found.
              </p>
            )}
          </div>

          {selectedCandidateIds?.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                ✅ Selected Candidate IDs:{" "}
                <span className="text-teal-600 font-semibold">
                  {selectedCandidateIds.join(", ")}
                </span>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Candidates;
