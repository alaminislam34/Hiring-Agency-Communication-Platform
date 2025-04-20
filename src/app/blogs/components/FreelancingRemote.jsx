"use client";
import { Globe, Laptop, Wallet, Clock4 } from "lucide-react";

const freelancingTips = [
  {
    icon: <Laptop className="w-7 h-7 text-white" />,
    title: "Start with a Strong Profile",
    desc: "Build a portfolio and showcase your skills clearly to attract clients.",
  },
  {
    icon: <Globe className="w-7 h-7 text-white" />,
    title: "Use Trusted Platforms",
    desc: "Join sites like Upwork, Fiverr, or Toptal to find legit remote work opportunities.",
  },
  {
    icon: <Wallet className="w-7 h-7 text-white" />,
    title: "Manage Your Payments",
    desc: "Use secure payment methods and set clear pricing before starting projects.",
  },
  {
    icon: <Clock4 className="w-7 h-7 text-white" />,
    title: "Stay Organized",
    desc: "Track deadlines and use time management tools to stay productive while working remotely.",
  },
];

export default function FreelancingRemote() {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-teal-50 to-white">
      <div className="px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-teal-600 mb-4">
          Freelancing & Remote Work
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Discover practical tips and tools to kickstart your freelancing career
          and thrive in the world of remote work.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {freelancingTips.map((item, index) => (
            <div
              key={index}
              className="group bg-white border border-teal-100 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-teal-600 mb-4 mx-auto group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
