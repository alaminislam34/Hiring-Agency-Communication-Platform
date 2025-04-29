"use client";

import { useAppContext } from "@/Providers/AppProviders";
import { FaArrowTrendUp } from "react-icons/fa6";

const DashboardTitle = ({ stat }) => {
  const { currentUser } = useAppContext();

  return (
    <div className="space-y-2 mb-4">
      <div className="bg-gradient-to-br from-white to-gray-50 py-4">
        <div className="">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
            Welcome back, {currentUser?.name}!
          </h2>
          <p className="text-sm md:text-base text-gray-500">
            Here's your personalized{" "}
            <span className="capitalize">{currentUser?.role}</span> dashboard
            overview.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Statistics */}
        {stat.map(({ title, value, icon }, i) => (
          <div
            key={i}
            className="shadow rounded-2xl border border-teal-200 bg-white p-4 space-y-2 hover:-translate-y-1 duration-300 hover:shadow-xl hover:border-teal-400 group"
          >
            <div className="flex items-center gap-3 text-gray-400">
              <span className="p-2 border-2 rounded-full border-teal-500 text-teal-500 group-hover:text-white group-hover:bg-teal-500 duration-300">
                {" "}
                {icon}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-base md:text-lg text-right lg:text-xl space-x-4 text-gray-800">
                <span className="text-sm font-medium text-gray-500">
                  {title}
                </span>
                <span>{value}</span>
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
