"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Register Pie chart elements
ChartJS.register(ArcElement, Tooltip, Legend, Title);

// Dummy data (dynamic korte chaile props/data fetching use kora jabe)
const data = {
  labels: ["Accepted", "Rejected", "Pending"],
  datasets: [
    {
      label: "User Role Distribution",
      data: [450, 120, 15], // example values
      backgroundColor: ["#34d399", "#d33", "#facc15"],
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

const ApplicationStatusChart = () => {
  return (
    <div className="w-full h-full rounded-2xl border border-teal-200">
      <div className="bg-white shadow-md rounded-2xl p-4 mx-auto flex items-center justify-center  h-[300px] lg:h-[400px]">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default ApplicationStatusChart;
