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
import { useAppContext } from "@/Providers/AppProviders";

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
  const { jobs } = useAppContext();
  const company = jobs?.map((job) => job.meta.postedBy);
  const uniqueCompany = [...new Set(company)];
  const jobsCount = uniqueCompany?.map((name) => {
    const count = jobs?.filter((job) => job.meta.postedBy === name)?.length;
    return count;
  });

  // Dummy Top Employers data
  const data = {
    labels: uniqueCompany,
    datasets: [
      {
        label: "Job Posts",
        data: jobsCount,
        backgroundColor: "teal",
        borderRadius: 6,
        barThickness: 24,
      },
    ],
  };

  return (
    <div className="w-full h-full rounded-2xl border border-teal-200">
      <div className="rounded-2xl bg-white shadow-md w-full h-[300px] lg:h-[400px] p-4">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default TopEmployersByJobPost;
