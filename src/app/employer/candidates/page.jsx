"use client";

import { useAppContext } from "@/Providers/AppProviders";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { sendEmailToCandidates } from "@/lib/sendEmailToCandidates"; // Ensure this function handles job description

const Candidates = () => {
  const { currentUser, jobs } = useAppContext();
  const [myCandidates, setCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);

  const {
    data: appliedJobsCollection,
    isLoading,
    refetch,
  } = useQuery({
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

  const handleSelectCandidate = (user) => {
    const job = jobs.find((j) => j._id?.toString() === user.jobId?.toString());

    const candidateData = {
      id: user._id,
      email: user.candidateEmail,
      jobId: user.jobId,
      title: user.title,
      deadline: user.deadline,
      location: job?.location || "",
      postedBy: job?.meta?.postedBy || "",
      companyName: job?.companyName || "",
      description: job?.description || "", // ✅ Added job description
    };

    const alreadySelected = selectedCandidates.find(
      (item) => item.email === user.candidateEmail && item.jobId === user.jobId
    );

    if (alreadySelected) {
      setSelectedCandidates((prev) =>
        prev.filter(
          (item) =>
            item.email !== user.candidateEmail || item.jobId !== user.jobId
        )
      );
    } else {
      setSelectedCandidates((prev) => [...prev, candidateData]);
    }
  };

  const handleSendEmail = async () => {
    try {
      // Send emails to the selected candidates
      await sendEmailToCandidates(selectedCandidates);

      // Collect candidate IDs to update their status
      const candidateIds = selectedCandidates.map((candidate) => candidate.id);

      // Update the status of the selected candidates in the database
      const res = await axios.put(`/api/updateAppliedStatus/`, {
        candidateIds,
        status: "Shortlisted",
      });
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          text: "Emails sent successfully!",
          showConfirmButton: false,
          timer: 2000,
          background: "#D5F5F6",
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "Email send hoilo na",
          showConfirmButton: true,
          background: "#D5F5F6",
        });
      }
      // Reset selected candidates
      setSelectedCandidates([]);
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: "Failed to send emails or update statuses!",
        showConfirmButton: true,
        background: "#D5F5F6",
      });
      console.error("❌ Error sending emails or updating statuses:", err);
    } finally {
      refetch();
    }
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
                  <th>Status</th>
                  <th>Resume</th>
                </tr>
              </thead>
              <tbody>
                {myCandidates?.map((user, index) => {
                  const isChecked = selectedCandidates.some(
                    (item) =>
                      item.email === user.candidateEmail &&
                      item.jobId === user.jobId
                  );

                  return (
                    <tr key={user._id || index} className="hover:bg-teal-50">
                      <td>
                        <input
                          type="checkbox"
                          className={`checkbox checkbox-sm ${
                            user.status === "Shortlisted"
                              ? " pointer-events-none cursor-not-allowed"
                              : ""
                          }`}
                          checked={user.status === "Shortlisted" || isChecked}
                          onChange={() => handleSelectCandidate(user)}
                        />
                      </td>
                      <td>{index + 1}</td>
                      <td>{user.candidateName}</td>
                      <td>{user.title}</td>
                      <td>{user.experience}</td>
                      <td>{user.jobType}</td>
                      <td>{new Date(user.deadline).toLocaleDateString()}</td>
                      <td>{user.status}</td>
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

          {/* Send Email Button */}
          {selectedCandidates.length > 0 && (
            <div className="mt-4 flex justify-end items-center gap-4">
              <p className="text-sm text-gray-600">
                Selected: {selectedCandidates.length}
              </p>
              <button
                onClick={handleSendEmail}
                className="btn btn-sm bg-teal-600 text-white"
              >
                Send Email
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Candidates;
