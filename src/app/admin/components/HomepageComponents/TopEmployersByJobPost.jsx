"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Dummy Top Employers data
const data = {
  labels: [
    "Tech Solutions Ltd.",
    "HireX Bangladesh",
    "DevNet Systems",
    "JobEase",
    "SkillBridge",
    "NextGen Jobs",
  ],
  datasets: [
    {
      label: "Job Posts",
      data: [45, 38, 30, 25, 20, 15],
      backgroundColor: "teal",
      borderRadius: 6,
      barThickness: 24,
    },
  ],
};

// Chart Options
const options = {
  indexAxis: "y", // Make it horizontal
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Top Employers by Job Posts",
      color: "teal",
      font: {
        size: 16,
        weight: "bold",
      },
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      ticks: {
        color: "#374151",
        stepSize: 5,
      },
      grid: {
        color: "#e5e7eb",
      },
    },
    y: {
      ticks: {
        color: "#374151",
        font: {
          size: 13,
        },
      },
      grid: {
        display: false,
      },
    },
  },
};

const TopEmployersByJobPost = () => {
  return (
    <div className="w-full h-full rounded-2xl border border-teal-200">
      <div className="rounded-2xl bg-white shadow-md w-full h-[300px] lg:h-[400px] p-4">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default TopEmployersByJobPost;
