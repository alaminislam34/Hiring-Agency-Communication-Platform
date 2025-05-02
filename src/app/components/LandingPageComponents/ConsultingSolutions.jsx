"use client";
import Link from "next/link";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { useState } from "react";
import { CheckCircle2Icon } from "lucide-react";

export default function ConsultingSolutions() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Side Content */}
        <div className="flex flex-col justify-center pl-4 w-full 2xl:w-2/3">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 leading-snug">
            Consulting solutions to drive business impact
          </h2>
          <ul className="mt-4 space-y-4 ">
            <li className="flex items-start gap-3">
              <p>
                <CheckCircle2Icon className="text-teal-500" />
              </p>
              <p>
                <span>Develop a clear vision and strategy</span>
              </p>
            </li>
            <li className="flex items-start gap-3">
              <p>
                <CheckCircle2Icon className="text-teal-500" />
              </p>
              <p>
                {" "}
                <span>
                  Enhance business performance with critical technologies and
                  processes
                </span>
              </p>
            </li>
            <li className="flex items-start gap-3">
              <p>
                <CheckCircle2Icon className="text-teal-500" />
              </p>
              <p>
                <span>Implement a plan or manage operations</span>
              </p>
            </li>
          </ul>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <Link
              href="/consulting"
              className="bg-teal-500 text-white px-4 py-2 rounded-full text-sm md:text-base hover:bg-teal-600 transition cursor-pointer"
            >
              Find your consulting solution
            </Link>
            <button
              onClick={() => setOpenModal(true)}
              className="border border-gray-500 text-gray-900 px-4 py-2 rounded-full text-sm md:text-base hover:bg-gray-200 transition cursor-pointer"
            >
              Learn more
            </button>
          </div>

          {/* Modal Section */}
          <Modal
            dismissible
            show={openModal}
            onClose={() => setOpenModal(false)}
          >
            <ModalHeader>
              How to Get Consulting Solutions with JobHive
            </ModalHeader>
            <ModalBody className="space-y-5 px-6 py-4">
              <p className="">
                At <strong>JobHive</strong>, our consulting solutions are
                crafted to help employers streamline their hiring strategies,
                boost team productivity, and achieve long-term staffing success.
                Whether you're a startup or enterprise-level organization,
                here’s how to get started:
              </p>

              <ol className="list-decimal list-inside space-y-3 ">
                <li>
                  <strong>Create an Employer Account:</strong> Sign up on
                  JobHive as an employer to unlock access to our expert hiring
                  and consulting tools.
                </li>
                <li>
                  <strong>Visit the Consulting Page:</strong> Navigate to our
                  consulting services section, where you can browse available
                  solutions tailored to your industry and company size.
                </li>
                <li>
                  <strong>Select a Consultation Package:</strong> Choose from
                  our Basic, Pro, or Enterprise packages based on your company’s
                  current hiring goals and budget.
                </li>
                <li>
                  <strong>Book a Discovery Call:</strong> Schedule a 30-minute
                  session with our expert consultants. During this call, we’ll
                  learn about your team, goals, and challenges.
                </li>
                <li>
                  <strong>Receive a Custom Strategy:</strong> After
                  understanding your needs, our team will craft a custom hiring
                  and workflow solution to improve candidate sourcing,
                  screening, and onboarding.
                </li>
                <li>
                  <strong>Implement with Confidence:</strong> Use our tools and
                  expert guidance to streamline your recruitment — from writing
                  better job descriptions to making confident hiring decisions.
                </li>
                <li>
                  <strong>Measure & Optimize:</strong> We provide regular
                  performance reviews and analytics to help refine your hiring
                  process and improve outcomes.
                </li>
              </ol>

              <p className="text-gray-600">
                🔍 <strong>Bonus:</strong> Get access to exclusive hiring
                templates, AI-powered candidate matching, and support from our
                talent experts as part of selected plans.
              </p>

              <div className="text-center mt-6">
                <span className="text-lg font-semibold text-teal-700">
                  Need expert help? Let JobHive guide your hiring journey today.
                </span>
              </div>
            </ModalBody>
            <ModalFooter className="flex justify-end space-x-3">
              <Button onClick={() => setOpenModal(false)} color="gray">
                Close
              </Button>
              <Button
                onClick={() => {
                  window.location.href = "/consulting";
                }}
                className="bg-[#084049] hover:bg-[#02282E] text-white"
              >
                Explore Packages
              </Button>
            </ModalFooter>
          </Modal>
        </div>

        {/* Right Side Image */}
        <img
          src="/consulting.webp"
          alt="Business meeting"
          className="rounded-lg object-cover bg-cover bg-center shadow-md w-full h-[400px]"
        />
      </div>
    </div>
  );
}
