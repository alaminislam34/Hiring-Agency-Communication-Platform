"use client";

import { sendApplicationReviewEmail } from "@/lib/sendApplicationReview";
import { useAppContext } from "@/Providers/AppProviders";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Candidates = () => {
  const { currentUser, jobs } = useAppContext();
  const [isReview, setIsReview] = useState(false);
  const [myCandidates, setCandidates] = useState([]);
  const [selectedCandidateIds, setSelectedCandidateIds] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState({
    skills: "",
    location: "",
    experience: "",
  });

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

    const myJobs = jobs.filter(
      (job) => job.meta?.postedBy === currentUser.email
    );
    const myJobIds = myJobs.map((job) => job._id?.toString());
    const filtered = appliedJobsCollection.filter((candidate) =>
      myJobIds.includes(candidate.jobId?.toString())
    );

    setCandidates(filtered);
  }, [appliedJobsCollection, jobs, currentUser]);

  const handleReviewUpdate = async (id, status, email) => {
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

  const handleSelectCandidate = (id) => {
    setSelectedCandidateIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFilter = (e) => {
    e.preventDefault();
    const { skills, location, experience } = filteredCandidates;

    const myJobs = jobs.filter(
      (job) => job.meta?.postedBy === currentUser?.email
    );
    const myJobIds = myJobs.map((job) => job._id?.toString());

    const filtered = appliedJobsCollection.filter((candidate) => {
      const job = jobs.find(
        (j) => j._id?.toString() === candidate.jobId?.toString()
      );
      const jobExperience = parseInt(job?.experience || 0);
      const candidateExperience = parseInt(candidate.experience || 0);

      // Experience must be less than or equal to job requirement
      const matchExperience = candidateExperience <= jobExperience;

      // Partial match (if any letter matches, allow)
      const matchSkills = skills
        ? candidate.skills?.toLowerCase().includes(skills.toLowerCase())
        : true;
      const matchLocation = location
        ? candidate.location?.toLowerCase().includes(location.toLowerCase())
        : true;

      const isMyCandidate = myJobIds.includes(candidate.jobId?.toString());

      return isMyCandidate && matchSkills && matchLocation && matchExperience;
    });

    setCandidates(filtered);
  };

  const clearFilter = () => {
    setFilteredCandidates({ skills: "", location: "", experience: "" });

    const myJobs = jobs.filter(
      (job) => job.meta?.postedBy === currentUser?.email
    );
    const myJobIds = myJobs.map((job) => job._id?.toString());

    const filtered = appliedJobsCollection.filter((candidate) =>
      myJobIds.includes(candidate.jobId?.toString())
    );

    setCandidates(filtered);
  };

  return (
    <div className="p-6">
      <Head>
        <title>Applied Candidates</title>
      </Head>

      {isLoading ? (
        <div className="w-full h-[70vh] flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-semibold text-center mb-6">
            📝 Applied Candidates
          </h1>

          {/* Filter Form */}
          <div className="flex items-center justify-end mb-6">
            <form
              onSubmit={handleFilter}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 items-center shadow-md border border-gray-300 rounded-xl p-4 w-full lg:w-4/5"
            >
              <input
                type="text"
                name="skills"
                placeholder="Filter by skills"
                className="input input-bordered input-sm"
                value={filteredCandidates.skills}
                onChange={(e) =>
                  setFilteredCandidates({
                    ...filteredCandidates,
                    skills: e.target.value,
                  })
                }
              />
              <input
                type="text"
                name="location"
                placeholder="Filter by location"
                className="input input-bordered input-sm"
                value={filteredCandidates.location}
                onChange={(e) =>
                  setFilteredCandidates({
                    ...filteredCandidates,
                    location: e.target.value,
                  })
                }
              />
              <input
                type="number"
                name="experience"
                placeholder="Minimum experience (years)"
                className="input input-bordered input-sm"
                value={filteredCandidates.experience}
                onChange={(e) =>
                  setFilteredCandidates({
                    ...filteredCandidates,
                    experience: e.target.value,
                  })
                }
              />
              <button
                type="submit"
                className="btn btn-sm bg-teal-500 text-white"
              >
                Filter
              </button>
              <button
                type="button"
                className="btn btn-sm bg-gray-300"
                onClick={clearFilter}
              >
                Clear
              </button>
            </form>
          </div>

          {/* Candidates Table */}
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="table w-full">
              <thead>
                <tr className="bg-teal-100 text-left">
                  <th>Select</th>
                  <th>#</th>
                  <th>Name</th>
                  <th>Job Title</th>
                  <th>Experience</th>
                  <th>Job Type</th>
                  <th>Deadline</th>
                  <th>Resume</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {myCandidates?.map((user, index) => {
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
                      <td>{user.experience}</td>
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
                            handleReviewUpdate(
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

          {/* Selected Candidates */}
          {selectedCandidateIds.length > 0 && (
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
