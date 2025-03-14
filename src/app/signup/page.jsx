"use client";
import { useState } from "react";

const SignUP = () => {
  const [employer, setEmployer] = useState(false);
  return (
    <div className="flex justify-center items-center min-h-[550px] ">
      <div className="shadow-2xl max-w-xl w-full rounded-xl">
        <div className="pb-4 border border-gray-300 rounded-xl space-y-4 md:space-y-6 w-full min-h-[300px] ">
          <div className="grid grid-cols-2">
            <button
              className={`${
                !employer
                  ? "border-t shadow-[-5px_-4px_15px_0px_rgb(0,0,0,0.1)] bg-white border-r underline underline-offset-8 rounded-tl-xl"
                  : "border-b"
              } py-2 px-4 md:px-6 border-gray-300 cursor-pointer text-lg lg:text-xl`}
              onClick={() => setEmployer(false)}
            >
              I'm a job seeker
            </button>
            <button
              className={`${
                employer
                  ? "border-t shadow-[5px_-4px_15px_0px_rgb(0,0,0,0.1)] bg-white border-l underline underline-offset-8 rounded-tr-xl"
                  : "border-b"
              } py-2 px-4 md:px-6 border-gray-300 cursor-pointer text-lg lg:text-xl`}
              onClick={() => setEmployer(true)}
            >
              I'm an employer
            </button>
          </div>
          <div>
            <form className="flex flex-col gap-6 lg:gap-8 items-center p-4">
              <input
                className="w-full lg:w-4/5 py-2 px-4 md:py-3 rounded-xl focus:outline-green-900 focus:ring-green-700 bg-gray-100"
                type="email"
                name="email"
                placeholder="Email"
              />
              <button className="py-2 md:py-3 rounded-full w-2/3 text-white bg-[#084049] hover:bg-[#02282E] duration-300 cursor-pointer">
                {" "}
                {employer
                  ? "Continue to employer"
                  : "Continue to job seeker"}{" "}
              </button>
            </form>
          </div>
          <p className="text-center">
            {employer
              ? "Find skilled professionals using industry-leading AI"
              : "Discover new and exclusive opportunities posted every day"}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUP;
