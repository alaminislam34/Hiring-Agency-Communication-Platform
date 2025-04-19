"use client";

import { Card } from "flowbite-react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const features = {
  basic: [
    "Job listing for 7 days",
    "Email support",
    "Access to 10 resumes",
    "Basic company profile setup",
    "Job performance tracking",
    "Standard visibility in search results",
    "Single job posting at a time",
  ],
  pro: [
    "Priority job listing for 30 days",
    "24/7 email & chat support",
    "Unlimited resume access",
    "Candidate tracking dashboard",
    "Company branding on listings",
    "5 active job posts at once",
    "Access to talent insights",
    "Job listing analytics",
    "Application filtering tools",
  ],
  enterprise: [
    "Featured listings on homepage",
    "Dedicated account manager",
    "Custom recruitment campaigns",
    "Full access to talent database",
    "Advanced analytics & reports",
    "Branded company career page",
    "Bulk job posting support",
    "Custom job distribution strategy",
    "Integration with ATS/HR systems",
    "Unlimited team collaboration",
    "AI-powered candidate recommendations",
    "Quarterly hiring performance reviews",
  ],
};

export default function PricingPlans() {
  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#084049]">
          Consulting Pricing Packages
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          Choose a plan that fits your hiring needs. Get access to the best
          talent with JobHive.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Basic Package */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Card className="rounded-2xl shadow-md border-teal-100 hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-semibold text-[#084049] mb-2">
              Basic
            </h3>
            <p className="text-4xl font-bold text-[#084049]">$49</p>
            <p className="text-gray-500 mb-4">
              Ideal for small teams & startups
            </p>
            <ul className="space-y-2 text-gray-700 text-left">
              {features.basic.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
            <button className="mt-6 bg-[#084049] hover:bg-[#02282E] text-white px-6 py-2 rounded-full transition-all duration-300">
              Get Started
            </button>
          </Card>
        </motion.div>

        {/* Pro Package */}
        <motion.div whileHover={{ scale: 1.07 }}>
          <Card className="rounded-2xl border-2 border-[#084049] shadow-xl transition-all duration-300 bg-white">
            <span className="bg-[#084049] text-white text-sm py-1 px-3 rounded-full absolute top-4 right-4">
              Popular
            </span>
            <h3 className="text-2xl font-semibold text-[#084049] mb-2">Pro</h3>
            <p className="text-4xl font-bold text-[#084049]">$99</p>
            <p className="text-gray-500 mb-4">Perfect for growing businesses</p>
            <ul className="space-y-2 text-gray-700 text-left">
              {features.pro.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
            <button className="mt-6 bg-[#084049] hover:bg-[#02282E] text-white px-6 py-2 rounded-full transition-all duration-300">
              Upgrade Now
            </button>
          </Card>
        </motion.div>

        {/* Enterprise Package */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Card className="rounded-2xl shadow-md border-teal-100 hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-semibold text-[#084049] mb-2">
              Enterprise
            </h3>
            <p className="text-4xl font-bold text-[#084049]">$199</p>
            <p className="text-gray-500 mb-4">For large-scale hiring needs</p>
            <ul className="space-y-2 text-gray-700 text-left">
              {features.enterprise.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
            <button className="mt-6 bg-[#084049] hover:bg-[#02282E] text-white px-6 py-2 rounded-full transition-all duration-300">
              Contact Sales
            </button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
