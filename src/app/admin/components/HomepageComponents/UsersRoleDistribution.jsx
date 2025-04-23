"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Register Pie chart elements
ChartJS.register(ArcElement, Tooltip, Legend, Title);

// Dummy data (dynamic korte chaile props/data fetching use kora jabe)
const data = {
  labels: ["Job Seekers", "Employers", "Moderators", "Admins"],
  datasets: [
    {
      label: "User Role Distribution",
      data: [450, 120, 15, 5], // example values
      backgroundColor: ["#60a5fa", "#34d399", "#facc15", "#f87171"],
      borderWidth: 1,
    },
  ],
};

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
  return (
    <div className="w-full h-full rounded-2xl border border-teal-200">
      <div className="bg-white shadow-md rounded-2xl p-4 h-full mx-auto flex items-center justify-center">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default UserRoleDistribution;
