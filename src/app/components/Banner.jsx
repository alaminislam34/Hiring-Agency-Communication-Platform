import React from "react";
import { FaLocationArrow, FaSearchengin } from "react-icons/fa6";

const Banner = () => {
  return (
    <div className="mb-0">
      <div
        className="hero min-h-[600px] bg-cover object-cover "
        style={{
          backgroundImage:
            "url(https://i.ibb.co.com/dwNS7Mt5/bussiness-people-working-team-office-1303-22863.jpg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="">
          <div className=" w-11/12 pl-4">
            <h1 className="mb-5 text-2xl md:text-3xl lg:text-5xl font-medium text-center text-white w-3/4  mx-auto leading-[1.8]
">
              Everything's Possible When You Have The Talent.
            </h1>
            <p className="mb-5 text-gray-300 text-center">
              Find skilled candidates, in-demand jobs and the solutions you need
              to help you do best work yet.
            </p>
            {/* buttons for jobs related */}
            <div className="flex flex-col items-center justify-center md:flex-row gap-4 md:gap-6 py-8 w-full">
              <button className="rounded-full flex justify-center items-center border cursor-pointer lg:text-xl py-2 md:py-3 px-4 lg:px-6 bg-white text-black hover:text-green-950 relative overflow-hidden z-[1] group">
                Find Your Next Job
                <div className="w-full h-full bg-white absolute top-0 left-0 z-[-1] group-hover:bg-[#084049]/10 "></div>
              </button>

              <div className="border-1 h-16 lg:block hidden border-white"></div>
              <div className="flex flex-row gap-4 md:gap-6">
                <button className="rounded-full flex justify-center items-center bg-[#084049]/50 hover:bg-transparent border cursor-pointer  text-white lg:text-xl py-2 md:py-3 px-4 lg:px-6">
                  Preview Candidates
                </button>
                <button className="rounded-full flex justify-center items-center bg-[#084049]/50 hover:bg-transparent border cursor-pointer  text-white lg:text-xl py-2 md:py-3 px-4 lg:px-6">
                  Hire Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-11/12 mx-auto relative bottom-20 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center gap-4">
          {/* Job Title Input with Icon */}
          <div className="flex-1 relative">
            <FaSearchengin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
            <input
              type="text"
              placeholder="Job Title, Skills, or Keywords"
              className="w-full pl-10 p-4 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          {/* Location Input with Icon */}
          <div className="flex-1 relative">
            <FaLocationArrow className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
            <input
              type="text"
              placeholder="City, Province, or Postal Code"
              className="w-full pl-10 p-4 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          {/* Search Button */}
          
          <button className="bg-[#084049] text-white py-4 px-6 rounded-md hover:bg-red-600 cursor-pointer w-full sm:w-auto">
            Search Jobs
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default Banner;
