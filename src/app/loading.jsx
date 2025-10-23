"use client";

import React from "react";

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-t-indigo-600 border-b-indigo-600 border-gray-300 rounded-full animate-spin"></div>
        {/* Loading Text */}
        <p className="mt-4 text-gray-700 text-lg font-medium animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}
