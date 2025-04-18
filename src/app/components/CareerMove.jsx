"use client";

import { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { HiCheckCircle } from "react-icons/hi";

import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function CareerMove() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <img
          src="/career.webp"
          alt="Career move"
          className="rounded-lg shadow-md w-full h-[400px]"
        />

        <div className="flex flex-col justify-center pl-4 w-full 2xl:w-2/3">
          <h2 className="text-3xl font-semibold text-gray-900 leading-snug">
            Make the career move you want
          </h2>
          <ul className="mt-4 space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
              <span>
                Get instant job recommendations tailored to your skills and
                goals
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
              <span>
                Gain exposure to a range of companies and job types: fully
                remote, hybrid or on-site, and contract or permanent.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
              <span>
                Access competitive pay, benefits, and free online training and
                development
              </span>
            </li>
          </ul>

          <div className="mt-6 flex gap-4">
            <Link
              href="/jobs"
              className="bg-[#084049] text-white px-6 py-3 rounded-full text-sm md:text-lg font-medium hover:bg-[#02282E] transition cursor-pointer"
            >
              Get job matches
            </Link>
            <button
              onClick={() => setOpenModal(true)}
              className="border border-gray-500 text-gray-900 px-6 py-3 rounded-full text-sm md:text-lg font-medium hover:bg-gray-200 transition cursor-pointer"
            >
              Learn more
            </button>
            <Modal
              dismissible
              show={openModal}
              onClose={() => setOpenModal(true)}
            >
              <ModalHeader>
                Make the Career Move You Want with JobHive
              </ModalHeader>

              <ModalBody className="space-y-5 px-6 py-4">
                <p className="text-gray-700 text-base">
                  At <strong>JobHive</strong>, we empower job seekers to find
                  the right opportunities by tailoring job recommendations to
                  your goals, experience, and work style preferences.
                </p>

                <ul className="list-disc list-inside space-y-3 text-gray-700">
                  <li>
                    <strong>Instant Job Matches:</strong> Get smart job
                    suggestions based on your skills, interests, and
                    preferences.
                  </li>
                  <li>
                    <strong>Flexible Work Types:</strong> Choose from fully
                    remote, hybrid, or on-site jobs across multiple industries.
                  </li>
                  <li>
                    <strong>Customized Career Guidance:</strong> Receive
                    recommendations that align with your growth and long-term
                    career goals.
                  </li>
                  <li>
                    <strong>Skill-Based Filters:</strong> Discover jobs that
                    suit your current expertise or allow you to grow into a new
                    role.
                  </li>
                  <li>
                    <strong>Free Online Courses:</strong> Access
                    career-enhancing resources and certifications to boost your
                    employability.
                  </li>
                  <li>
                    <strong>Competitive Benefits:</strong> Find employers who
                    offer strong pay, perks, and flexible work culture.
                  </li>
                </ul>

                <p className="text-gray-600">
                  🚀 <strong>Bonus:</strong> Get one-click application options,
                  personalized alerts, and AI-enhanced matching — all from your
                  JobHive dashboard.
                </p>

                <div className="text-center mt-6">
                  <span className="text-lg font-semibold text-teal-700">
                    Let JobHive take your job search to the next level — your
                    dream role is just a few clicks away.
                  </span>
                </div>
              </ModalBody>

              <ModalFooter className="flex justify-end space-x-3">
                <Button onClick={() => setOpenModal(false)} color="gray">
                  Close
                </Button>
                <Button
                  onClick={() => {
                    window.location.href = "/jobs";
                  }}
                  className="bg-[#084049] hover:bg-[#02282E] text-white"
                >
                  Get Job Matches
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
