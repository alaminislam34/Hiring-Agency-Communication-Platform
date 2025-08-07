"use client";

const JobsFilterOptions = ({ setJobType, jobType }) => {
  const jobsType = [
    { label: "Full-time" },
    { label: "Part-time" },
    { label: "Internship" },
    { label: "Contract" },
    { label: "Remote" },
    { label: "Hybrid" },
    { label: "Freelance" },
  ];

  return (
    <div className="w-full sticky top-24 z-40 bg-white">
      <div>
        <h2 className="text-gray-800">Find By Job Type</h2>
        <div className="flex flex-wrap gap-3 overflow-x-auto py-4 md:py-6 scrollbar-hide">
          <button
            onClick={() => setJobType("")}
            className={`rounded-full text-sm text-center px-4 py-2 border shadow-sm transition-colors md:w-full cursor-pointer ${
              jobType === ""
                ? "bg-teal-600 text-white"
                : "bg-white text-gray-700 hover:bg-teal-100 border-teal-500"
            }`}
          >
            All Jobs
          </button>

          {jobsType.map(({ label }, i) => (
            <button
              key={i}
              onClick={() => setJobType(label)}
              className={`flex items-center gap-2 rounded-full text-sm px-2 py-1.5 border shadow-sm transition-colors md:w-full cursor-pointer text-center justify-center ${
                jobType === label
                  ? "bg-teal-600 text-white"
                  : "bg-white border border-teal-500 text-gray-700 hover:bg-teal-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobsFilterOptions;
