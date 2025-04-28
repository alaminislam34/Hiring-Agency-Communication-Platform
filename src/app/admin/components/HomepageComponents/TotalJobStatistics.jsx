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
import { useAppContext } from "@/Providers/AppProviders";

// Register chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
  const { jobs } = useAppContext();
  const jobsTitle = jobs?.map((job) => job.title);
  const uniqueJobsTitle = [...new Set(jobsTitle)];
  const jobsCount = uniqueJobsTitle?.map((title) => {
    const count = jobs?.filter((job) => job.title === title)?.length;
    return count;
  });
  // Chart Data
  const chartData = {
    labels: uniqueJobsTitle,
    datasets: [
      {
        label: "Jobs Count",
        data: jobsCount,
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

  return (
    <div className="w-full h-full rounded-2xl border border-teal-200">
      <div className="rounded-2xl shadow-lg bg-white p-4 w-full h-[450px]">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default TotalJobStatistics;
