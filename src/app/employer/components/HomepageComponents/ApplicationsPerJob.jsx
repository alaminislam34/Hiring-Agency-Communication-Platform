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

// Chart.js রেজিস্ট্রেশন
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// চার্ট অপশন
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
      text: "My Jobs by Type",
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

const ApplicationsPerJob = () => {
  const { jobs, currentUser } = useAppContext();

  const myJobs =
    jobs?.filter((job) => job.meta.postedById === currentUser?._id) || [];
  const jobTypes = myJobs?.map((job) => job.type) || [];
  const uniqueType = [...new Set(jobTypes)];
  const jobTypeCount = uniqueType?.map((type) => {
    const count = myJobs?.filter((job) => job.type === type)?.length || 0;
    return count;
  });
  console.log(jobTypes, jobTypeCount);
  const chartData = {
    labels: uniqueType,
    datasets: [
      {
        label: "Jobs Count",
        data: jobTypeCount,
        backgroundColor: ["#60a5fa", "#facc15", "#34d399", "#f87171"],
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

export default ApplicationsPerJob;
