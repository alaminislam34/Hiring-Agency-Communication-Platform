"use client";
import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
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
import { useAppContext } from "@/Providers/AppProviders";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DailyUserRegistrationChart = () => {
  const { totalUsers } = useAppContext();

  // Calculate daily registrations
  const { dates, counts } = useMemo(() => {
    if (!totalUsers) return { dates: [], counts: [] };

    const dateCountMap = {};

    totalUsers.forEach((user) => {
      const date = new Date(user.createdAt).toISOString().split("T")[0]; // "YYYY-MM-DD"
      if (dateCountMap[date]) {
        dateCountMap[date]++;
      } else {
        dateCountMap[date] = 1;
      }
    });

    const sortedDates = Object.keys(dateCountMap).sort(); // Sort dates ascending
    const counts = sortedDates.map((date) => dateCountMap[date]);

    return { dates: sortedDates, counts };
  }, [totalUsers]);

  const data = {
    labels: dates,
    datasets: [
      {
        label: "New Users Per Day",
        data: counts,
        borderColor: "#2563eb",
        backgroundColor: "#93c5fd",
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#1f2937",
          font: { size: 12 },
        },
      },
      title: {
        display: true,
        text: "Daily New User Registrations",
        color: "teal",
        font: { size: 16, weight: "bold" },
      },
    },
    scales: {
      x: {
        ticks: { color: "#374151" },
        grid: { color: "#e5e7eb" },
      },
      y: {
        ticks: { color: "#374151" },
        grid: { color: "#e5e7eb" },
        beginAtZero: true,
        precision: 0,
      },
    },
  };

  return (
    <div className="w-full h-full rounded-2xl border border-teal-200">
      <div className="rounded-2xl bg-white shadow-md p-4 w-full h-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default DailyUserRegistrationChart;
