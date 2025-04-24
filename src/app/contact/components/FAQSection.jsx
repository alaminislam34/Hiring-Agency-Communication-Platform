"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import faq from "../../../../public/faq.json";
import Lottie from "react-lottie";

const faqs = [
  {
    question: "How can I create an employer account?",
    answer:
      "To create an employer account, click on the 'Sign Up' button, select 'Employer', and fill out the required information.",
  },
  {
    question: "How do I post a job?",
    answer:
      "After logging in as an employer, go to your dashboard and click on 'Post a Job'. Fill in the job details and submit it for review.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach us through the Contact Us page or email us directly at support@yourwebsite.com.",
  },
  {
    question: "What are the service charges?",
    answer:
      "We charge a small service fee on successful transactions. You can find detailed pricing information on our Pricing page.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-teal-700 mb-8">
        Frequently Asked Questions
      </h2>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="-rotate-y-180 pointer-events-none">
          <Lottie
            options={{ animationData: faq, loop: true, autoplay: true }}
          ></Lottie>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-teal-50 border border-teal-200 rounded-xl shadow-sm duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left text-teal-800 font-medium focus:outline-none"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 duration-300 ${
                    openIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600 duration-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default FAQSection;
