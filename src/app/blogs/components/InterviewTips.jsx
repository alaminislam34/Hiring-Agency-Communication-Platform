"use client";

import { Lightbulb } from "lucide-react";
import { ClipboardList } from "lucide-react";
import { Mic } from "lucide-react";
import { UserCheck } from "lucide-react";

const tips = [
  {
    icon: <UserCheck className="w-7 h-7 text-white" />,
    title: "Understand the Job Role",
    desc: "Research the position thoroughly so you know what the employer expects.",
  },
  {
    icon: <Mic className="w-7 h-7 text-white" />,
    title: "Practice Common Questions",
    desc: "Rehearse answers to typical interview questions to build confidence.",
  },
  {
    icon: <Lightbulb className="w-7 h-7 text-white" />,
    title: "Showcase Your Skills",
    desc: "Prepare examples that highlight your relevant strengths and achievements.",
  },
  {
    icon: <ClipboardList className="w-7 h-7 text-white" />,
    title: "Follow Up Smartly",
    desc: "Send a thank-you email and ask about the next steps after your interview.",
  },
];

export default function InterviewPrep() {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-teal-50 to-white">
      <div className="px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-teal-600 mb-4">
          Interview Preparation
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Get ready for your next interview with confidence. Here’s a list of
          essential tips to help you impress and land the job.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {tips.map((tip, i) => (
            <div
              key={i}
              className="group bg-white border border-teal-100 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-teal-600 mb-4 mx-auto group-hover:scale-110 transition-transform">
                {tip.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {tip.title}
              </h3>
              <p className="text-gray-600 text-sm">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
