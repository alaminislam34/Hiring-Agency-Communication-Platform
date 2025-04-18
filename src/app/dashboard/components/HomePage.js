"use client";

import React from "react";
import {
  AiOutlineAppstore,
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineUser,
} from "react-icons/ai";
import { useAppContext } from "@/Providers/AppProviders";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { FaArrowTrendUp } from "react-icons/fa6";
import CircleChart from "./CircleChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const adminStats = [
  { title: "Active Users", value: 24, icon: <AiOutlineAppstore size={24} /> },
  { title: "Active Jobs", value: 12, icon: <AiOutlineCheckCircle size={24} /> },
  { title: "Total Apply", value: 5, icon: <AiOutlineClockCircle size={24} /> },
  { title: "Total Employers", value: 145, icon: <AiOutlineUser size={24} /> },
];

const employerStats = [
  { title: "Active Jobs", value: 24, icon: <AiOutlineAppstore size={24} /> },
  {
    title: "Deactivated Jobs",
    value: 12,
    icon: <AiOutlineAppstore size={24} />,
  },
  {
    title: "Total Applications",
    value: 5,
    icon: <AiOutlineUser size={24} />,
  },
  {
    title: "Pending Applicants",
    value: 145,
    icon: <AiOutlineUser size={24} />,
  },
];

const jobSeekerStats = [
  { title: "Total Jobs", value: 24, icon: <AiOutlineAppstore size={24} /> },
  { title: "Active Jobs", value: 12, icon: <AiOutlineCheckCircle size={24} /> },
  { title: "Total Apply", value: 5, icon: <AiOutlineClockCircle size={24} /> },
  { title: "Saved Jobs", value: 145, icon: <AiOutlineUser size={24} /> },
];

const chartData = {
  labels: [
    "Total Jobs",
    "Active Jobs",
    "Pending Jobs",
    "Total Applicants",
    "Accepted Applicants",
    "Rejected Applicants",
    "Pending Applicants",
  ],
  datasets: [
    {
      label: "Jobs Count",
      data: [240, 120, 150, 145, 250, 300, 250],
      backgroundColor: [
        "#4ade80",
        "#60a5fa",
        "#facc15",
        "#f97316",
        "#a78bfa",
        "#f87171",
        "#34d399",
      ],
      borderWidth: 1,
      borderRadius: 6,
    },
  ],
};

const chartData2 = {
  labels: ["Total Jobs", "Active Jobs", "Pending Jobs", "Total Applicants"],
  datasets: [
    {
      label: "Jobs Count",
      data: [15, 12, 5, 15],
      backgroundColor: ["#60a5fa", "#a78bfa", "#fbbf24", "#34d399"],
      borderWidth: 1,
      borderRadius: 6,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#374151",
        font: {
          size: 12,
        },
      },
    },
    title: {
      display: true,
      text: "Job Statistics Overview",
      color: "#1f2937",
      font: {
        size: 16,
        weight: "bold",
      },
    },
  },
};

const HomePage = () => {
  const { currentUser, showName, jobs } = useAppContext();
  return (
    <div className="">
      {/* Title and Intro */}
      <h1 className="text-xl lg:text-2xl font-semibold tracking-tight my-6 lg:my-8">
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
              <h2 className="text-base md:text-lg text-right lg:text-xl text-gray-500">
                {stat.value}
              </h2>
              <FaArrowTrendUp className="text-green-500 text-xl" />
            </div>
          </div>
        ))}
      </div>

      {/* Chart Overview */}
      <div className="my-8">
        <div className="p-6 rounded-2xl shadow-md bg-white flex items-center justify-center">
          <div
            className={`w-full duration-300 ${
              showName ? "lg:w-[1000px]" : "lg:w-[1100px]"
            } h-80`}
          >
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Chart Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div className="p-6 rounded-2xl shadow-md bg-white flex items-center justify-center">
          <div
            className={`duration-300 ${
              showName ? "lg:w-[450px]" : "lg:w-[500px] "
            } w-full h-80
          `}
          >
            <Bar data={chartData2} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6">
          <CircleChart />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
