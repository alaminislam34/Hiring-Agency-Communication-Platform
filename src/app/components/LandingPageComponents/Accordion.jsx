"use client";
import Lottie from "react-lottie";
import SectionTitle from "../SharedComponents/SectionTitle";
import faq from "../../../../public/faq.json";
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

  return (
    <div className="">
      <SectionTitle title={"Frequently Asked Questions"} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="-rotate-y-180 pointer-events-none">
          <Lottie
            options={{ animationData: faq, loop: true, autoplay: true }}
          ></Lottie>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-plus border duration-500 border-gray-300 rounded-lg"
            >
              <input type="checkbox" className="" />
              <div className="collapse-title text-gray-700 bg-teal-100 text-lg font-medium">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p className="text-gray-700 pt-2 text-sm">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
