"use client";

import { useAppContext } from "@/Providers/AppProviders";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaUserTie, FaBriefcase } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const images = ["/team2.png", "/team4.png", "/team3.png", "/team5.png"];

const Banner = () => {
  const router = useRouter();
  const { currentUser } = useAppContext();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (currentUser?.role === "employer") {
      router.push("/employer/addJob");
    } else {
      toast.warning("Employers only");
    }
  };

  return (
    <div className="relative h-[90vh] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url('${images[currentImage]}')` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center items-center text-center h-full px-4">
        <h1 className="text-3xl md:text-6xl font-extrabold text-white max-w-4xl leading-tight">
          Connecting Ambition <br className="hidden md:block" />
          <span className="text-teal-400">with Opportunity</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl">
          Whether you're a job seeker aiming for your dream role or an employer
          looking to hire top talent — we bring the right people together.
        </p>

        <div className="mt-10 flex flex-col md:flex-row gap-4">
          <Link
            href="/jobs"
            className="flex items-center gap-2 bg-white text-teal-600 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition duration-300"
          >
            <FaBriefcase />
            Explore Jobs
          </Link>

          <button
            onClick={handleClick}
            className="flex items-center cursor-pointer gap-2 border-2 border-white text-white hover:bg-white hover:text-teal-600 font-semibold px-6 py-3 rounded-full transition duration-300"
          >
            <FaUserTie />
            Post a Job
          </button>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={2000} limit={3} />
    </div>
  );
};

export default Banner;
