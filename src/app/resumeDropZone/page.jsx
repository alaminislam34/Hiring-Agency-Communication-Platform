"use client";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const ResumeDropZone = () => {
  const [resumeFile, setResumeFile] = React.useState(null);
  const handleResume = (e) => {
    const file = e.target.files[0];
    setResumeFile(file);
    console.log(file);
  };
  return (
    <div className="flex justify-center flex-col gap-6 items-center min-h-[550px] w-11/12 mx-auto">
      <div className="p-4 md:p-8 py-6 lg:py-12 rounded-xl border-gray-300 shadow-[0px_0px_25px_0px_rgb(0,0,0,0.5)] space-y-8 lg:space-y-12 max-w-5xl w-full">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-center">
          Upload your resume to be considered for jobs that match
        </h1>
        <div className="flex flex-col justify-evenly md:flex-row items-center md:items-stretch gap-4 md:gap-6">
          <div>
            {resumeFile && <p>{resumeFile.name}</p>}
            <label
              htmlFor="resume"
              className="cursor-pointer bg-[#0b5f6b] hover:bg-[#084049] text-white text-lg lg:text-xl py-2 md:py-3 lg:py-4 px-4 md:px-8 rounded-full duration-300 inline-block"
            >
              Upload Resume
            </label>
            <input
              type="file"
              id="resume"
              name="resume"
              onChange={handleResume}
              className="hidden"
            />
          </div>

          <p className="text-center flex items-center">OR</p>
          <div className="space-y-4">
            <p className="text-gray-400">Don’t have a resume file ready?</p>
            <button className="text-[#084049] relative cursor-pointer flex items-center gap-2 hover:text-[#0b5f6b] group text-lg md:text-xl">
              <Link href={"/addResume"}>Continue with resume</Link>
              <FaArrowRight className="absolute -right-6 top-1/2 -translate-y-1/2 group-hover:-right-10 duration-500" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <Link
          href={"#"}
          className="text-[#084049] hover:text-[#0b5f6b] underline underline-offset-4 text-base md:text-lg"
        >
          Privacy Policy
        </Link>
        <p className="h-10 border border-gray-500"></p>
        <Link
          href={"#"}
          className="text-[#084049] hover:text-[#0b5f6b] underline underline-offset-4 text-base md:text-lg"
        >
          Terms of Use
        </Link>
      </div>
    </div>
  );
};

export default ResumeDropZone;
