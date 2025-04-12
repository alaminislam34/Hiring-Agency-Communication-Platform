"use client";

import React from "react";
import { Card } from "@/components/ui/card";
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

const stats = [
  { title: "Active Users", value: 24, icon: <AiOutlineAppstore size={24} /> },
  { title: "Active Jobs", value: 12, icon: <AiOutlineCheckCircle size={24} /> },
  { title: "Total Apply", value: 5, icon: <AiOutlineClockCircle size={24} /> },
  { title: "Total Employers", value: 145, icon: <AiOutlineUser size={24} /> },
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
  const { currentUser } = useAppContext();
  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100  text-gray-800  transition-colors duration-300 ">
      {/* Title and Intro */}
      <h1 className="text-xl lg:text-2xl font-semibold mb-8 tracking-tight">
        Welcome back, {currentUser?.name}!<br />
        <span className="text-lg font-medium text-gray-600">
          Here is your <span className="capitalize">{currentUser?.role}</span>{" "}
          dashboard overview
        </span>
      </h1>

      {/* Statistics */}
      <div className="flex flex-wrap justify-between gap-6 mb-10">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="rounded-2xl shadow-lg bg-white  hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 ease-in-out p-4 flex-1"
          >
            <div className="flex items-center gap-3 mb-3">
              {stat.icon}
              <p className="text-sm text-gray-500  font-medium">{stat.title}</p>
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{stat.value}</h2>
              <FaArrowTrendUp className="text-green-500 text-xl" />
            </div>
          </Card>
        ))}
      </div>

      {/* Chart Overview */}
      <div className="my-8">
        <Card className="p-6 rounded-2xl shadow-md bg-white ">
          <div className="h-80">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </Card>
      </div>

      {/* Chart Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <Card className="p-6 rounded-2xl shadow-md bg-white ">
          <div className="h-80">
            <Bar data={chartData2} options={chartOptions} />
          </div>
        </Card>
        <div className="bg-white rounded-2xl shadow-md p-6">
          <CircleChart />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
