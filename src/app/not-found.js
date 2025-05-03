"use client";
import Link from "next/link";
import { ArrowLeftCircle } from "lucide-react";

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen py-10 bg-gradient-to-r from-teal-400 to-teal-600">
      <div className="text-center max-w-xl space-y-6">
        {/* 3D Animation of the '404' */}
        <div className="relative inline-block">
          <h1 className="text-9xl md:text-[150px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-100 to-blue-500 animate-pulse">
            404
          </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120px"
            height="120px"
            viewBox="0 0 100 100"
            className="absolute top-0 left-0 w-full h-full opacity-30 animate-spin"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#fff"
              strokeWidth="10"
              fill="none"
            />
          </svg>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-2 text-balance">
          Oops! Page not found
        </h2>

        {/* Subtext */}
        <p className="text-gray-100 mb-6 text-base md:text-lg text-balance">
          The page you are looking for doesn`t exist or has been moved.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-md shadow-lg hover:bg-teal-700 transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          <ArrowLeftCircle className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
