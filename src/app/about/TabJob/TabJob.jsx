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
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Failed to load jobs:", error);
      }
    };
    allJobs();
  }, []);

  const categories = {
    Design: jobs.filter((job) => /design/i.test(job.jobTitle || "")),
    Engineering: jobs.filter((job) =>
      /(engineering|engineer|software engineer)/i.test(job.jobTitle || "")
    ),
    Success: jobs.filter((job) => /customer/i.test(job.jobTitle || "")),
    Sales: jobs.filter((job) => /sales/i.test(job.jobTitle || "")),
  };

  const tabTitles = {
    Design: "Design Jobs",
    Engineering: "Software Engineering Jobs",
    Success: "Customer Success Jobs",
    Sales: "Sales Jobs",
  };

  const tabDescriptions = {
    Design: "Explore opportunities in graphic and product design.",
    Engineering:
      "Build innovative solutions and shape the future of technology.",
    Success: "Support clients and ensure their satisfaction with our services.",
    Sales: "Drive growth and generate revenue by connecting with clients.",
  };

  return (
    <div className="my-10">
      <div className="text-center my-8">
        <h1 className="text-3xl font-bold text-[#084049]">Open Positions</h1>
        <p className="mt-2 w-full md:w-[90%] lg:w-[80%] xl:w-[50%] mx-auto font-semibold">
          Want to work with some of the best global talent and build software
          used by all the companies you know and love? Join the team -- we're
          hiring!
        </p>
      </div>

      {/* Tabs */}
      <div className="tabs tabs-boxed flex justify-center gap-2 flex-wrap">
        {Object.keys(categories).map((cat) => (
          <button
            key={cat}
            className={`tab ${activeTab === cat ? "tab-active" : ""}`}
            onClick={() => setActiveTab(cat)}
          >
            {cat === "Success"
              ? "Customer Success"
              : cat === "Engineering"
              ? "Software Engineering"
              : cat}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6 space-y-4">
        <h2 className="text-xl text-[#084049] font-bold">
          {tabTitles[activeTab]}
        </h2>
        <p>{tabDescriptions[activeTab]}</p>

        {categories[activeTab]?.length > 0 ? (
          categories[activeTab].map((job) => (
            <div key={job._id} className="border rounded-lg p-4 bg-base-100">
              <h3 className="text-lg font-bold">{job.jobTitle}</h3>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Company:</span> {job.companyName}{" "}
                <br />
                <span className="font-bold">Type:</span> {job.jobType} <br />
                <span className="font-bold">Location:</span> {job.location}{" "}
                <br />
                <span className="font-bold">Deadline:</span> {job.deadline}
              </p>
              <Link href={`/jobs/${job._id}`}>
                <button className="btn btn-sm mt-4 bg-[#084049] text-white hover:bg-red-600">
                  View Job
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">
            No jobs available in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default TabJob;
