"use client";

import DashboardTitle from "@/app/components/dashboardComponents/DashboardTitle";
import CircleChart from "@/app/dashboard/components/CircleChart";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chartData = {
  labels: [
    "Total Jobs",
    "Active Jobs",
    "Pending Jobs",
    "Total Applicants",
    "Accepted Applicants",
    "Rejected Applicants",
    "Pending Applicants",
  ],
  datasets: [
    {
      label: "Jobs Count",
      data: [240, 120, 150, 145, 250, 300, 250],
      backgroundColor: [
        "#4ade80",
        "#60a5fa",
        "#facc15",
        "#f97316",
        "#a78bfa",
        "#f87171",
        "#34d399",
      ],
      borderWidth: 1,
      borderRadius: 6,
    },
  ],
};

const chartData2 = {
  labels: ["Total Jobs", "Active Jobs", "Pending Jobs", "Total Applicants"],
  datasets: [
    {
      label: "Jobs Count",
      data: [15, 12, 5, 15],
      backgroundColor: ["#60a5fa", "#a78bfa", "#fbbf24", "#34d399"],
      borderWidth: 1,
      borderRadius: 6,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#374151",
        font: {
          size: 12,
        },
      },
    },
    title: {
      display: true,
      text: "Job Statistics Overview",
      color: "#1f2937",
      font: {
        size: 16,
        weight: "bold",
      },
    },
  },
};

const Overview = () => {
  const { currentUser, showName, jobs } = useAppContext();
  return (
    <div className="">
      <DashboardTitle />
      {/* Chart Overview */}
      <div className="my-8">
        <div className="p-6 rounded-2xl shadow-md bg-white flex items-center justify-center">
          <div
            className={`w-full duration-300 ${
              showName ? "lg:w-[1000px]" : "lg:w-[1100px]"
            } h-80`}
          >
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Chart Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div className="p-6 rounded-2xl shadow-md bg-white flex items-center justify-center">
          <div
            className={`duration-300 ${
              showName ? "lg:w-[450px]" : "lg:w-[500px] "
            } w-full h-80
          `}
          >
            <Bar data={chartData2} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6">
          <CircleChart />
        </div>
      </div>
    </div>
  );
};

export default Overview;
