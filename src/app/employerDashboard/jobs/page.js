import React from "react";
import JobsPage from "./components/JobsCard";
import JobAddModal from "./components/JobAddModal";

const Jobs = async () => {
  return (
    <div>
      <JobAddModal />
      <JobsPage />
    </div>
  );
};

export default Jobs;
