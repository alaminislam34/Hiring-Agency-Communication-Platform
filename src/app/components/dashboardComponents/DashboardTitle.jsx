"use client";

import { useAppContext } from "@/Providers/AppProviders";
import { Bookmark } from "lucide-react";
import { CircleCheck } from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";
import { Users } from "lucide-react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { ThreeDots } from "react-loader-spinner";

const DashboardTitle = ({ stat }) => {
  const currentUser = { name: "MD Al Amin Islam", role: "admin" };

  return (
    <div className="mb-4 space-y-4">
      <div className="bg-gradient-to-br from-white to-gray-50">
        <div className=" p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
            Welcome back, {currentUser?.name}!
          </h2>
          <p className="text-sm md:text-base text-gray-500 mb-4">
            Here's your personalized{" "}
            <span className="capitalize">{currentUser?.role}</span> dashboard
            overview.
          </p>

          {/* Role-based description */}
          <div className="">
            {currentUser?.role === "jobseeker" && (
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                Stay on top of your job hunting journey. View your daily
                application history, track your favorite categories, and monitor
                how you're progressing toward your dream job. All insights at
                your fingertips — tailored just for you.
              </p>
            )}

            {currentUser?.role === "employer" && (
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                Effortlessly manage your job posts, monitor application stats,
                and find the best candidates for your openings. Gain insights on
                your hiring performance, track job views, and optimize your
                postings with ease.
              </p>
            )}

            {currentUser?.role === "admin" && (
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                Oversee platform performance with full transparency. Track new
                registrations, manage roles, analyze posting trends, and keep
                everything running smoothly across all user types. Your control
                center for everything!
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-4">
        {/* Statistics */}
        {stat.map(({ title, value, icon }, i) => (
          <div
            key={i}
            className="shadow rounded-2xl border border-teal-200 bg-white p-4 space-y-2"
          >
            <div className="flex items-center gap-3 text-gray-400">
              <span className=""> {icon}</span>
              <p className="text-sm font-medium">{title}</p>
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
                {value}
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
