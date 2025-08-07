"use client";

import React from "react";
import CommonButton from "../components/LandingPageComponents/CommonButton";
import { FaChevronLeft } from "react-icons/fa6";
import Link from "next/link";

const AddResume = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [check, setCheck] = React.useState(false);
  const handleCheckbox = (e) => {
    if (e.target.checked) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };
  const [currentlyWorking, setCurrentlyWorking] = React.useState(false);
  return (
    <div className="flex justify-center items-center min-h-screen w-11/12">
      <div className="bg-white p-4 md:p-6 lg:p-8 rounded-2xl shadow-[0px_0px_25px_0px_rgb(0,0,0,0.2)] w-full max-w-5xl mx-auto space-y-4 my-6">
        <h2 className="text-xl lg:text-2xl text-gray-900">Work Experience</h2>
        <p className="text-sm lg:text-base text-green-950 mb-4">
          Add a recent work experience to get the best job matches for you.
        </p>

        <div className="grid grid-cols-2 gap-4 lg:gap-6">
          <input
            type="text"
            placeholder="Job Title"
            className=" w-full py-2 lg:py-3 px-4 rounded-xl focus:outline-none hover:shadow-[0px_0px_5px_0px_rgb(0,0,0,0.2)] focus:border-green-950 border border-transparent bg-gray-100"
          />
          <input
            type="text"
            placeholder="Company"
            className=" w-full py-2 lg:py-3 px-4 rounded-xl focus:outline-none hover:shadow-[0px_0px_5px_0px_rgb(0,0,0,0.2)] focus:border-green-950 border border-transparent bg-gray-100"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-4 lg:mt-6">
          <select className=" bg-gray-100 py-2 lg:py-3 px-4 rounded-xl focus:outline-none hover:shadow-[0px_0px_5px_0px_rgb(0,0,0,0.2)] focus:border-green-950 border border-transparent">
            <option className="text-gray-500">End Month</option>
            {months.map((month) => (
              <option className="text-gray-500">{month}</option>
            ))}
          </select>
          <select className=" bg-gray-100 py-2 lg:py-3 px-4 rounded-xl focus:outline-none hover:shadow-[0px_0px_5px_0px_rgb(0,0,0,0.2)] focus:border-green-950 border border-transparent">
            <option className="text-gray-500">Start Year</option>
            <option className="text-gray-500">2024</option>
            <option className="text-gray-500">2023</option>
            <option className="text-gray-500">2022</option>
          </select>
          <label className="flex flex-row gap-2 items-center">
            <input type="checkbox" onChange={handleCheckbox} />I currently work
            here
          </label>
        </div>
        {/* end date */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-4 lg:mt-6 ${
            check ? "hidden" : "block"
          }`}
        >
          <select className=" bg-gray-100 py-2 lg:py-3 px-4 rounded-xl focus:outline-none hover:shadow-[0px_0px_5px_0px_rgb(0,0,0,0.2)] focus:border-green-950 border border-transparent">
            <option className="text-gray-500">End Month</option>
            <option className="text-gray-500">January</option>
            <option className="text-gray-500">February</option>
            <option className="text-gray-500">March</option>
            <option className="text-gray-500">April</option>
            <option className="text-gray-500">May</option>
            <option className="text-gray-500">June</option>
            <option className="text-gray-500">July</option>
            <option className="text-gray-500">August</option>
            <option className="text-gray-500">September</option>
            <option className="text-gray-500">October</option>
            <option className="text-gray-500">November</option>
            <option className="text-gray-500">December</option>
          </select>
          <select className=" bg-gray-100 py-2 lg:py-3 px-4 rounded-xl focus:outline-none hover:shadow-[0px_0px_5px_0px_rgb(0,0,0,0.2)] focus:border-green-950 border border-transparent">
            <option className="text-gray-500">End Year</option>
            <option className="text-gray-500">2024</option>
            <option className="text-gray-500">2023</option>
            <option className="text-gray-500">2021</option>
            <option className="text-gray-500">2020</option>
            <option className="text-gray-500">2019</option>
            <option className="text-gray-500">2018</option>
            <option className="text-gray-500">2017</option>
            <option className="text-gray-500">2016</option>
            <option className="text-gray-500">2015</option>
          </select>
        </div>

        <textarea
          placeholder="Description"
          rows={5}
          className="py-2 lg:py-3 px-4 rounded-xl focus:outline-none hover:shadow-[0px_0px_5px_0px_rgb(0,0,0,0.2)] focus:border-green-950 border border-transparent w-full bg-gray-100 mt-4 lg:mt-6"
        ></textarea>
        <div className="flex justify-end gap-6 items-center">
          <Link href={"/signup"}>
            <FaChevronLeft />
          </Link>
          <CommonButton value={"Next"} />
        </div>
      </div>
    </div>
  );
};

export default AddResume;
