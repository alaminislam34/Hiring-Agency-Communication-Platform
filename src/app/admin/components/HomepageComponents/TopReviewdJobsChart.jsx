"use client";
import React from "react";
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

// ChartJS setup
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Dummy top viewed jobs data
const data = {
  labels: [
    "Frontend Developer",
    "Backend Developer",
    "UI/UX Designer",
    "Marketing Manager",
    "HR Executive",
    "Data Analyst",
    "Project Manager",
  ],
  datasets: [
    {
      label: "Views",
      data: [320, 290, 270, 240, 200, 180, 150],
      backgroundColor: "#60a5fa",
      borderRadius: 8,
      barThickness: 28,
    },
  ],
};

const options = {
  indexAxis: "y", // horizontal bar chart
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Top Viewed Job Posts",
      color: "#1f2937",
      font: {
        size: 18,
        weight: "bold",
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#374151",
        beginAtZero: true,
      },
      grid: {
        color: "#f3f4f6",
      },
    },
    y: {
      ticks: {
        color: "#374151",
      },
      grid: {
        color: "#f3f4f6",
      },
    },
  },
};

// Component
const TopViewedJobsChart = () => {
  return (
    <div className="rounded-2xl  shadow-md bg-white p-4 w-full h-full max-h-[400px] border border-teal-200">
      <Bar data={data} options={options} />
    </div>
  );
};

export default TopViewedJobsChart;
