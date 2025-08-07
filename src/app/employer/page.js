"use client";
import DashboardTitle from "../components/dashboardComponents/DashboardTitle";
import { BriefcaseBusiness } from "lucide-react";
import { CircleCheck } from "lucide-react";
import Homepage from "./components/HomepageComponents/Homepage";
import { useAppContext } from "@/Providers/AppProviders";
import Head from "next/head";

const EmployerOverview = () => {
  const { jobs, appliedJobsCollection, currentUser } = useAppContext();
  const myJobs = jobs?.filter(
    (job) => job.meta.postedById === currentUser?._id
  );
  const activeJobs =
    myJobs?.filter((job) => job.status === "active")?.length || 0;
  const deactivateJobs =
    myJobs?.filter((job) => job.status === "deactivate")?.length || 0;

  const stat = [
    {
      title: "Active Jobs",
      value: activeJobs,
      icon: <BriefcaseBusiness size={24} />,
    },
    {
      title: "Deactivated Jobs",
      value: deactivateJobs,
      icon: <BriefcaseBusiness size={24} />,
    },
    {
      title: "Total Applications",
      value: appliedJobsCollection?.length || 0,
      icon: <CircleCheck size={24} />,
    },
    {
      title: "Pending Applicants",
      value:
        appliedJobsCollection?.filter((job) => job.status === "Applied")
          ?.length || 0,
      icon: <CircleCheck size={24} />,
    },
  ];
  return (
    <div>
      <DashboardTitle stat={stat} />
      <Homepage />
    </div>
  );
};

export default EmployerOverview;
