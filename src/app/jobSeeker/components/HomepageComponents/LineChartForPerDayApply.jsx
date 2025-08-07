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
import { useAppContext } from "@/Providers/AppProviders";
import dayjs from "dayjs"; // dayjs ব্যবহার করে date formatting

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
  const { appliedJobsCollection } = useAppContext();
  const dailyApplications = {};

  appliedJobsCollection?.forEach((job) => {
    const date = dayjs(job.createdAt).format("MMM D");

    if (!dailyApplications[date]) {
      dailyApplications[date] = 1;
    } else {
      dailyApplications[date] += 1;
    }
  });

  // Step 2: Prepare labels (dates) and data (counts)
  const labels = Object.keys(dailyApplications).sort(); // Sort dates
  const data = labels.map((date) => dailyApplications[date]);

  // Step 3: Set up the chart data
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Jobs Applied Per Day",
        data: data,
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#4F46E5",
        pointBorderWidth: 2,
      },
    ],
  };

  // Chart options
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
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChartForPerDayApply;
