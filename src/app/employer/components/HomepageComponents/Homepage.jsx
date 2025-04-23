import React from "react";
import ApplicationsPerJobChart from "./ApplicationsPerJob";
import PerDayApplications from "./PerDayApplications";
import ApplicationStatusChart from "./ApplicationStatusChart";
import Leaderboard from "./Leaderboard";

const Homepage = () => {
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 gap-4">
        <div className="md:col-span-4 lg:col-span-5 w-full h-full">
          <PerDayApplications />
        </div>{" "}
        <div className="md:col-span-2 lg:col-span-3">
          <ApplicationStatusChart />
        </div>
      </section>
      <div>
        <ApplicationsPerJobChart />
      </div>
      <div>
        <Leaderboard />
      </div>
    </div>
  );
};

export default Homepage;
