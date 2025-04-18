"use client";
import Link from "next/link";
import JobsFilterOptions from "./components/JobsFilterOptions";
import ApplyButton from "./components/ApplyButton";
import { useAppContext } from "@/Providers/AppProviders";
import { TailSpin } from "react-loader-spinner";

const AllJobs = () => {
  const { jobs, setJobTitle, jobsLoading } = useAppContext();
  const handleSearch = (e) => {
    e.preventDefault();
    const searchJob = e.target.search.value;
    setJobTitle(searchJob);
  };
  return (
    <div className="bg-gray-50 p-6 max-w-7xl mx-auto">
      <h1 className="text-xl my-6">{jobs.length} Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        <div className="md:col-span-1 border p-4 rounded-lg border-teal-500">
          <JobsFilterOptions />
        </div>
        <div className="md:col-span-3 lg:col-span-4 overflow-y-auto h-screen">
          <div className="space-y-4 sticky top-0 bg-white py-2">
            <form
              onSubmit={handleSearch}
              className="flex items-center justify-end gap-2"
            >
              <input
                type="text"
                name="search"
                placeholder="Search jobs.."
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 md:mt-6 w-11/12 mx-auto">
                  {jobs.map((job) => (
                    <div
                      key={job._id.toString()}
                      className="rounded-2xl flex flex-col justify-between shadow-md hover:shadow-xl transition-shadow duration-300 bg-white p-6 border border-gray-200 hover:border-teal-400"
                    >
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                          {job.jobTitle}
                        </h2>
                        <p className="text-gray-500 mb-1">
                          <span className="font-medium text-gray-700">
                            🏢 Company:
                          </span>{" "}
                          {job.companyName}
                        </p>
                        <p className="text-gray-500 mb-1">
                          <span className="font-medium text-gray-700">
                            📍 Location:
                          </span>{" "}
                          {job.location}
                        </p>
                        <p className="text-gray-500 mb-1">
                          <span className="font-medium text-gray-700">
                            🕒 Type:
                          </span>{" "}
                          {job.jobType}
                        </p>
                        <p className="text-gray-500 mb-1">
                          <span className="font-medium text-gray-700">
                            💰 Salary:
                          </span>{" "}
                          {job.currency} {job.minSalary} - {job.maxSalary}
                        </p>
                        <p className="text-gray-500 mb-1">
                          <span className="font-medium text-gray-700">
                            🗓️ Posted:
                          </span>{" "}
                          {new Date(job.postDate).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-6">
                        <Link
                          href={`/job/${job._id}`}
                          className="text-teal-600 font-medium hover:underline"
                        >
                          🔎 View Details
                        </Link>

                        <ApplyButton
                          job={{
                            _id: job._id.toString(),
                            jobTitle: job.jobTitle,
                            companyName: job.companyName,
                            location: job.location,
                            jobType: job.jobType,
                            salary: {
                              currency: job.currency,
                              min: job.minSalary,
                              max: job.maxSalary,
                            },
                            postDate: job.postDate,
                            deadline: job.deadline,
                            description: job.description,
                            skills: job.skills,
                            requirements: job.requirements,
                          }}
                          modalId={`apply_modal_${job._id}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center w-full min-h-[200px]">
                  <p className="text-sm md:text-base lg:text-lg font-semibold text-gray-800">
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
