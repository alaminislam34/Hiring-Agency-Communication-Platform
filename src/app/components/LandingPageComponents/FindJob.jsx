"use client";
import Image from "next/image";
import image from "../../../../public/image.webp";
import { FaLocationDot, FaSearchengin } from "react-icons/fa6";
import { useAppContext } from "@/Providers/AppProviders";
import { useEffect, useState } from "react";
export default function FindJob() {
  const { setJobTitle, setLocation } = useAppContext();
  const [title, setTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  useEffect(() => {
    setJobTitle(title);
    setLocation(jobLocation);
  }, [title, jobLocation]);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-12">
      {/* text  */}
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-950 py-6">
          Find top candidates to get the job done
        </h2>
        <p className="text-base text-gray-400 font-sm">
          Tell us about your open role, and instantly see highly skilled
          candidates with the in-demand skills and experience you're looking
          for.
        </p>
        {/* input field */}
        <form className="flex flex-col gap-2 mt-12">
          <div className="">
            <h5 className="text-black font-base text-lg">
              I am looking For a{" "}
            </h5>
            <label className=" px-4 border border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-teal-500 rounded-lg mt-4 flex items-center">
              <FaSearchengin></FaSearchengin>
              <input
                type="search"
                required
                placeholder="User Role"
                className="w-full h-full py-2 px-4 border-none focus:outline-none"
              />
            </label>
          </div>
          <div>
            <h5 className="text-black font-base text-lg">Located in</h5>
            <label className=" px-4 border border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-teal-500 rounded-lg mt-4 flex items-center">
              <FaLocationDot></FaLocationDot>
              <input
                type="search"
                required
                placeholder="Skills "
                className="w-full h-full py-2 px-4 border-none focus:outline-none"
              />
            </label>
          </div>
          <button className="px-4 mt-3 py-2 rounded-lg bg-teal-500 w-full hover:bg-teal-600 border cursor-pointer text-white">
            Preview Candidates
          </button>
        </form>
      </div>
    </div>
  );
}
