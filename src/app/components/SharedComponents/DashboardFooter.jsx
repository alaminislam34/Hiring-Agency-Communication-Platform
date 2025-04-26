"use client";
const DashboardFooter = () => {
  return (
    <div className="flex justify-center items-center min-h-20 pb-2">
      <div className="px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p className="text-xs md:text-sm">
          Copyright © 2025. JobHive all right reserved
        </p>
        <div className="flex gap-2 md:gap-4 text-xs md:text-sm">
          <a href="#" className="hover:text-teal-500">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-teal-500">
            Terms & Conditions
          </a>
          <a href="#" className="hover:text-teal-500">
            Security
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardFooter;
