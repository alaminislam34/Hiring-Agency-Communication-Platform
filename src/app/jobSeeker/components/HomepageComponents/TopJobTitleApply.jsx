import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register necessary Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TopJobTitleApply = () => {
  // Example static data: Replace with dynamic data if needed
  const data = {
    labels: [
      "Frontend Developer",
      "React Developer",
      "UI/UX Designer",
      "Backend Developer",
      "Full Stack Developer",
    ],
    datasets: [
      {
        label: "Applications",
        data: [8, 10, 4, 5, 6],
        backgroundColor: "#4F46E5", // Indigo-600
        borderRadius: 6,
        barThickness: 20,
      },
    ],
  };

  const options = {
    indexAxis: "y", // This makes it horizontal
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#555",
        },
        grid: {
          color: "#eee",
        },
      },
      y: {
        ticks: {
          color: "#333",
          font: {
            size: 14,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md w-full max-h-[400px] mt-6">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
        Top Applied Job Titles
      </h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TopJobTitleApply;
