"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import ApplyButton from "../components/ApplyButton";
import BookmarkButton from "../components/BookmarkButton";

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
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
        <div className="flex flex-row gap-2 items-center">
          <Link href={"/"}>Home</Link>/<Link href={"/jobs"}>Jobs</Link> /
          details
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
          <h2 className="text-2xl md:text-3xl font-bold text-teal-700 mb-6">
            Ready To Apply?
          </h2>
          <form className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:border-teal-500 focus:outline-none"
                placeholder="Enter your name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg p-3 focus:border-teal-500 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>

            {/* Upload Resume */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Upload Resume
              </label>
              <input
                type="file"
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            {/* Authorization */}
            <div>
              <p className="text-gray-700 mb-2 font-medium">
                Are you authorized to work?
              </p>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input type="radio" name="authorized" value="yes" />
                  <span>Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="authorized" value="no" />
                  <span>No</span>
                </label>
              </div>
            </div>

            {/* Degree */}
            <div>
              <p className="text-gray-700 mb-2 font-medium">
                Do you have a master's degree?
              </p>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input type="radio" name="masters" value="yes" />
                  <span>Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="masters" value="no" />
                  <span>No</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold mt-4"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
