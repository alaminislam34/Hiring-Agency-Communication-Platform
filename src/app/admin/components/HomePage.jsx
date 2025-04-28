"use client";

import DailyJobApplyLineChart from "./HomepageComponents/DailyJobApplyChart";
import MonthlyUserRegistrationChart from "./HomepageComponents/MonthlyUserRegistrationChart";
import TopEmployersByJobPost from "./HomepageComponents/TopEmployersByJobPost";
import TopViewedJobsChart from "./HomepageComponents/TopReviewdJobsChart";
import UserRoleDistribution from "./HomepageComponents/UsersRoleDistribution";

const HomePage = () => {
  return (
    <div>
      <section className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 gap-4">
        <div className="md:col-span-4 lg:col-span-5 w-full h-full">
          <MonthlyUserRegistrationChart />
        </div>
        <div className="md:col-span-2 lg:col-span-3 w-full h-full">
          <UserRoleDistribution />
        </div>
      </section>
      {/* Top Employers By Job Post */}
      <div className="w-full h-full">
        <TopEmployersByJobPost />
      </div>
      <div className="w-full h-full">
        <DailyJobApplyLineChart />
      </div>
      <div className="w-full h-full">
        <TopViewedJobsChart />
      </div>
    </div>
  );
};

export default HomePage;
