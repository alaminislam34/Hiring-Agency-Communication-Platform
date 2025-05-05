"use client";

import { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2Icon } from "lucide-react";

export default function CareerMove() {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  return (
    <section className="py-10 px-4 md:px-8 lg:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <img
          src="/career.webp"
          alt="Career move"
          className="rounded-2xl shadow-lg w-full h-[350px] sm:h-[400px] object-cover"
        />

        {/* content */}
        <div className="space-y-6">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 leading-snug">
            Make the career move you want
          </h2>

          <ul className="space-y-4 text-gray-700">
            {[
              "Get instant job recommendations tailored to your skills and goals",
              "Gain exposure to a range of companies and job types: fully remote, hybrid or on-site, and contract or permanent",
              "Access competitive pay, benefits, and free online training and development",
            ].map((point) => (
              <li key={point} className="flex gap-2">
                <CheckCircle2Icon className="text-teal-600 shrink-0 mt-0.5" />
                <span>{point}</span>
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

      {/* Modal */}
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Make the Career Move You Want with JobHive</ModalHeader>

        <ModalBody className="space-y-6 px-6 py-4 text-gray-700 text-base leading-relaxed">
          <p>
            At <strong>JobHive</strong>, we go beyond job listings — we empower
            your entire career journey. Whether you're a fresh graduate, career
            switcher, or experienced professional, our platform is tailored to
            support your next step.
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              🌐 Personalized job feeds that match your preferences and
              qualifications.
            </li>
            <li>
              🎯 Integrated tools like resume builders, mock interviews, and
              skill assessments to sharpen your edge.
            </li>
            <li>
              🚀 Explore our curated projects designed to elevate your profile
              and demonstrate your abilities to top employers.
            </li>
          </ul>

          <p>
            Join thousands of users finding better jobs and growing faster with
            JobHive. Your next opportunity is just a click away.
          </p>
        </ModalBody>

        <ModalFooter className="flex justify-end space-x-3">
          <Button onClick={() => setOpenModal(false)} color="gray">
            Close
          </Button>
          <Button
            onClick={() => router.push("/jobs")}
            className="bg-[#084049] hover:bg-[#02282E] text-white"
          >
            Get Job Matches
          </Button>
        </ModalFooter>
      </Modal>
    </section>
  );
}
