"use client";
import React, { useEffect, useState } from "react";
import SectionTitle from "@/app/components/SectionTitle";
import { useRouter } from "next/navigation";
import Link from "next/link";

const TabJob = () => {
  const [activeTab, setActiveTab] = useState("Design");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const allJobs = async () => {
      const res = await fetch("/api/jobs");
      const data = await res.json(); // Add await here
      console.log("All jobs from about page", data);
      setJobs(data);
    };
    allJobs();
  }, []);

  // Categorize jobs dynamically (use regX)
  const categories = {
    Design: jobs.filter((job) => /design/i.test(job.jobTitle || "")),
    Engineering: jobs.filter((job) =>
      /(engineering|engineer|software engineer)/i.test(job.jobTitle || "")
    ),
    Customer_Success: jobs.filter((job) =>
      /customer/i.test(job.jobTitle || "")
    ),
    Sales: jobs.filter((job) => /sales/i.test(job.jobTitle || "")),
  };

  return (
    <div className="my-10">
      <SectionTitle
        title={"Open Positions"}
        className="text-3xl font-bold text-[#084049]"
        subtitle={
          <span
            dangerouslySetInnerHTML={{
              __html:
                "Want to work with some of the best global talent and build software used <br /> by all the companies you know and love? Join the team -- we're hiring!",
            }}
          />
        }></SectionTitle>

      {/* Tabs */}
      <div className="tabs tabs-boxed flex justify-center">
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            className={`tab ${activeTab === category ? "tab-active" : ""}`}
            onClick={() => setActiveTab(category)}>
            {category}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {categories[activeTab]?.length > 0 ? (
          categories[activeTab].map((job) => (
            <div
              key={job._id}
              className="border rounded-lg p-4 bg-base-100 mt-4 ml-2">
              <h3 className="text-lg font-bold">{job.jobTitle}</h3>
              <p className="text-sm text-gray-600">
                {" "}
                <span className="font-bold">Company Name</span>:{" "}
                {job.companyName}
              </p>
              <p className="text-sm text-gray-600">
                {" "}
                <span className="font-bold">Job Type:</span>: {job.jobType}
              </p>
              <p className="text-sm text-gray-600">
                {" "}
                <span className="font-bold">DeadLine:</span>: {job.deadline}
              </p>
              <p className="text-sm text-gray-600">
                {" "}
                <span className="font-bold">Location:</span>: {job.location}
              </p>
              <Link href={`/jobs/${job._id}`}>
                <button className="btn btn-primary btn-sm mt-4">
                  View Job
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p>No jobs available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default TabJob;
