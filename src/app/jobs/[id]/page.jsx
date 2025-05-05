"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import ApplyButton from "../components/ApplyButton";
import BookmarkButton from "../components/BookmarkButton";
import SameTypeJob from "./components/SameTypeJob";

const JobDetailsPage = ({ params }) => {
  const id = params?.id;
  const { data: job } = useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      const res = await axios.get(`/api/jobs/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (!job)
    return (
      <div className="flex justify-center items-center min-h-screen text-2xl text-teal-500">
        Loading...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-md p-8">
        <div className="flex flex-row gap-2 items-center pb-4">
          <Link href={"/"} className="hover:underline">
            Home
          </Link>{" "}
          {">"}
          <Link href={"/jobs"} className="hover:underline">
            Jobs
          </Link>{" "}
          {">"} <span className="text-teal-500">Details</span>
        </div>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div>
            <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold text-gray-800">
              {job.title}
            </h1>
            <p className="text-lg text-gray-500 mt-2">{job.location}</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <ApplyButton />
            <BookmarkButton jobs={job} />
          </div>
        </div>

        {/* Tags Section */}
        <div className="flex flex-wrap gap-6 mt-10">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-medium">Department:</span>
            <span className="text-gray-900">
              {job.department || "Software"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-medium">Location:</span>
            <span className="text-gray-900">{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-medium">Salary:</span>
            <span className="text-gray-900">
              ${job.minSalary} - ${job.maxSalary}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Job Description */}
          <div className="bg-white shadow-md rounded-2xl p-8">
            <h2 className="text-xl md:text-2xl font-bold text-teal-700 mb-4">
              Job Description
            </h2>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </div>

          {/* Job Requirements */}
          <div className="bg-white shadow-md rounded-2xl p-8">
            <h2 className="text-xl md:text-2xl font-bold text-teal-700 mb-4">
              Job Requirements
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                <span className="font-semibold">Requirements:</span>{" "}
                {job.requirements}
              </p>
              <p>
                <span className="font-semibold">Skills:</span>{" "}
                {job.skills?.join(", ")}
              </p>
              <p>
                <span className="font-semibold">Experience:</span>{" "}
                {job.experience}
              </p>
              <p>
                <span className="font-semibold">Education Level:</span>{" "}
                {job.educationLevel}
              </p>
              <p>
                <span className="font-semibold">Industry:</span> {job.industry}
              </p>
            </div>
          </div>
        </div>

        {/* Right Content: Ready to Apply Form */}
        <div className="bg-white shadow-md rounded-2xl p-8 h-fit sticky top-24">
          <h1 className="pb-4 text-xl md:text-2xl font-bold text-teal-700">
            Related Jobs
          </h1>
          <SameTypeJob category={job.category} id={job._id} />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
