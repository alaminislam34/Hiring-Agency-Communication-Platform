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
import { useAppContext } from "@/Providers/AppProviders";
import HomePage from "./components/HomePage";

const Overview = () => {
  const { totalAppliedJobs, totalUsers, jobs } = useAppContext();
  const totalEmployer = totalUsers?.filter((user) => user.role === "employer");
  // Stat value
  const stat = [
    {
      title: "Total Users",
      value: totalUsers?.length || 0,
      icon: <Users size={24} />,
    },
    {
      title: "Total Jobs",
      value: jobs?.length || 0,
      icon: <BriefcaseBusiness size={24} />,
    },
    {
      title: "Total Apply",
      value: totalAppliedJobs?.length || 0,
      icon: <CircleCheck size={24} />,
    },
    {
      title: "Total Employers",
      value: totalEmployer?.length || 0,
      icon: <Users size={24} />,
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Dashboard Title */}
      <DashboardTitle stat={stat} />
      <div>
        {/* Job Statistics Overview */}
        <TotalJobStatistics />
      </div>
      <HomePage />
    </div>
  );
};

export default Overview;
