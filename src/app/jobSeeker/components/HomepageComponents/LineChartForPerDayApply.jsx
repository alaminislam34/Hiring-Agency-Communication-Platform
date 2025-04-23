import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const LineChartForPerDayApply = () => {
  // Dummy data: Replace later with dynamic data
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
        label: "Jobs Applied Per Day",
        data: [1, 3, 2, 0, 5, 2, 4],
        borderColor: "#4F46E5", // Indigo-600
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#4F46E5",
        pointBorderWidth: 2,
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
          color: "#333",
          font: {
            size: 14,
          },
        },
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
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: "#555",
        },
        grid: {
          color: "#eee",
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md w-full h-full">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
        Daily Job Application Overview
      </h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChartForPerDayApply;
