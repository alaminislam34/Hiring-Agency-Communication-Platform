"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Dummy monthly user registration data
const data = {
  labels: ["Sat", "Sun", "Mon", "Tues", "Wed", "Thu", "Fri"],
  datasets: [
    {
      label: "New Applications",
      data: [20, 60, 100, 15, 45, 150, 35],
      borderColor: "#3b82f6",
      backgroundColor: "#93c5fd",
      tension: 0.3,
      pointRadius: 5,
      pointHoverRadius: 7,
      fill: true,
    },
  ],
};

// Chart options
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#1f2937",
        font: {
          size: 12,
        },
      },
    },
    title: {
      display: true,
      text: "Monthly New User Registrations",
      color: "teal",
      font: {
        size: 16,
        weight: "bold",
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#374151",
      },
      grid: {
        color: "#e5e7eb",
      },
    },
    y: {
      ticks: {
        color: "#374151",
      },
      grid: {
        color: "#e5e7eb",
      },
    },
  },
};

const PerDayApplications = () => {
  return (
    <div className=" w-full h-full rounded-2xl  border border-teal-200">
      <div className="rounded-2xl bg-white shadow-md p-4 w-full h-[300px] lg:h-[400px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default PerDayApplications;
