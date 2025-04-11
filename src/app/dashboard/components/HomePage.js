"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import {
  AiOutlineAppstore,
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineUser,
} from "react-icons/ai";
import { useAppContext } from "@/Providers/AppProviders";

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

/**
 * The main component for the employer dashboard page.
 *
 * This component displays statistics about the employer's jobs and
 * applicants, as well as recent job listings and notifications.
 *
 * @returns A React component that renders the employer dashboard page.
 */
const HomePage = () => {
  const { currentUser } = useAppContext();
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Title and intro */}
      <h1 className="text-3xl font-bold mb-6 first-letter:uppercase">
        {currentUser?.role} Dashboard
      </h1>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="p-4 bg-white shadow-md flex items-center"
          >
            {/* Icon */}
            <div className="ml-4 text-center flex flex-col items-center justify-center">
              {stat.icon}
              {/* Title and value */}
              <p className="text-gray-600">{stat.title}</p>
              <h2 className="text-xl font-semibold">{stat.value}</h2>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent job listings and notifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="p-4 bg-white shadow-md">
          {/* Title */}
          <h2 className="text-xl font-semibold mb-4">Recent Job Listings</h2>
          {/* List of jobs */}
          <ul>
            {recentJobs.map((job, index) => (
              <li key={index} className="py-2 border-b border-b-gray-300">
                {/* Job title, status, and number of applicants */}
                {job.title} - {job.status} ({job.applicants} Applicants)
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-4 bg-white shadow-md">
          {/* Title */}
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          {/* List of notifications */}
          <ul>
            {notifications.map((notification, index) => (
              <li key={index} className="py-2 border-b border-b-gray-300">
                {/* Notification message */}
                {notification}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
