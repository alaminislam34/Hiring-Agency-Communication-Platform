"use client";

import { useAppContext } from "@/Providers/AppProviders";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import { BsBookmarkFill } from "react-icons/bs";
import ApplyButton from "../jobs/components/ApplyButton";

const SavedJobs = () => {
  const { bookmark, jobs, setBookmark } = useAppContext();
  const bookmarkJobs = jobs?.filter((job) => bookmark.includes(job._id)) || [];
  return (
    <div className="min-h-[80vh] mt-6 max-w-7xl mx-auto w-11/12 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 items-center">
      {bookmarkJobs.length === 0 && (
        <div className="lg:col-span-3 md:col-span-2 flex items-center justify-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 pt-2 text-center">
            No saved jobs found.
          </h2>
        </div>
      )}
      {bookmarkJobs?.map((job) => (
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
              <span className="font-medium text-gray-700">🏢 Company:</span>{" "}
              {job.companyName}
            </p>
            <p className="text-gray-500 mb-1 text-sm">
              <span className="font-medium text-gray-700">📍 Location:</span>{" "}
              {job.location}
            </p>
            <p className="text-gray-500 mb-1 text-sm">
              <span className="font-medium text-gray-700">🕒 Type:</span>{" "}
              {job.jobType}
            </p>
            <p className="text-gray-500 mb-1 text-sm">
              <span className="font-medium text-gray-700">💰 Salary:</span>{" "}
              {job.currency} {job.minSalary} - {job.maxSalary}
            </p>
            <p className="text-gray-500 mb-1 text-sm">
              <span className="font-medium text-gray-700">🗓️ Posted:</span>{" "}
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

            <ApplyButton job={job} modalId={`apply_modal_${job._id}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedJobs;
