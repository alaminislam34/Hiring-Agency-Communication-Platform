"use client";
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

// Register chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Chart Data
const chartData = {
  labels: [
    "Software Engineering",
    "Digital Marketing",
    "Product Management",
    "Customer Success",
    "Design",
    "Sales",
    "Marketing",
    "Finance",
    "Human Resources",
    "Operations",
  ],
  datasets: [
    {
      label: "Jobs Count",
      data: [240, 120, 150, 145, 250, 300, 250, 200, 180, 190],
      backgroundColor: [
        "#4ade80", // Green
        "#60a5fa", // Blue
        "#facc15", // Yellow
        "#f97316", // Orange
        "#a78bfa", // Purple
        "#f87171", // Red
        "#34d399", // Emerald
      ],
      borderWidth: 1,
      borderRadius: 6,
    },
  ],
};

// Chart Options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "#374151",
        font: {
          size: 13,
        },
      },
    },
    title: {
      display: true,
      text: "Job Statistics Overview",
      color: "teal",
      font: {
        size: 18,
        weight: "bold",
      },
      padding: {
        top: 10,
        bottom: 20,
      },
    },
  },
};

const TotalJobStatistics = () => {
  return (
    <div className="w-full h-full rounded-2xl border border-teal-200">
      <div className="rounded-2xl shadow-lg bg-white p-4 w-full h-[450px]">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default TotalJobStatistics;
