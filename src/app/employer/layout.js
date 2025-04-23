"use client";

import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import DashboardSideBar from "../components/dashboardComponents/DashboardSideBar";

const EmployerLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-row">
      <section
        className={`hidden lg:block duration-500 ${
          isOpen ? "w-[250px]" : " w-[100px]"
        } h-screen bg-teal-200 relative shadow-xl`}
      >
        <DashboardSideBar isOpen={isOpen} />

        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-0 -right-8 border-y border-r border-gray-400 shadow flex items-center justify-center bg-white h-12 w-8"
        >
          {isOpen ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </section>
      <section
        className={`flex-1 duration-500 transition-transform ease-in-out ${
          isOpen ? "lg:col-span-10" : "lg:col-span-11"
        } h-screen overflow-y-auto p-4`}
      >
        {children}
      </section>
    </div>
  );
};
export default EmployerLayout;
