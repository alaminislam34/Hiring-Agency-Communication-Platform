"use client";

import { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { CheckCircle2Icon } from "lucide-react";

export default function CareerMove() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <img
          src="/career.webp"
          alt="Career move"
          className="rounded-2xl shadow-lg w-full h-[350px] sm:h-[400px] object-cover"
        />

        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
            Make the career move you want
          </h2>

          <ul className="space-y-4 text-gray-700">
            {[
              "Get instant job recommendations tailored to your skills and goals",
              "Gain exposure to a range of companies and job types: fully remote, hybrid or on-site, and contract or permanent",
              "Access competitive pay, benefits, and free online training and development",
            ].map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <p>
                  <CheckCircle2Icon className="text-xl text-teal-600 mt-1" />{" "}
                </p>
                <p>
                  <span className="">{point}</span>
                </p>
              </li>
            ))}
          </ul>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              href="/jobs"
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full text-sm md:text-base transition"
            >
              Get job matches
            </Link>
            <button
              onClick={() => setOpenModal(true)}
              className="border border-gray-400 text-gray-800 px-6 py-2 rounded-full text-sm md:text-base hover:bg-gray-100 transition"
            >
              Learn more
            </button>
          </div>
        </div>
      </div>

      {/* Modal Section */}
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Make the Career Move You Want with JobHive</ModalHeader>

        <ModalBody className="space-y-6 px-6 py-4 text-gray-700 text-base">
          <p>
            At <strong>JobHive</strong>, we empower job seekers to find the
            right opportunities by tailoring job recommendations to your goals,
            experience, and work style preferences.
          </p>

          <ul className="list-disc list-inside space-y-3">
            <li>
              <strong>Instant Job Matches:</strong> Get smart job suggestions
              based on your skills, interests, and preferences.
            </li>
            <li>
              <strong>Flexible Work Types:</strong> Choose from fully remote,
              hybrid, or on-site jobs across multiple industries.
            </li>
            <li>
              <strong>Customized Career Guidance:</strong> Receive
              recommendations that align with your growth and long-term career
              goals.
            </li>
            <li>
              <strong>Skill-Based Filters:</strong> Discover jobs that suit your
              current expertise or allow you to grow into a new role.
            </li>
            <li>
              <strong>Free Online Courses:</strong> Access career-enhancing
              resources and certifications to boost your employability.
            </li>
            <li>
              <strong>Competitive Benefits:</strong> Find employers who offer
              strong pay, perks, and flexible work culture.
            </li>
          </ul>

          <p>
            🚀 <strong>Bonus:</strong> Get one-click application options,
            personalized alerts, and AI-enhanced matching — all from your
            JobHive dashboard.
          </p>

          <div className="text-center mt-6">
            <span className="text-lg font-semibold text-teal-700">
              Let JobHive take your job search to the next level — your dream
              role is just a few clicks away.
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
    </section>
  );
}
