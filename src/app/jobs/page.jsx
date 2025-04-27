"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useAppContext } from "@/Providers/AppProviders";
import JobsFilterOptions from "./components/JobsFilterOptions";
import ApplyButton from "./components/ApplyButton";
import { TailSpin } from "react-loader-spinner";
import { Bookmark } from "lucide-react";
import { BsBookmarkFill } from "react-icons/bs";
import axios from "axios";
import JobsBanner from "./components/JobsBanner";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { Briefcase } from "lucide-react";
import { GraduationCap } from "lucide-react";
import { Clock } from "lucide-react";
import { Calendar } from "lucide-react";
import { Grid2X2 } from "lucide-react";
import { Rows3 } from "lucide-react";

const AllJobs = () => {
  const [industry, setIndustry] = useState("");
  const [grid, setGrid] = useState(true);
  const [location, setLocation] = useState("");
  const [keyword, setKeyword] = useState("");
  const { bookmark, setBookmark, currentUser, appliedJobsCollection } =
    useAppContext();

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["jobs", industry, location, keyword],
    queryFn: async () => {
      const res = await axios.get("/api/activeJobs", {
        params: { industry, location, keyword },
      });
      return res.data;
    },
  });

  const handleBookmark = (jobId) => {
    setBookmark((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

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
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {/* Filters Section */}
        <aside className="md:col-span-1 bg-white border border-teal-500 rounded-2xl shadow-sm p-5">
          <JobsFilterOptions />
        </aside>

        {/* Jobs Section */}
        <main className="md:col-span-3 lg:col-span-4 bg-white border border-teal-500 rounded-2xl shadow-sm">
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
                      grid ? "md:grid-cols-2" : ""
                    } gap-6`}
                  >
                    {jobs.map((job) => (
                      <div
                        key={job._id}
                        className="p-3 lg:p-4 rounded-lg shadow-md border border-teal-100 bg-white"
                      >
                        {/* Header */}
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="text-xl font-medium text-teal-700">
                              {job.industry}
                            </h2>
                            <p className="text-gray-600 flex items-center gap-1">
                              <MapPin size={16} />
                              {job.location} ({job.vacancy} openings)
                            </p>
                          </div>
                          <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                            {job.type}
                          </span>
                        </div>

                        {/* Job Title */}
                        <h1 className="text-xl md:text-2xl font-bold mt-3 text-gray-800">
                          {job.title}
                        </h1>

                        {/* Description */}
                        <p className="mt-4 text-gray-700">{job.description}</p>

                        {/* Skills */}
                        <div className="mt-4">
                          <h3 className="font-semibold text-teal-700 flex flex-wrap items-center gap-2">
                            Skills:{" "}
                            <span className="text-sm flex flex-wrap gap-2 text-gray-700 font-normal">
                              {" "}
                              {job.skills.map((skill, index) => (
                                <span key={index} className="">
                                  {skill}
                                </span>
                              ))}
                            </span>
                          </h3>
                        </div>

                        {/* Footer */}
                        <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div>
                            <p className="font-bold text-teal-700">
                              {job.minSalary +
                                " - " +
                                job.maxSalary +
                                "tk/" +
                                job.salaryType +
                                ""}
                            </p>
                          </div>
                          <ApplyButton
                            job={job}
                            alreadyApplied={false}
                            modalId="apply-job-modal"
                          />
                          {/* <button className="btn btn-primary bg-teal-600 hover:bg-teal-700 border-none text-white w-full sm:w-auto">
                            Apply Now
                          </button> */}
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
