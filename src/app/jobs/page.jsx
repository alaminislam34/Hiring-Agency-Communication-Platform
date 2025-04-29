"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useAppContext } from "@/Providers/AppProviders";
import JobsFilterOptions from "./components/JobsFilterOptions";
import ApplyButton from "./components/ApplyButton";
import { TailSpin } from "react-loader-spinner";

import axios from "axios";
import JobsBanner from "./components/JobsBanner";
import { useState } from "react";
import { MapPin } from "lucide-react";

import { Grid2X2 } from "lucide-react";
import { Rows3 } from "lucide-react";

import BookmarkButton from "./components/BookmarkButton";

const AllJobs = () => {
  const [industry, setIndustry] = useState("");
  const [grid, setGrid] = useState(true);
  const [location, setLocation] = useState("");
  const [keyword, setKeyword] = useState("");
  const [jobType, setJobType] = useState("");

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["jobs", industry, location, keyword, jobType],
    queryFn: async () => {
      const res = await axios.get("/api/activeJobs", {
        params: { industry, location, keyword, jobType },
      });
      return res.data;
    },
    enabled: true,
  });
  console.log(jobs);

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 bg-gray-50">
      <JobsBanner
        setIndustry={setIndustry}
        setKeyword={setKeyword}
        setLocation={setLocation}
        handleSearch={handleSearch}
        industry={industry}
        location={location}
        keyword={keyword}
        jobs={jobs}
      />
      <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 gap-6">
        {/* Filters Section */}
        <aside className="md:col-span-1 bg-white border border-teal-500 rounded-2xl shadow-sm p-5">
          <JobsFilterOptions setJobType={setJobType} jobType={jobType} />
        </aside>

        {/* Jobs Section */}
        <main className="md:col-span-4 lg:col-span-5 bg-white border border-teal-500 rounded-2xl shadow-sm">
          {/* Job Cards */}
          <div className="p-5">
            {isLoading ? (
              <div className="flex justify-center items-center min-h-[300px]">
                <TailSpin height="60" width="60" color="#14b8a6" />
              </div>
            ) : (
              <>
                <div className="flex justify-end gap-2 mb-4">
                  <button
                    onClick={() => setGrid(false)}
                    className={`p-2 rounded-xl shadow-2xl cursor-pointer border border-gray-300 ${
                      !grid
                        ? "bg-teal-500 text-white"
                        : "text-teal-500 bg-white"
                    }`}
                  >
                    <Rows3 size={18} />
                  </button>
                  <button
                    onClick={() => setGrid(true)}
                    className={`p-2 rounded-xl shadow-2xl cursor-pointer border border-gray-300 ${
                      grid ? "bg-teal-500 text-white" : "bg-white text-teal-500"
                    }`}
                  >
                    <Grid2X2 size={18} />
                  </button>
                </div>
                {jobs?.length > 0 ? (
                  <div
                    className={`grid grid-cols-1 ${
                      grid ? "md:grid-cols-2 lg:grid-cols-3" : ""
                    } gap-6 lg:gap-8`}
                  >
                    {jobs?.map((job) => (
                      <div
                        key={job._id}
                        className="p-3 flex relative justify-between flex-col gap-2 lg:p-4 hover:-translate-y-1 duration-300 rounded-xl shadow-xl hover:shadow-teal-300 hover:shadow-2xl shadow-teal-100 border border-teal-300 bg-white overflow-hidden"
                      >
                        <div className="absolute -right-[70px] rotate-45 w-[200px] h-[30px] bg-teal-600 flex items-center justify-center">
                          <span className="text-xs text-white">{job.type}</span>
                        </div>
                        <div className="space-y-2">
                          {/* Header */}
                          <div className="flex justify-between items-start">
                            <div>
                              <h2 className=" text-teal-700">{job.industry}</h2>
                              <p className="text-gray-600 text-sm flex items-center gap-1">
                                <MapPin size={16} />
                                {job.location} ({job.vacancy} openings)
                              </p>
                            </div>
                          </div>

                          {/* Job Title */}
                          <h1 className="lg:text-lg mt-3 font-medium text-teal-800">
                            {job.title}
                          </h1>

                          {/* Description */}
                          <p className="mt-4 text-sm text-gray-700">
                            {job.description.slice(0, 100) + " ..."}
                          </p>
                        </div>
                        {/* Footer */}
                        <div className="">
                          <div>
                            <p className="font-semibold text-sm text-teal-700">
                              {job.minSalary +
                                " - " +
                                job.maxSalary +
                                "tk/" +
                                job.salaryType +
                                ""}
                            </p>
                          </div>
                          <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex flex-row gap-4 items-center">
                              <Link
                                href={`/jobs/${job._id}`}
                                className="text-teal-600 hover:underline"
                              >
                                more..
                              </Link>
                              <BookmarkButton jobs={job} />
                            </div>
                            <ApplyButton
                              job={job}
                              alreadyApplied={false}
                              modalId="apply-job-modal"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center min-h-[300px] text-center">
                    <p className="text-gray-600 text-base font-medium">
                      😔 No jobs found with your selected filters. <br />
                      Try changing your search.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AllJobs;
