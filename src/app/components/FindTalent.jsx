"use client";

import { useAppContext } from "@/Providers/AppProviders";
import { useRouter } from "next/navigation";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { useState } from "react";
import { CheckCircle2Icon } from "lucide-react";

const FeatureItem = ({ text }) => (
  <li className="flex items-start gap-2 text-gray-700">
    <p>
      <CheckCircle2Icon className="text-xl text-teal-500 shrink-0" />
    </p>
    <p>
      <span>{text}</span>
    </p>
  </li>
);

export default function FindTalent() {
  const [openModal, setOpenModal] = useState(false);
  const { currentUser } = useAppContext();
  const router = useRouter();

  const handleFindHireClick = () => {
    if (currentUser?.role === "employer") {
      router.push("/dashboard/jobs");
    } else {
      router.push("/signin");
    }
  };

  return (
    <section className="w-11/12 mx-auto py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <img
          src="/talent-1.webp"
          alt="Team working"
          className="w-full h-[400px] object-cover rounded-lg shadow-md"
        />

        <div className="flex flex-col justify-center pl-4 w-full 2xl:w-2/3">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 leading-snug">
            Find talent to get more done
          </h2>

          <ul className="mt-4 space-y-4">
            <FeatureItem text="Access Robert Half’s large network of in-demand candidates for contract and permanent roles" />
            <FeatureItem text="Quickly match to professionals who have the right skills and industry experience" />
            <FeatureItem text="Let us recruit qualified candidates for you at every level from office support to C-suite" />
          </ul>

          <div className="mt-6 flex gap-4 flex-wrap">
            <button
              onClick={handleFindHireClick}
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full text-sm md:text-base transition"
            >
              Find your next hire
            </button>
            <button
              onClick={() => setOpenModal(true)}
              className="border border-gray-500 text-gray-900 px-6 py-2 rounded-full text-sm md:text-base hover:bg-teal-100 transition"
            >
              Learn more
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>How to Find Talented Job Seekers Using Job</ModalHeader>
        <ModalBody>
          <article className="prose max-w-none prose-headings:text-teal-600 prose-p:text-gray-700 prose-li:text-gray-600">
            <p>
              Welcome to <strong>JobHive</strong> — your trusted platform for
              hiring top talent across all industries.
            </p>

            <h2>Step-by-Step Guide to Finding Your Next Star Hire</h2>

            <h3>1. Sign Up as an Employer</h3>
            <p>
              Begin by <strong>creating an employer account</strong> to access
              your dashboard.
            </p>

            <h3>2. Navigate to the Job Dashboard</h3>
            <p>
              Go to <code>/dashboard/jobs</code> to manage your job listings.
            </p>

            <h3>3. Post a Job</h3>
            <p>
              Click <strong>"Add Job"</strong> and fill out details such as:
            </p>
            <ul>
              <li>Job Title & Description</li>
              <li>Company Name & Location</li>
              <li>Job Type</li>
              <li>Salary Range</li>
              <li>Required Skills</li>
              <li>Deadline & Contact Info</li>
            </ul>

            <h3>4. Review Applicants</h3>
            <p>
              Applicants will appear in your dashboard with resume and skill
              details.
            </p>

            <h3>5. Shortlist and Interview</h3>
            <p>Use filters to shortlist and communicate with candidates.</p>

            <h3>6. Hire and Grow</h3>
            <p>Once hired, send offers and manage feedback easily.</p>

            <h2>Why Use Job?</h2>
            <ul>
              <li>Access thousands of pre-vetted job seekers</li>
              <li>Post jobs for free</li>
              <li>Manage hiring in one dashboard</li>
              <li>Find real talent faster</li>
            </ul>

            <p>
              🚀 With Job, you're not just hiring — you're{" "}
              <strong>building a team</strong>.
            </p>
          </article>
        </ModalBody>
        <ModalFooter>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Got it, let’s hire!
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </ModalFooter>
      </Modal>
    </section>
  );
}
