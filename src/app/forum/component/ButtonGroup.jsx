"use client";

import { useAppContext } from "@/Providers/AppProviders";

export default function ButtonGroup({ filter, setFilter }) {
  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => setFilter("")}
        className={` ${
          filter === "" ? "bg-teal-500 text-white" : "border-teal-500 border"
        } px-4 py-2 text-sm rounded`}
      >
        All Posts
      </button>
      <button
        onClick={() => setFilter("myPosts")}
        className={` ${
          filter === "myPosts"
            ? "bg-teal-500 text-white"
            : "border-teal-500 border"
        } px-4 py-2 text-sm rounded`}
      >
        My Posts
      </button>
    </div>
  );
}
