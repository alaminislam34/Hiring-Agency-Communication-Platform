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
      <div className="text-center my-8">
        <h1 className="text-3xl font-bold text-[#084049]">Open Positions</h1>
        <p
          className={`mt-2 text-center w-full md:w-[90%] lg:w-[80%] xl:w-[50%]  mx-auto font-semibold`}
        >
          Want to work with some of the best global talent and build software
          used by all the companies you know and love? Join the team -- we're
          hiring!
        </p>
      </div>

      {/* Tabs */}
      <div className="tabs tabs-boxed flex justify-center">
        <button
          className={`tab ${activeTab === "Design" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("Design")}
        >
          Design
        </button>
        <button
          className={`tab ${activeTab === "Engineering" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("Engineering")}
        >
          Software Engineering
        </button>
        <button
          className={`tab ${activeTab === "Success" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("Success")}
        >
          Customer Success
        </button>
        <button
          className={`tab ${activeTab === "Sales" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("Sales")}
        >
          Sales
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "Design" && (
          <div className="space-y-4">
            <h2 className="text-xl text-[#084049] font-bold">Design Jobs</h2>
            <p>Explore opportunities in graphic and product design.</p>
            <div className="border rounded-lg p-4 bg-base-100">
              <h3 className="text-lg font-bold">Product Designer</h3>
              <p className="text-sm text-gray-600">
                {" "}
                <span className="font-bold">Company Name</span>:{" "}
                {job.companyName}
              </p>
<<<<<<< HEAD
              <button className="btn btn-sm mt-4 bg-[#084049] text-white hover:bg-red-600">View Job</button>
=======
              <button className="btn btn-sm mt-4 bg-[#084049] text-white hover:bg-red-600">
                View Job
              </button>
>>>>>>> 67d31c8c67e1b672a2a892a8fe3d3c707272ba02
            </div>
            <div className="border rounded-lg p-4 bg-base-100">
              <h3 className="text-lg font-bold">Graphics Designer</h3>
              <p className="text-sm text-gray-600">
                Mid-level product designer needed to join our dynamic team.
              </p>
              <button className="btn btn-sm mt-4 bg-[#084049] text-white hover:bg-red-600">
                View Job
              </button>
            </div>
            <div className="border rounded-lg p-4 bg-base-100">
              <h3 className="text-lg font-bold">Web Designer</h3>
              <p className="text-sm text-gray-600">
                Mid-level product designer needed to join our dynamic team.
              </p>
              <button className="btn btn-sm mt-4 bg-[#084049] text-white hover:bg-red-600">
                View Job
              </button>
            </div>
          </div>
        )}

        {activeTab === "Engineering" && (
          <div className="space-y-4">
            <h2 className="text-xl text-[#084049] font-bold">
              Software Engineering Jobs
            </h2>
            <p>
              Build innovative solutions and shape the future of technology.
            </p>
            <div className="border rounded-lg p-4 bg-base-100">
              <h3 className="text-lg font-bold">Frontend Developer</h3>
              <p className="text-sm text-gray-600">
                {" "}
                <span className="font-bold">Job Type:</span>: {job.jobType}
              </p>
              <button className="btn btn-primary btn-sm mt-4">View Job</button>
            </div>
          </div>
        )}

        {activeTab === "Success" && (
          <div className="space-y-4">
            <h2 className="text-xl text-[#084049] font-bold">
              Customer Success Jobs
            </h2>
            <p>
              Support clients and ensure their satisfaction with our services.
            </p>
            <div className="border rounded-lg p-4 bg-base-100">
              <h3 className="text-lg font-bold">Customer Support Specialist</h3>
              <p className="text-sm text-gray-600">
                {" "}
                <span className="font-bold">DeadLine:</span>: {job.deadline}
              </p>
              <button className="btn btn-primary btn-sm mt-4">View Job</button>
            </div>
          </div>
        )}

<<<<<<< HEAD
        {(activeTab === "Sales" && (
=======
        {activeTab === "Sales" ? (
>>>>>>> 67d31c8c67e1b672a2a892a8fe3d3c707272ba02
          <div className="space-y-4">
            <h2 className="text-xl text-[#084049] font-bold">Sales Jobs</h2>
            <p>Drive growth and generate revenue by connecting with clients.</p>
            <div className="border rounded-lg p-4 bg-base-100">
              <h3 className="text-lg font-bold">Sales Representative</h3>
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
<<<<<<< HEAD
            </div>
          )): (
=======
          </div>
        ) : (
>>>>>>> 67d31c8c67e1b672a2a892a8fe3d3c707272ba02
          <p>No jobs available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default TabJob;
