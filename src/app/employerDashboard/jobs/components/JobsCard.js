"use client";
import { useEffect, useState } from "react";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({ location: "", experienceLevel: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [jobsPerPage] = useState(10);

  console.log(jobs);

  const fetchJobs = async () => {
    setLoading(true);
    const response = await fetch(
      `/api/jobs?search=${searchQuery}&location=${filter.location}&experienceLevel=${filter.experienceLevel}&page=${currentPage}&limit=${jobsPerPage}`
    );
    const data = await response.json();
    setJobs(data.jobs);
    setTotalJobs(data.totalJobs);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, [searchQuery, filter, currentPage]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search change
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-4">Job Listings</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="input input-bordered w-full mb-2"
          placeholder="Search by job title or company"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* Filters */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          className="input input-bordered"
          placeholder="Filter by location"
          name="location"
          value={filter.location}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          className="input input-bordered"
          placeholder="Filter by experience level"
          name="experienceLevel"
          value={filter.experienceLevel}
          onChange={handleFilterChange}
        />
      </div>

      {/* Jobs Table */}
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
            {loading ? (
              <tr>
                <td colSpan="7">Loading...</td>
              </tr>
            ) : (
              jobs.map((job) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`btn ${
              currentPage === index + 1 ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default JobsPage;
