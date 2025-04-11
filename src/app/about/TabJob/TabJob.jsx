import React, { useState } from "react";
import SectionTitle from "@/app/components/SectionTitle";

const TabJob = () => {
  // State to manage active tab
  const [activeTab, setActiveTab] = useState("Design");

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
        <button
          className={`tab ${activeTab === "Design" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("Design")}>
          Design
        </button>
        <button
          className={`tab ${activeTab === "Engineering" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("Engineering")}>
          Software Engineering
        </button>
        <button
          className={`tab ${activeTab === "Success" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("Success")}>
          Customer Success
        </button>
        <button
          className={`tab ${activeTab === "Sales" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("Sales")}>
          Sales
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "Design" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Design Jobs</h2>
            <p>Explore opportunities in graphic and product design.</p>
            <div className="border rounded-lg p-4 bg-base-100">
              <h3 className="text-lg font-bold">Product Designer</h3>
              <p className="text-sm text-gray-600">
                Mid-level product designer needed to join our dynamic team.
              </p>
              <button className="btn btn-primary btn-sm mt-4">View Job</button>
            </div>
          </div>
        )}

        {activeTab === "Engineering" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Software Engineering Jobs</h2>
            <p>
              Build innovative solutions and shape the future of technology.
            </p>
            <div className="border rounded-lg p-4 bg-base-100">
              <h3 className="text-lg font-bold">Frontend Developer</h3>
              <p className="text-sm text-gray-600">
                Work on cutting-edge web applications with React and Tailwind.
              </p>
              <button className="btn btn-primary btn-sm mt-4">View Job</button>
            </div>
          </div>
        )}

        {activeTab === "Success" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Customer Success Jobs</h2>
            <p>
              Support clients and ensure their satisfaction with our services.
            </p>
            <div className="border rounded-lg p-4 bg-base-100">
              <h3 className="text-lg font-bold">Customer Support Specialist</h3>
              <p className="text-sm text-gray-600">
                Help clients resolve their issues and achieve success.
              </p>
              <button className="btn btn-primary btn-sm mt-4">View Job</button>
            </div>
          </div>
        )}

        {activeTab === "Sales" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Sales Jobs</h2>
            <p>Drive growth and generate revenue by connecting with clients.</p>
            <div className="border rounded-lg p-4 bg-base-100">
              <h3 className="text-lg font-bold">Sales Representative</h3>
              <p className="text-sm text-gray-600">
                Join our sales team and help expand our market reach.
              </p>
              <button className="btn btn-primary btn-sm mt-4">View Job</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabJob;
