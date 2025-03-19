"use client";

import React, { useState } from "react";
import SideBar from "./components/sideBar";
import Content from "./components/content";
import DashboardNavbar from "@/components/DashboardNavbar";

const EmployerDashboard = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-row">
      <div className={`${show ? "block" : "hidden"}`}>
        <SideBar setShow={setShow} />
      </div>
      <div className={`min-h-screen ${show ? "ml-44" : ""} border w-full`}>
        <DashboardNavbar setShow={setShow} />
        <Content />
      </div>
    </div>
  );
};

export default EmployerDashboard;
