import Link from "next/link";
import React from "react";

const SideBar = ({ setShow }) => {
  return (
    <div className="fixed h-screen w-44 bg-accent border p-4 space-y-4 lg:space-y-6">
      <button onClick={() => setShow(false)}>close</button>
      <Link href="/" className="text-xl font-bold flex items-center">
        <img src="logo.png" alt="Logo" className="h-6 mr-2" /> JobHive
      </Link>
      <div className="flex items-center gap-4 flex-col">
        <img
          src="#"
          alt=""
          className="w-20 h-20 rounded-full bg-red-500 border-2"
        />
        <h3>John Doe</h3>
      </div>
      <ul>
        <li>
          <Link href={"#"}>Dashboard</Link>
        </li>
        <li>
          <Link href={"#"}>Jobs</Link>
        </li>
        <li>
          <Link href={"#"}>Candidates</Link>
        </li>
        <li>
          <Link href={"#"}>Settings</Link>
        </li>
        <li>
          <Link href={"#"}>Help</Link>
        </li>
        <li>
          <Link href={"#"}>Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
