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

// Chart.js components রেজিস্টার করা
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const stats = [
  { title: "Total Jobs", value: 24, icon: <AiOutlineAppstore size={24} /> },
  { title: "Active Jobs", value: 12, icon: <AiOutlineCheckCircle size={24} /> },
  { title: "Pending Jobs", value: 5, icon: <AiOutlineClockCircle size={24} /> },
  { title: "Total Applicants", value: 145, icon: <AiOutlineUser size={24} /> },
];

const recentJobs = [
  { title: "Senior React Developer", applicants: 45, status: "Active" },
  { title: "UI/UX Designer", applicants: 30, status: "Pending" },
  { title: "Backend Engineer", applicants: 25, status: "Active" },
];

const notifications = [
  "John Doe applied for Senior React Developer",
  "New job posting approved: Backend Engineer",
  "Your job UI/UX Designer is under review",
];

// Chart data configuration
const chartData = {
  labels: ["Total Jobs", "Active Jobs", "Pending Jobs"],
  datasets: [
    {
      label: "Jobs Count",
      data: [24, 12, 5],
      backgroundColor: [
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 159, 64, 0.6)",
      ],
      borderColor: [
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Job Statistics Overview",
    },
  },
};

/**
 * The main component for the employer dashboard page.
 *
 * This component displays statistics about the employer's jobs and
 * applicants, as well as recent job listings, notifications, and a chart.
 *
 * @returns A React component that renders the employer dashboard page.
 */
const HomePage = () => {
  const { currentUser } = useAppContext();
  return (
    <div className="p-6 min-h-screen">
      {/* Title and Intro */}
      <h1 className="text-xl mb-6 first-letter:uppercase">
        Hello! {currentUser?.name}, Welcome to your {currentUser?.role}{" "}
        Dashboard
      </h1>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4 bg-white shadow-md">
            <div className="flex flex-row items-center justify-start gap-2">
              {stat.icon}
              <p className="text-gray-600">{stat.title}</p>
            </div>
            <div className="flex flex-row items-center justify-between">
              {" "}
              <h2 className="">{stat.value}</h2>
              <FaArrowTrendUp className="text-green-500 text-xl" />
            </div>
          </Card>
        ))}
      </div>

      {/* Chart Overview */}
      <div className="mt-6">
        <Card className="p-4 bg-white shadow-md">
          <Bar data={chartData} options={chartOptions} />
        </Card>
      </div>

      {/* Recent Job Listings and Notifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="p-4 bg-white shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Job Listings</h2>
          <ul>
            {recentJobs.map((job, index) => (
              <li key={index} className="py-2 border-b border-b-gray-300">
                {job.title} - {job.status} ({job.applicants} Applicants)
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-4 bg-white shadow-md">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <ul>
            {notifications.map((notification, index) => (
              <li key={index} className="py-2 border-b border-b-gray-300">
                {notification}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
