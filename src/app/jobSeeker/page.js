"use client";

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
import { CircleCheck } from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";
import { Bookmark } from "lucide-react";
import DashboardTitle from "../components/dashboardComponents/DashboardTitle";
import CircleChart from "../components/dashboardComponents/CircleChart";
import LineChartForPerDayApply from "./components/HomepageComponents/LineChartForPerDayApply";
import TypeWiseApply from "./components/HomepageComponents/TypeWiseApply";
import TopJobTitleApply from "./components/HomepageComponents/TopJobTitleApply";
import { useEffect, useState } from "react";

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
  const { showName, appliedJobsCollection, jobs } = useAppContext();
  const pendingApplications = appliedJobsCollection?.filter(
    (job) => job.status === "Applied"
  );
  const totalInterviews = appliedJobsCollection?.filter(
    (job) => job.status === "interview"
  );
  const [savedJobs, setSavedJobs] = useState([]);

  // unique job type
  const uniqueJobType = [
    ...new Set(appliedJobsCollection?.map((job) => job.jobType)),
  ];

  // Count applications for each unique job type
  const jobApplicationsCount = uniqueJobType?.map((type) => {
    const count = appliedJobsCollection.filter(
      (job) => job.jobType === type
    )?.length;
    return { type, applications: count };
  });

  // unique job title
  const uniqueJobTitle = [
    ...new Set(appliedJobsCollection?.map((job) => job.title)),
  ];
  // Count applications for each unique job title
  const jobApplicationCountTitle = uniqueJobTitle?.map((title) => {
    const count = appliedJobsCollection.filter(
      (job) => job.title === title
    )?.length;
    return { title, count: count };
  });

  useEffect(() => {
    const savedJobs = localStorage.getItem("bookmark") || [];
    setSavedJobs(jobs?.filter((job) => savedJobs.includes(job._id)));
  }, []);

  const stat = [
    {
      title: "Total Apply",
      value: appliedJobsCollection?.length || 0,
      icon: <CircleCheck size={24} />,
    },
    {
      title: "Pending Applications",
      value: pendingApplications?.length || 0,
      icon: <BriefcaseBusiness size={24} />,
    },
    {
      title: "Interviews",
      value: totalInterviews?.length || 0,
      icon: <BriefcaseBusiness size={24} />,
    },
    {
      title: "Saved Jobs",
      value: savedJobs?.length || 0,
      icon: <Bookmark size={24} />,
    },
  ];

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
          <TypeWiseApply jobApplicationsCount={jobApplicationsCount} />
        </div>
      </section>

      {/* {/* ToDo:  Top Job Title Apply overview */}
      <section>
        <TopJobTitleApply jobApplicationCountTitle={jobApplicationCountTitle} />
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
