"use client";

import SideBar from "./components/sideBar";
import { useAppContext } from "../../Providers/AppProviders";
import DashboardNavbar from "@/components/DashboardNavbar";
import DashboardFooter from "./components/DashboardFooter";

export default function DashboardLayout({ children }) {
  const { showName } = useAppContext();
  return (
    <div className="flex min-h-screen">
      {/* Sidebar for Dashboard */}
      <div
        className={`hidden lg:block fixed h-screen shadow-2xl bg-gradient-to-br from-teal-100 via-teal-100 to-teal-50 p-4 duration-500  ${
          showName ? "w-64" : "w-20"
        }`}
      >
        <SideBar />
      </div>
      {/* Main Dashboard Content */}
      <main
        className={`w-full duration-500 bg-gradient-to-tr from-[#ffffff] to-[#eaffff] ${
          showName ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        <div className="sticky top-0 left-0 z-40">
          <DashboardNavbar />
        </div>
        <section className="min-h-[520px] p-4">{children}</section>
        <footer>
          <DashboardFooter />
        </footer>
      </main>
    </div>
  );
}
