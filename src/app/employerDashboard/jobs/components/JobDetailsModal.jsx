"use client";

import { useEffect, useState } from "react";

const JobDetailsModal = ({ id }) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false); // Track whether component is mounted

  useEffect(() => {
    setMounted(true); // Set to true when the component is mounted on the client
  }, []);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/job/${id}`);
        const data = await res.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (!mounted) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!job) {
    return <div>Job not found.</div>;
  }

  return (
    <div className="">
      <div className="">
        <h2 className="text-2xl font-bold mb-4 text-center">{job.jobTitle}</h2>

        <div className="mb-4">
          <p className="font-semibold text-gray-600">Company:</p>
          <p>{job.companyName}</p>
        </div>

        <div className="mb-4">
          <p className="font-semibold text-gray-600">Location:</p>
          <p>{job.location}</p>
        </div>

        <div className="mb-4">
          <p className="font-semibold text-gray-600">Job Type:</p>
          <p>{job.jobType}</p>
        </div>

        <div className="mb-4">
          <p className="font-semibold text-gray-600">Salary:</p>
          <p>
            {job.currency} {job.minSalary} - {job.maxSalary}
          </p>
        </div>

        <div className="mb-4">
          <p className="font-semibold text-gray-600">Description:</p>
          <p>{job.description}</p>
        </div>

        <div className="mb-4">
          <p className="font-semibold text-gray-600">Skills:</p>
          <p className="list-disc pl-5">{job.skills}</p>
        </div>

        <div className="mb-4">
          <p className="font-semibold text-gray-600">Requirements:</p>
          <p className="list-disc pl-5">{job.requirements}</p>
        </div>

        <div className="mb-4">
          <p className="font-semibold text-gray-600">Contact Email:</p>
          <p>{job.contactEmail}</p>
        </div>

        <div className="mb-4">
          <p className="font-semibold text-gray-600">Contact Phone:</p>
          <p>{job.contactPhone}</p>
        </div>

        <div className="mb-4">
          <p className="font-semibold text-gray-600">Post Date:</p>
          <p>{new Date(job.postDate).toLocaleDateString()}</p>
        </div>

        <div className="mb-4">
          <p className="font-semibold text-gray-600">Deadline:</p>
          <p>{new Date(job.deadline).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;
