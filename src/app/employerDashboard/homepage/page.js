"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import {
  AiOutlineAppstore,
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineUser,
} from "react-icons/ai";

const stats = [
  { title: "Total Jobs", value: 24, icon: <AiOutlineAppstore size={24} /> },
  { title: "Active Jobs", value: 12, icon: <AiOutlineCheckCircle size={24} /> },
  { title: "Pending Jobs", value: 5, icon: <AiOutlineClockCircle size={24} /> },
  { title: "Total Applicants", value: 145, icon: <AiOutlineUser size={24} /> },
];

const recentJobs = [
  { title: "Senior React Developer", applicants: 45, status: "Active" },
  { title: "UI/UX Designer", applicants: 30, status: "Pending" },
  { title: "Backend Engineer", applicants: 25, status: "Active" },
];

const notifications = [
  "John Doe applied for Senior React Developer",
  "New job posting approved: Backend Engineer",
  "Your job UI/UX Designer is under review",
];

const EmployerDashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Employer Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="p-4 bg-white shadow-md flex items-center"
          >
            {stat.icon}
            <div className="ml-4">
              <p className="text-gray-600">{stat.title}</p>
              <h2 className="text-xl font-semibold">{stat.value}</h2>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="p-4 bg-white shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Job Listings</h2>
          <ul>
            {recentJobs.map((job, index) => (
              <li key={index} className="py-2 border-b">
                {job.title} - {job.status} ({job.applicants} Applicants)
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-4 bg-white shadow-md">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <ul>
            {notifications.map((notification, index) => (
              <li key={index} className="py-2 border-b">
                {notification}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default EmployerDashboard;
