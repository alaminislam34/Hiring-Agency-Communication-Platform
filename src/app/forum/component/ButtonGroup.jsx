"use client";

export default function ButtonGroup({ setFilter }) {
  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => setFilter("all")}
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded"
      >
        All Posts
      </button>
      <button
        onClick={() => setFilter("mine")}
        className="px-4 py-2 bg-blue-200 hover:bg-blue-300 text-sm rounded"
      >
        My Posts
      </button>
    </div>
  );
}
