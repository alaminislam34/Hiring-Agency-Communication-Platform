import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";

const JobsBanner = ({
  jobs,
  setIndustry,
  setLocation,
  setKeyword,
  handleSearch,
  industry,
  location,
  keyword,
}) => {
  return (
    <section className="relative bg-[#f9fbfd] rounded-3xl p-8 md:p-12 overflow-hidden">
      {/* Content */}
      <div className="text-center max-w-3xl mx-auto relative z-10">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-700 mb-2">
          <span className="text-teal-600">{jobs?.length || 0} Jobs</span>{" "}
          Available Now
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Find your dream job by filtering industry, location, or keyword.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-center shadow-2xl border border-gray-300 overflow-hidden lg:rounded-3xl"
        >
          {/* Industry Input */}
          <div className="flex items-center gap-2 px-4 py-3 border-b md:border-b-0 md:border-r border-gray-200">
            <select
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="Industry"
              className="bg-transparent outline-none text-sm px-2 text-gray-600 w-full"
            >
              <option value="">All Industries</option>
              <option value="Software">Software Development</option>
              <option value="Finance">Finance</option>
              <option value="Design & Creative">Design & Creative</option>
              <option value="Management">Management</option>
              <option value="Recruiting">Recruiting</option>
              <option value="Advertising">Advertising</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
            </select>
          </div>

          {/* Location Input */}
          <div className="flex items-center gap-2 px-4 py-3 border-b md:border-b-0 md:border-r border-gray-200">
            <span className="text-gray-400">
              <ChevronDown size={16} />
            </span>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="bg-transparent outline-none text-sm text-gray-600"
            />
          </div>

          {/* Keyword Input */}
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Keyword..."
            className="flex-1 px-4 py-3 text-sm text-gray-600 outline-none"
          />

          {/* Search Button */}
          <button
            type="submit"
            className="btn w-full h-full text-sm bg-teal-500 hover:bg-teal-600 text-white font-semibold"
          >
            <div className="flex items-center gap-2">
              <Search size={16} /> Search
            </div>
          </button>
        </form>
      </div>
    </section>
  );
};

export default JobsBanner;
