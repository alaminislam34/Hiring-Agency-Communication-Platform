"use client";

import { useEffect, useState } from "react";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`);
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Job Listings</h1>

      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-auto w-full">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Salary Range</th>
                <th>Experience Level</th>
                <th>Posted Date</th>
                <th>Application Deadline</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.jobId}>
                  <td>{job.jobTitle}</td>
                  <td>{job.companyName}</td>
                  <td>{job.location}</td>
                  <td>{job.salaryRange}</td>
                  <td>{job.experienceLevel}</td>
                  <td>{new Date(job.postedDate).toLocaleDateString()}</td>
                  <td>
                    {new Date(job.applicationDeadline).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JobsPage;
