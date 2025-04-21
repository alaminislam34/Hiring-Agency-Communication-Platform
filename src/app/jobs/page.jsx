"use client";
import Link from "next/link";
import JobsFilterOptions from "./components/JobsFilterOptions";
import ApplyButton from "./components/ApplyButton";
import { useAppContext } from "@/Providers/AppProviders";
import { TailSpin } from "react-loader-spinner";
import { Bookmark } from "lucide-react";
import { BsBookmarkFill } from "react-icons/bs";

const AllJobs = () => {
  const { jobs, setJobTitle, jobsLoading, setBookmark, bookmark } =
    useAppContext();
  const handleSearch = (e) => {
    e.preventDefault();
    const searchJob = e.target.search.value;
    setJobTitle(searchJob);
  };
  return (
    <div className="bg-gray-50 p-4 max-w-7xl mx-auto">
      <h1 className="text-xl py-4">{jobs.length} Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        <div className="md:col-span-1 border p-4 rounded-lg border-teal-500">
          <JobsFilterOptions />
        </div>
        <div className="md:col-span-3 lg:col-span-4 overflow-y-auto h-screen border border-teal-500 rounded-lg shadow">
          <div className="space-y-4 sticky z-40 top-0 bg-white">
            <form
              onSubmit={handleSearch}
              className="flex md:items-center flex-col md:flex-row justify-end gap-2 p-4"
            >
              <input
                type="text"
                name="search"
                placeholder="Search jobs.."
                onChange={(e) => setJobTitle(e.target.value)}
                className="py-2 px-4 border border-teal-500 focus:outline-teal-500 focus:ring-2 focus:ring-teal-500 rounded-lg"
              />
              <button
                type="submit"
                className="btn bg-teal-500 hover:bg-teal-600 rounded-lg text-white cursor-pointer"
              >
                Search Job
              </button>
            </form>
          </div>
          {jobsLoading ? (
            <div className="flex items-center justify-center w-full min-h-[200px] md:min-h-[400px]">
              <div className="flex flex-row gap-2 items-center justify-center">
                <TailSpin
                  visible={true}
                  height="60"
                  width="60"
                  color="#00847d"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            </div>
          ) : (
            <div className="">
              {jobs.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4 w-11/12 mx-auto">
                  {jobs.map((job) => (
                    <div
                      key={job._id.toString()}
                      className="rounded-2xl flex flex-col justify-between shadow-md hover:shadow-xl transition-shadow duration-300 bg-white p-4 border border-gray-200 hover:border-teal-400 relative z-[10]"
                    >
                      <button
                        onClick={() =>
                          setBookmark((prev) =>
                            prev.includes(job._id)
                              ? prev.filter((id) => id !== job._id)
                              : [...prev, job._id]
                          )
                        }
                        className={`cursor-pointer absolute top-2 right-2`}
                      >
                        {bookmark?.includes(job._id) ? (
                          <BsBookmarkFill size={18} />
                        ) : (
                          <Bookmark size={18} />
                        )}
                      </button>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2 pt-2">
                          {job.jobTitle}
                        </h2>
                        <p className="text-gray-500 mb-1 text-sm">
                          <span className="font-medium text-gray-700">
                            🏢 Company:
                          </span>{" "}
                          {job.companyName}
                        </p>
                        <p className="text-gray-500 mb-1 text-sm">
                          <span className="font-medium text-gray-700">
                            📍 Location:
                          </span>{" "}
                          {job.location}
                        </p>
                        <p className="text-gray-500 mb-1 text-sm">
                          <span className="font-medium text-gray-700">
                            🕒 Type:
                          </span>{" "}
                          {job.jobType}
                        </p>
                        <p className="text-gray-500 mb-1 text-sm">
                          <span className="font-medium text-gray-700">
                            💰 Salary:
                          </span>{" "}
                          {job.currency} {job.minSalary} - {job.maxSalary}
                        </p>
                        <p className="text-gray-500 mb-1 text-sm">
                          <span className="font-medium text-gray-700">
                            🗓️ Posted:
                          </span>{" "}
                          {new Date(job.postDate).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-6">
                        <Link
                          href={`/job/${job._id}`}
                          className="text-teal-600 text-sm md:text-base font-medium hover:underline"
                        >
                          🔎 View Details
                        </Link>

                        <ApplyButton
                          job={job}
                          modalId={`apply_modal_${job._id}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center w-full min-h-[200px]">
                  <p className="text-sm md:text-base lg:text-lg font-semibold text-gray-800 px-4">
                    😕 No jobs found based on your selected filters. Try
                    adjusting your search.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
