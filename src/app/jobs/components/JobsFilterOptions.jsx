"use client";

import { useAppContext } from "@/Providers/AppProviders";

const JobsFilterOptions = () => {
  const { setType } = useAppContext();
  const jobsType = [
    "Full Time",
    "Part Time",
    "Internship",
    "Contract",
    "Remote",
    "Onsite",
    "Hybrid",
    "Freelance",
  ];
  return (
    <div className="flex flex-row flex-wrap items-center gap-4 my-4">
      {jobsType.map((type, i) => (
        <button onClick={() => setType(type)} key={i} className="btn">
          {type}
        </button>
      ))}
    </div>
  );
};

export default JobsFilterOptions;
