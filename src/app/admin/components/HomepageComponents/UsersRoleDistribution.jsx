"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { useAppContext } from "@/Providers/AppProviders";

// Register Pie chart elements
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "#1f2937",
        font: {
          size: 13,
        },
      },
    },
    title: {
      display: true,
      text: "User Role Distribution",
      color: "teal",
      font: {
        size: 16,
        weight: "bold",
      },
    },
  },
};

const UserRoleDistribution = () => {
  const { totalUsers } = useAppContext();

  const totalEmployer = totalUsers?.filter((user) => user.role === "employer");
  const totalJobSeeker = totalUsers?.filter(
    (user) => user.role === "jobSeeker"
  );
  const totalAdmin = totalUsers?.filter((user) => user.role === "admin");
  const data = {
    labels: ["Job Seekers", "Employers", "Admin"],
    datasets: [
      {
        label: "User Role Distribution",
        data: [
          totalJobSeeker?.length || 0,
          totalEmployer?.length || 0,
          totalAdmin?.length || 0,
        ],
        backgroundColor: ["#2563eb", "#ca8a04", "#059669"],

        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full h-full rounded-2xl border border-teal-200">
      <div className="bg-white shadow-md rounded-2xl p-4 h-full mx-auto flex items-center justify-center">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default UserRoleDistribution;
