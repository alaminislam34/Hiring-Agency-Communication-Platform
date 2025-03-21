"use client";

import SideBar from "./components/sideBar";
import { useAppContext } from "../../Providers/AppProviders";
import DashboardNavbar from "@/components/DashboardNavbar";

export default function DashboardLayout({ children }) {
  const { showName } = useAppContext();
  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Sidebar for Dashboard */}
      <div
        className={`hidden lg:block fixed h-screen bg-gray-900 p-4 shadow-lg duration-500  ${
          showName ? " text-white w-64" : "w-20"
        }`}
      >
        <SideBar />
      </div>
      {/* Main Dashboard Content */}
      <main
        className={`w-full duration-500 ${showName ? "lg:ml-64" : "lg:ml-20"}`}
      >
        <div className="sticky top-0 left-0 z-50">
          <DashboardNavbar />
        </div>
        {children}
      </main>
    </div>
  );
}
