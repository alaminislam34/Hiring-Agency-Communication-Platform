"use client";
import React, { useState, useMemo } from "react";
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
import { parseISO, isSameMonth, subMonths } from "date-fns";

// Chart.js এর প্রয়োজনীয় কম্পোনেন্ট রেজিস্টার করা
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// চার্টের অপশন সেটআপ
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#1f2937",
        font: {
          size: 12,
        },
      },
    },
    title: {
      display: true,
      text: "Daily New Applications",
      color: "teal",
      font: {
        size: 16,
        weight: "bold",
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#374151",
      },
      grid: {
        color: "#e5e7eb",
      },
    },
    y: {
      ticks: {
        color: "#374151",
      },
      grid: {
        color: "#e5e7eb",
      },
    },
  },
};

// হেল্পার ফাংশন: নির্দিষ্ট মাসের জন্য প্রতিদিনের অ্যাপ্লিকেশন সংখ্যা গণনা
const getDailyApplicationCounts = (jobs, selectedMonth) => {
  const now = new Date();
  const targetMonth = selectedMonth === "current" ? now : subMonths(now, 1);

  const filteredJobs = jobs.filter((job) =>
    isSameMonth(parseISO(job.createdAt), targetMonth)
  );

  const daysInMonth = new Date(
    targetMonth.getFullYear(),
    targetMonth.getMonth() + 1,
    0
  ).getDate();
  const dailyCounts = Array(daysInMonth).fill(0);

  filteredJobs.forEach((job) => {
    const date = parseISO(job.createdAt);
    const day = date.getDate();
    dailyCounts[day - 1]++;
  });

  const labels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);
  return { labels, data: dailyCounts };
};

const PerDayApplications = () => {
  const { totalAppliedJobs } = useAppContext();
  const [selectedMonth, setSelectedMonth] = useState("current"); // ✅ এখানে ভুল ঠিক করা হয়েছে

  const { labels, data: chartData } = useMemo(
    () => getDailyApplicationCounts(totalAppliedJobs || [], selectedMonth),
    [totalAppliedJobs, selectedMonth]
  );

  const data = {
    labels,
    datasets: [
      {
        label: "New Applications",
        data: chartData,
        borderColor: "#3b82f6",
        backgroundColor: "#93c5fd",
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
      },
    ],
  };

  return (
    <div className="w-full h-full rounded-2xl border border-teal-200">
      <div className="rounded-2xl bg-white shadow-md p-4 w-full h-[300px] lg:h-[400px]">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-md font-semibold text-teal-700">
            Daily Applications
          </h2>
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="current">This Month</option>
            <option value="previous">Last Month</option>
          </select>
        </div>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default PerDayApplications;
