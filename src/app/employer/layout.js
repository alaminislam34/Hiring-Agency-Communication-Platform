"use client";

import { useState } from "react";
import DashboardSideBar from "../components/dashboardComponents/DashboardSideBar";
import DashboardNavbar from "@/components/DashboardNavbar";
import Footer from "@/components/DashboardFooter";

const AdminLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-row">
      <section
        className={`duration-500 overflow-y-auto bg-teal-200 ${
          isOpen ? "w-[250px] left-0" : "lg:w-[80px] lg:left-0 -left-24"
        } h-screen fixed z-50 top-0`}
      >
        <DashboardSideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      </section>
      <section
        className={`flex-1 duration-500 rounded-tl-4xl ${
          isOpen ? "lg:ml-[250px]" : "lg:ml-[80px]"
        } min-h-screen relative`}
      >
        <nav className="sticky top-0 z-40 w-full bg-white">
          <DashboardNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
        </nav>
        {/* <MobileDrawer /> */}
        <section className="overflow-hidden px-4 lg:px-8 grid grid-cols-1 min-h-[80vh] h-full">
          {children}
        </section>
        <Footer />
      </section>
    </div>
  );
};
export default AdminLayout;
