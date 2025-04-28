"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js এর required parts গুলো register করা
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const UserActivityChart = ({ activityData }) => {
  const data = {
    labels: activityData.map((item) => item.date),
    datasets: [
      {
        label: "User Activities",
        data: activityData.map((item) => item.activities),
        fill: false,
        borderColor: "#6366F1", // Indigo color
        backgroundColor: "#6366F1",
        tension: 0.4, // curve smoothness
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#6366F1",
        pointBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointHoverBorderWidth: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#ffffff",
        bodyColor: "#d1d5db",
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        grid: {
          color: "#e5e7eb",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        User Activity Chart
      </h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default UserActivityChart;
