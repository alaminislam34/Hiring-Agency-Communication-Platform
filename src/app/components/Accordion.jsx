"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

export default function Accordion() {
  const faqs = [
    {
      question: "How do I apply for a job?",
      answer:
        "To apply, visit the job listing and click 'Apply Now.' Follow the steps to submit your resume and cover letter.",
    },
    {
      question: "Can I edit my application after submission?",
      answer:
        "No, once your application is submitted, you cannot edit it. However, you can withdraw and reapply if necessary.",
    },
    {
      question: "How will I know if my application is reviewed?",
      answer:
        "You will receive an email notification once your application is reviewed by the employer.",
    },
    {
      question: "What happens after an interview?",
      answer:
        "After your interview, you will be notified via email about the next steps, including any further assessments or offers.",
    },
    {
      question: "Is there a way to track my job applications?",
      answer:
        "Yes, you can track all your job applications from the 'My Applications' section in your dashboard. solve the git conflict.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="mx-auto p-6  w-11/12">
      <SectionTitle title={"Frequently Asked Questions"} />
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="collapse collapse-plus border border-gray-300 rounded-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
            variants={containerVariants}>
            <input type="checkbox" />
            <div className="collapse-title text-gray-700 text-lg font-medium">
              {faq.question}
            </div>
            <div className="collapse-content">
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
