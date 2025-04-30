"use client";
import { useAppContext } from "@/Providers/AppProviders";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaUserTie, FaBriefcase } from "react-icons/fa6";

const images = ["/team1.png", "/team2.png", "/team3.png"]; // image list

const Banner = () => {
  const router = useRouter();
  const { currentUser } = useAppContext();
  const [currentImage, setCurrentImage] = useState(0);

  // Image slider logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 7000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (currentUser?.role === "employer") {
      router.push("/employer/candidates");
    } else {
      router.push(`/signin`);
    }
  };

  return (
    <div className="mb-0">
      <div
        className="hero min-h-[90vh] bg-cover bg-center relative transition-all duration-1000"
        style={{ backgroundImage: `url('${images[currentImage]}')` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex items-center justify-center text-left px-4 w-full h-full">
          <div>
            <h1
              style={{
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
              className="text-3xl md:text-5xl font-extrabold text-white leading-tight max-w-3xl"
            >
              Unlock Opportunities. Connect With Top Talent or Your Dream Job.
            </h1>
            <p className="mt-4 text-gray-200 text-lg max-w-xl">
              Discover skilled professionals or land the perfect role for your
              future. Search. Connect. Hire or Get Hired — effortlessly.
            </p>

            <div className="mt-10 flex flex-col md:flex-row items-center gap-4">
              <Link
                href="/jobs"
                className="flex items-center gap-2 bg-white text-teal-600 font-semibold px-6 py-3 rounded-full shadow hover:bg-teal-100 transition duration-300"
              >
                <FaBriefcase />
                Find Your Next Job
              </Link>

              <button
                onClick={handleClick}
                className="flex items-center gap-2 border border-white text-white hover:bg-teal-600 hover:text-white font-semibold px-6 py-3 rounded-full transition duration-300 cursor-pointer"
              >
                <FaUserTie />
                Hire Top Talent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
