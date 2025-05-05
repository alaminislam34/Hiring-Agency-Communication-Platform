"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BookmarkButton from "../../components/BookmarkButton";
import ApplyButton from "../../components/ApplyButton";
import Link from "next/link";
import { MapPin } from "lucide-react";

const SameTypeJob = ({ category, id }) => {
  const { data: jobs } = useQuery({
    queryKey: ["jobs", id],
    queryFn: async () => {
      const res = await axios.get("/api/activeJobs", { params: { category } });
      return res.data;
    },
    enabled: !!category,
  });
  const anotherJobs = jobs?.filter((job) => job._id !== id);

  return (
    <div>
      {anotherJobs?.map((job) => (
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
              {job.description.slice(0, 60) + " ..."}
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
  );
};

export default SameTypeJob;
