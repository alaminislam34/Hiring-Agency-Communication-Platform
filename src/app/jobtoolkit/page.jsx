"use client";

import Link from "next/link";
import React, { useState } from "react";

const sections = [
  {
    title: "Your Job Seeker Checklist",
    image: "/job-seeker.png",
    points: [
      {
        key: "Resume Writing Guide",
        value:
          "Choosing the right format, optimizing for ATS, using action verbs.",
      },
      {
        key: "Cover Letter Writing Guide",
        value: "Structuring, personalizing, and common mistakes to avoid.",
      },
      {
        key: "Common Resume Mistakes",
        value:
          "Spelling errors, overloading information, and using generic templates.",
      },
    ],
    bg: "#3d929b",
    hbg: "#00778B",
  },
  {
    title: "Identify the Kind of Job You Really Want",
    image: "/job-type.png",
    points: [
      {
        key: "Finding Jobs",
        value: "Using job boards, networking, and company career pages.",
      },
      {
        key: "Networking Tips",
        value: "LinkedIn optimization, career fairs, referrals.",
      },
      {
        key: "Best Job Platforms",
        value: "General, industry-specific, and freelance job boards.",
      },
    ],
    bg: "#7eb3e0",
    hbg: "#6CACE4",
  },
  {
    title: "Identify Your Superpowers",
    image: "/superpowers.png",
    points: [
      {
        key: "Skill-Building Resources",
        value: "Free & paid courses on Coursera, Udemy, etc.",
      },
      {
        key: "Certifications",
        value: "Best certifications per industry and showcasing them.",
      },
      {
        key: "Career Growth",
        value: "SMART goals, mentorship, leadership roles.",
      },
    ],
    bg: "#b1598e",
    hbg: "#991E66",
  },
  {
    title: "Audit Your Public Brand",
    image: "/public-brand.png",
    points: [
      {
        key: "LinkedIn Profile Optimization",
        value: "Headline, summary, skills, and engagement.",
      },
      {
        key: "Professional Etiquette",
        value: "Email & business communication, teamwork, criticism handling.",
      },
      {
        key: "Work-Life Balance",
        value: "Flexible work schedules, mental wellness trends.",
      },
    ],
    bg: "#383f6f",
    hbg: "#151F6D",
  },
  {
    title: "Map out your Competencies",
    image: "/competencies.png",
    points: [
      {
        key: "Skills Inventory",
        value:
          "List all your skills, both hard and soft, and evaluate your proficiency.",
      },
      {
        key: "Strengths & Weaknesses",
        value: "Assess your strengths and areas for improvement to focus on.",
      },
      {
        key: "Experience Mapping",
        value:
          "Map out your past work experience and how it aligns with your future goals.",
      },
    ],
    bg: "#3d929b",
    hbg: "#00778B",
  },
  {
    title: "Develop Your Resume",
    image: "/resume.png",
    points: [
      {
        key: "Format Selection",
        value: "Choose between chronological, functional, or hybrid formats.",
      },
      {
        key: "Highlight Achievements",
        value:
          "Focus on achievements and quantifiable results rather than just duties.",
      },
      {
        key: "Tailor for the Role",
        value:
          "Customize your resume for each job by including relevant keywords and skills.",
      },
    ],
    bg: "#b1598e",
    hbg: "#991E66",
  },
  {
    title: "Plan Your Cover Letter",
    image: "/cover-letter.png",
    points: [
      {
        key: "Opening Hook",
        value:
          "Start with a strong opening that grabs the employer's attention.",
      },
      {
        key: "Tailored Content",
        value:
          "Focus on how your skills and experience make you the right fit for the role.",
      },
      {
        key: "Strong Closing",
        value:
          "End with a compelling call to action or statement of enthusiasm for the position.",
      },
    ],
    bg: "#383f6f",
    hbg: "#151F6D",
  },
  {
    title: "Preparation for Your Interview",
    image: "/inter.png",
    points: [
      {
        key: "Research the Company",
        value:
          "Understand the company's values, mission, and recent developments.",
      },
      {
        key: "Mock Interviews",
        value:
          "Practice with mock interviews to boost your confidence and refine your answers.",
      },
      {
        key: "Prepare Questions",
        value:
          "Have thoughtful questions ready to ask the interviewer about the role or company.",
      },
    ],
    bg: "#3d929b",
    hbg: "#00778B",
  },
];

const JobToolkit = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto">
        <div>
          <Link href={"/"}>Back Home</Link>
        </div>
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Job Toolkit
        </h1>
        {sections.map((section, index) => (
          <div
            key={index}
            className="relative group overflow-hidden mb-6 rounded-2xl cursor-pointer"
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            onClick={() => handleToggle(index)}
          >
            <div
              className={`h-96 bg-cover bg-center flex items-center justify-center text-white font-bold text-2xl transition-all duration-300`}
              style={{
                backgroundColor: section.bg,
                backgroundImage: `url(${section.image})`,
                filter:
                  activeIndex === index
                    ? "blur(3px) brightness(0.6)"
                    : "brightness(0.7)",
              }}
            >
              {section.title}
            </div>
            {typeof window !== "undefined" &&
              (activeIndex === index || window.innerWidth < 768) && (
                <div
                  className="absolute inset-0 flex items-center justify-center p-4 text-white text-center transition-all duration-300"
                  style={{
                    backgroundColor:
                      activeIndex === index ? section.hbg : "transparent",
                    opacity: activeIndex === index ? 0.9 : 0,
                  }}
                >
                  <ol className="text-xl sm space-y-4 list-decimal pl-5">
                    {section.points.map((point, i) => (
                      <li key={i} className="flex items-baseline">
                        <strong className="mr-2">{point.key}:</strong>
                        <span>{point.value}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobToolkit;
