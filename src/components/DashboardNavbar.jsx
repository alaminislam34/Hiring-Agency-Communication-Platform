import React from "react";
import { FaRightLeft } from "react-icons/fa6";

const DashboardNavbar = ({ setShow }) => {
  return (
    <div className="flex justify-between px-4 py-2 items-center border w-full">
      <div>
        <button onClick={() => setShow(true)}>
          <FaRightLeft />
        </button>
      </div>
      <ul className="flex items-center gap-2">
        <li>
          <p>John Doe</p>
        </li>
        <li>
          <img src="user.png" alt="user" className="w-12 h-12 rounded-full" />
        </li>
      </ul>
    </div>
  );
};

export default DashboardNavbar;
