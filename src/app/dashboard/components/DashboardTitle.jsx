"use client";

import { useAppContext } from "@/Providers/AppProviders";
import { CircleCheck } from "lucide-react";
import { Bookmark } from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";
import { Users } from "lucide-react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { ThreeDots } from "react-loader-spinner";

const DashboardTitle = () => {
  const { currentUser, jobs } = useAppContext();
  const adminStats = [
    {
      title: "Active Users",
      value: 0,
      icon: <Users size={24} />,
    },
    {
      title: "Active Jobs",
      value: jobs?.length || 0,
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

  const employerStats = [
    { title: "Active Jobs", value: 24, icon: <BriefcaseBusiness size={24} /> },
    {
      title: "Deactivated Jobs",
      value: 12,
      icon: <BriefcaseBusiness size={24} />,
    },
    {
      title: "Total Applications",
      value: 5,
      icon: <CircleCheck size={24} />,
    },
    {
      title: "Pending Applicants",
      value: 145,
      icon: <CircleCheck size={24} />,
    },
  ];

  const jobSeekerStats = [
    { title: "Total Jobs", value: 24, icon: <BriefcaseBusiness size={24} /> },
    { title: "Active Jobs", value: 12, icon: <BriefcaseBusiness size={24} /> },
    { title: "Total Apply", value: 5, icon: <CircleCheck size={24} /> },
    { title: "Saved Jobs", value: 145, icon: <Bookmark size={24} /> },
  ];

  return (
    <div className="mb-4 space-y-4">
      {/* Title and Intro */}
      <h1 className="text-xl lg:text-2xl font-semibold tracking-tight">
        Welcome back, {currentUser?.name}!<br />
        <span className="lg:text-lg text-sm md:text-base font-medium text-gray-600">
          Here is your <span className="capitalize">{currentUser?.role}</span>{" "}
          dashboard overview
        </span>
      </h1>
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {(currentUser?.role === "admin"
          ? adminStats
          : currentUser?.role === "employer"
          ? employerStats
          : jobSeekerStats
        ).map((stat, index) => (
          <div
            key={index}
            className="shadow-xl rounded-xl bg-white p-4 space-y-2"
          >
            <div className="flex items-center gap-3 text-gray-400">
              <span className=""> {stat.icon}</span>
              <p className="text-sm font-medium">{stat.title}</p>
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-base md:text-lg text-right lg:text-xl text-gray-800">
                {/* {totalAppliedJobsLoading || totalUsersLoading ? (
                  <ThreeDots
                    visible={true}
                    height="20"
                    width="20"
                    color="#fff"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  stat.value
                )} */}
                {stat.value}
              </h2>
              <FaArrowTrendUp className="text-green-500 text-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardTitle;
