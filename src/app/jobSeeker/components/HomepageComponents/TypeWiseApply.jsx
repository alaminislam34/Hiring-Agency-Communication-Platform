import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);

const TypeWiseApply = ({ jobApplicationsCount }) => {
  const labels = jobApplicationsCount?.map((item) => item.type);
  const value = jobApplicationsCount?.map((item) => item.applications);
  // Dummy data: replace later with dynamic data
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Applications",
        data: value,
        backgroundColor: [
          "#4F46E5", // Indigo
          "#22C55E", // Green
          "#F59E0B", // Amber
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "60%", // thickness of doughnut
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#333",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
        Job Applications by Job Type
      </h2>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default TypeWiseApply;
