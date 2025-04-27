"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const letters = "JobHive".split("");

const WebsiteLandingPage = () => {
  const [hideLoader, setHideLoader] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHideLoader(true);
    }, 4000); // 3 seconds
    return () => clearTimeout(timer);
  }, []);

  if (hideLoader) return null;

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-white flex items-center justify-center z-[1000]">
      <div className="flex items-center space-x-4">
        {/* Image */}
        <motion.img
          src="/jobHive2.jpg"
          alt="Logo"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-16 h-16 md:w-24 md:h-24 object-contain"
        />

        {/* Text */}
        <div className="flex space-x-1">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: index * 0.3,
                type: "spring",
                stiffness: 100,
              }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-teal-500"
              style={{
                textShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebsiteLandingPage;
