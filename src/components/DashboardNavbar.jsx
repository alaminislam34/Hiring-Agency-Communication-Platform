import React from "react";
import { FaChildReaching, FaRightLeft } from "react-icons/fa6";

const DashboardNavbar = () => {
  return (
    <div className="flex justify-between px-4 py-2 items-center border w-full">
      <div>
        <button>
          <FaChildReaching />
        </button>
      </div>
      <ul className="flex items-center gap-2">
        <li>
          <p className="text-gray-500 text-sm">John Doe</p>
        </li>
        <li>
          <img
            src="#"
            alt="user"
            className="w-12 h-12 rounded-full border bg-[#084049]"
          />
        </li>
      </ul>
    </div>
  );
};

export default DashboardNavbar;
