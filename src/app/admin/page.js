"use client";
import { Users } from "lucide-react";
import DashboardTitle from "../components/dashboardComponents/DashboardTitle";
import DailyJobApplyLineChart from "./components/HomepageComponents/DailyJobApplyChart";
import MonthlyUserRegistrationChart from "./components/HomepageComponents/MonthlyUserRegistrationChart";
import TopEmployersByJobPost from "./components/HomepageComponents/TopEmployersByJobPost";
import TopViewedJobsChart from "./components/HomepageComponents/TopReviewdJobsChart";
import TotalJobStatistics from "./components/HomepageComponents/TotalJobStatistics";
import UserRoleDistribution from "./components/HomepageComponents/UsersRoleDistribution";
import { CircleCheck } from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";

const Overview = () => {
  // Stat value
  const stat = [
    {
      title: "Total Users",
      value: 0,
      icon: <Users size={24} />,
    },
    {
      title: "Total Jobs",
      value: 0,
      icon: <BriefcaseBusiness size={24} />,
    },
    {
      title: "Total Apply",
      value: 0,
      icon: <CircleCheck size={24} />,
    },
    {
      title: "Total Employers",
      value: 0,
      icon: <Users size={24} />,
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Dashboard Title */}
      <DashboardTitle stat={stat} />
      <div className="w-full h-full">
        {/* Job Statistics Overview */}
        <TotalJobStatistics />
      </div>
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

export default Overview;
