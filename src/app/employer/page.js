import React from "react";
import DashboardTitle from "../components/dashboardComponents/DashboardTitle";
import { BriefcaseBusiness } from "lucide-react";
import { CircleCheck } from "lucide-react";
import Homepage from "./components/HomepageComponents/Homepage";

const EmployerOverview = () => {
  const stat = [
    {
      title: "Active Jobs",
      value: 24,
      icon: <BriefcaseBusiness size={24} />,
    },
    {
      title: "Deactivated Jobs",
      value: 12,
      icon: <BriefcaseBusiness size={24} />,
    },
    {
      title: "Total Applications",
      value: 5,
      icon: <CircleCheck size={24} />,
    },
    {
      title: "Pending Applicants",
      value: 145,
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
