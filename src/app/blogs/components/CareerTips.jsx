"use client";

import { PenTool, Briefcase, Search, FileText } from "lucide-react";

const tips = [
  {
    icon: <FileText className="text-teal-600 w-8 h-8" />,
    title: "Create an Impressive Resume",
    desc: "Learn how to write resumes that grab recruiters’ attention.",
  },
  {
    icon: <Search className="text-teal-600 w-8 h-8" />,
    title: "Top Job Portals in 2025",
    desc: "Discover the best platforms for job hunting this year.",
  },
  {
    icon: <PenTool className="text-teal-600 w-8 h-8" />,
    title: "Write a Powerful Cover Letter",
    desc: "Craft cover letters that boost your job applications.",
  },
  {
    icon: <Briefcase className="text-teal-600 w-8 h-8" />,
    title: "Job Hunting Strategies",
    desc: "Master effective methods to speed up your job search.",
  },
];

export default function CareerTips() {
  return (
    <section
      className="py-6 md:py-10 lg:py-14
     bg-white"
    >
      <div className="px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-teal-600 mb-4">
          Career Tips & Job Search
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Level up your job search with expert advice and practical strategies
          tailored for 2025 and beyond.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto flex items-center justify-center bg-teal-100 rounded-full mb-4">
                {tip.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {tip.title}
              </h3>
              <p className="text-sm text-gray-600">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
