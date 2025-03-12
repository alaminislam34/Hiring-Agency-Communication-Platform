import React from "react";

const Banner = () => {
  return (
    <div className="">
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://i.ibb.co.com/dwNS7Mt5/bussiness-people-working-team-office-1303-22863.jpg)",
        }}>
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-start">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-semibold">
              Everything's Possible When You Have The Talent.
            </h1>
            <p className="mb-5">
              Find skilled candidates, in-demand jobs and the solutions you need
              to help you do best work yet.
            </p>
            {/* buttons for jobs related */}
            <div className="flex justify-between py-8">
              <div>
                <button className="btn rounded-full">Find Your Next Job</button>
              </div>
              <div className="border-1 h-16  text-center border-white"></div>
              <button className="btn rounded-full bg-[#084049]/50 hover:bg-transparent border cursor-pointer hover:text-[#02282E] text-white">
                Preview Candidates
              </button>
              <button className="btn rounded-full bg-[#084049]/50 hover:bg-transparent border cursor-pointer hover:text-[#02282E] text-white">
                Hire Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto relative bottom-20 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center gap-4">
          {/* Job Title Input */}
          <input
            type="text"
            placeholder="Job Title, Skills, or Keywords"
            className="flex-1 p-4 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
          {/* Location Input */}
          <input
            type="text"
            placeholder="City, Province, or Postal Code"
            className="flex-1 p-4 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
          {/* Search Button */}
          <button className="btn bg-[#E52020] text-white px-8 py-3 rounded-lg">
            Search Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
