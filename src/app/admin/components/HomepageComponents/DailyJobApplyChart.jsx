"use client";
import React from "react";
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
import { Line } from "react-chartjs-2";

// ChartJS setup
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Dummy daily apply data
const data = {
  labels: [
    "Apr 15",
    "Apr 16",
    "Apr 17",
    "Apr 18",
    "Apr 19",
    "Apr 20",
    "Apr 21",
  ],
  datasets: [
    {
      label: "Applications Per Day",
      data: [5, 8, 4, 9, 12, 7, 11],
      fill: false,
      borderColor: "#4f46e5",
      backgroundColor: "#6366f1",
      tension: 0.3,
      pointBorderColor: "#4f46e5",
      pointBackgroundColor: "#fff",
      pointRadius: 5,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top",
      labels: {
        color: "#111827",
      },
    },
    title: {
      display: true,
      text: "Daily Job Applications",
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
      },
      grid: {
        color: "#f3f4f6",
      },
    },
    y: {
      ticks: {
        color: "#374151",
        beginAtZero: true,
      },
      grid: {
        color: "#f3f4f6",
      },
    },
  },
};

// Component
const DailyJobApplyLineChart = () => {
  return (
    <div className="rounded-2xl shadow-md bg-white p-4 w-full max-h-[400px] h-full  border border-teal-200">
      <Line data={data} options={options} />
    </div>
  );
};

export default DailyJobApplyLineChart;
