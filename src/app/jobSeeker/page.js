"use client";

import DashboardTitle from "@/app/components/dashboardComponents/DashboardTitle";
import CircleChart from "@/app/dashboard/components/CircleChart";
import { useAppContext } from "@/Providers/AppProviders";
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
import LineChartForPerDayApply from "./components/HomepageComponents/LineChartForPerDayApply";
import TypeWiseApply from "./components/HomepageComponents/TypeWiseApply";
import TopJobTitleApply from "./components/HomepageComponents/TopJobTitleApply";
import { CircleCheck } from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";
import { Bookmark } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
  const stat = [
    { title: "Applied Jobs", value: 5, icon: <CircleCheck size={24} /> },
    {
      title: "Pending Applications",
      value: 24,
      icon: <BriefcaseBusiness size={24} />,
    },
    {
      title: "Success Rate",
      value: 12,
      icon: <BriefcaseBusiness size={24} />,
    },
    { title: "Saved Jobs", value: 145, icon: <Bookmark size={24} /> },
  ];
  const { currentUser, showName, jobs } = useAppContext();
  return (
    <div className="">
      <DashboardTitle stat={stat} />

      {/* daily apply chart or category wise apply overview */}
      <section className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 gap-4">
        <div className="md:col-span-4 lg:col-span-5">
          {/* ToDo:  JobSeeker Daily Apply Job overview */}
          <LineChartForPerDayApply />
        </div>
        <div className="md:col-span-2 lg:col-span-3">
          {/* ToDo:  Job Apply for category overview */}
          <TypeWiseApply />
        </div>
      </section>

      {/* {/* ToDo:  Top Job Title Apply overview */}
      <section>
        <TopJobTitleApply />
      </section>

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
