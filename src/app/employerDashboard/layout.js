"use client";

import SideBar from "./components/sideBar";
import { useAppContext } from "../../Providers/AppProviders";
import DashboardNavbar from "@/components/DashboardNavbar";

export default function DashboardLayout({ children }) {
  const { showSidebar, setShowSidebar } = useAppContext();
  return (
    <div className="flex h-screen overflow-hidden overflow-y-auto">
      {/* Sidebar for Dashboard */}
      <div className="hidden lg:block">
        <SideBar />
      </div>
      {/* Main Dashboard Content */}
      <main className={`w-full ${showSidebar ? "lg:ml-64" : "lg:ml-64"}`}>
        <DashboardNavbar />
        {children}
      </main>
    </div>
  );
}
