"use client";
import Link from "next/link";
import JobsFilterOptions from "./components/JobsFilterOptions";
import ApplyButton from "./components/ApplyButton";
import { useAppContext } from "@/Providers/AppProviders";
import { TailSpin } from "react-loader-spinner";
import { Bookmark } from "lucide-react";
import { BsBookmarkFill } from "react-icons/bs";

const AllJobs = () => {
  const {
    setBookmark,
    bookmark,
    jobs,
    jobsLoading,
    appliedJobsCollection,
    currentUser,
  } = useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchJob = e.target.search.value;
    setJobTitle(searchJob);
  };

  return (
    <div className="bg-gray-50 p-4 md:p-6 max-w-7xl mx-auto">
      <h1 className="text-xl font-semibold text-gray-800 py-4">
        {jobs?.length} Jobs
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {/* Left Side Filter */}
        <aside className="md:col-span-1 bg-white border border-teal-500 rounded-2xl shadow-sm p-4">
          <JobsFilterOptions />
        </aside>

        {/* Jobs List */}
        <main className="md:col-span-3 lg:col-span-4 border border-teal-500 rounded-2xl shadow-sm  bg-white">
          {/* Search Bar */}
          <div className="sticky z-40 top-0 bg-white border-b rounded-2xl border-gray-200 p-4">
            <form
              onSubmit={handleSearch}
              className="flex flex-col md:flex-row gap-3 md:items-center justify-between"
            >
              <input
                type="text"
                name="search"
                placeholder="Search jobs..."
                onChange={(e) => setJobTitle(e.target.value)}
                className="flex-1 py-2 px-4 border border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg text-sm"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg transition duration-200"
              >
                Search Job
              </button>
            </form>
          </div>

          {/* Job Cards */}
          {jobsLoading ? (
            <div className="flex items-center justify-center w-full min-h-[300px]">
              <TailSpin
                height="60"
                width="60"
                color="#00847d"
                ariaLabel="loading"
              />
            </div>
          ) : (
            <div className="p-4">
              {jobs?.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {jobs?.map((job) => (
                    <div
                      key={job._id.toString()}
                      // key={job._id}
                      className="bg-white border border-gray-200 hover:border-teal-500 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-300 relative"
                    >
                      {/* Bookmark */}
                      <button
                        onClick={() =>
                          setBookmark((prev) =>
                            prev.includes(job._id)
                              ? prev.filter((id) => id !== job._id)
                              : [...prev, job._id]
                          )
                        }
                        className="absolute top-3 right-3 hover:text-teal-500"
                        aria-label="Bookmark Job"
                      >
                        {bookmark?.includes(job._id) ? (
                          <BsBookmarkFill size={18} />
                        ) : (
                          <Bookmark size={18} />
                        )}
                      </button>

                      <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                          {job.title}
                        </h2>
                        <p className="text-sm text-gray-600 mb-1">
                          <strong>🏢 Company:</strong> {job.company}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                          <strong>📍 Location:</strong> {job.location}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                          <strong>🕒 Type:</strong> {job.type}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                          {job.salary.min}k - {job.salary.max}k
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                          <strong>🗓️ Deadline:</strong>{" "}
                          {new Date(job.meta.deadline).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex justify-between items-center mt-5">
                        <Link
                          // todo
                          href={`/job/${job._id}`}
                          className="text-teal-600 text-sm font-medium hover:underline"
                        >
                          🔎 View Details
                        </Link>

                        <ApplyButton
                          alreadyApplied={appliedJobsCollection?.some(
                            (a) =>
                              a.jobId === job._id &&
                              a.candidateEmail === currentUser?.email
                          )}
                          job={job}
                          // todo
                          modalId={`apply_modal_${job._id}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center min-h-[300px] text-center">
                  <p className="text-base text-gray-700 font-medium">
                    😕 No jobs found based on your selected filters.
                    <br />
                    Try adjusting your search criteria.
                  </p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AllJobs;
