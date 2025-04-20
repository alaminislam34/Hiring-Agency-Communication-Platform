"use client";

import { useAppContext } from "@/Providers/AppProviders";

const JobsFilterOptions = () => {
  const { setType, type: JobType } = useAppContext();

  const jobsType = [
    { label: "Full Time", icon: "🕐" },
    { label: "Part Time", icon: "⏳" },
    { label: "Internship", icon: "🧑‍🎓" },
    { label: "Contract", icon: "📄" },
    { label: "Remote", icon: "🏠" },
    { label: "Onsite", icon: "🏢" },
    { label: "Hybrid", icon: "🔀" },
    { label: "Freelance", icon: "💻" },
  ];

  return (
    <div className=" w-full">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          Find By Job Type
        </h2>
        <div className="flex flex-wrap gap-3 overflow-x-auto py-4 md:py-6 scrollbar-hide">
          <button
            onClick={() => setType("")}
            className={`rounded-full text-sm px-4 py-2 border shadow-sm transition-colors md:w-full cursor-pointer text-left ${
              JobType === ""
                ? "bg-teal-600 text-white"
                : "bg-white text-gray-700 hover:bg-teal-100 border-gray-300"
            }`}
          >
            🔎 All Jobs
          </button>

          {jobsType.map(({ label, icon }, i) => (
            <button
              key={i}
              onClick={() => setType(label)}
              className={`flex items-center gap-2 rounded-full text-sm px-4 py-2 border shadow-sm transition-colors md:w-full cursor-pointer ${
                JobType === label
                  ? "bg-teal-600 text-white"
                  : "bg-white text-gray-700 hover:bg-teal-100 border-gray-300"
              }`}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobsFilterOptions;
