import React from "react";
import Link from "next/link";
import { ArrowLeftCircle } from "lucide-react";

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center px-4 py-10">
      <div className="text-center max-w-xl">
        <h1 className="text-7xl md:text-8xl font-bold text-teal-600 mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-teal-800 mb-2 text-balance">
          Oops! Page not found
        </h2>
        <p className="text-gray-600 mb-6 text-base md:text-lg text-balance">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-md hover:bg-teal-700 transition-all duration-200 ease-in-out"
        >
          <ArrowLeftCircle className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
