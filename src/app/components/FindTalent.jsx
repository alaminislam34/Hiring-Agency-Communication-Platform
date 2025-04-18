"use client";
import { useAppContext } from "@/Providers/AppProviders";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { useState } from "react";
export default function FindTalent() {
  const [openModal, setOpenModal] = useState(false);
  const { currentUser } = useAppContext();
  const router = useRouter();
  const handleClick = () => {
    if (currentUser && currentUser?.role === "employer") {
      router.push("/dashboard/jobs");
    } else {
      router.push(`/signin`);
    }
  };
  return (
    <div className="mx-auto w-11/12 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-12">
        <img
          src="/talent-1.webp"
          alt="Team working"
          className="rounded-lg shadow-md h-[400px] w-full"
        />

        <div className=" flex flex-col justify-center w-full 2xl:w-2/3 pl-4">
          <h2 className="text-3xl font-semibold text-gray-900 leading-snug">
            Find talent to get more done
          </h2>
          <ul className="mt-4 space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
              <span>
                Access Robert Half’s large network of in-demand candidates for
                contract and permanent roles
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
              <span>
                Quickly match to professionals who have the right skills and
                industry experience
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
              <span>
                Let us recruit qualified candidates for you at every level from
                office support to C-suite
              </span>
            </li>
          </ul>

          <div className="mt-6 flex gap-4">
            <button
              onClick={handleClick}
              className="bg-[#084049] text-white px-6 py-3 rounded-full text-sm md:text-lg font-medium hover:bg-[#02282E] transition cursor-pointer"
            >
              Find your next hire
            </button>
            <button
              onClick={() => setOpenModal(true)}
              className="border border-gray-500 text-gray-900 px-6 py-3 rounded-full text-sm md:text-lg font-medium hover:bg-gray-200 transition cursor-pointer"
            >
              Learn more
            </button>
            <Modal
              dismissible
              show={openModal}
              onClose={() => setOpenModal(false)}
            >
              <ModalHeader>
                How to Find Talented Job Seekers Using Job
              </ModalHeader>
              <ModalBody>
                <div className="space-y-6">
                  <article className="prose max-w-none prose-headings:text-teal-600 prose-p:text-gray-700 prose-li:text-gray-600 space-y-6">
                    <p>
                      Welcome to <strong>JobHive</strong> — your trusted platform
                      for hiring top talent across all industries. Whether
                      you're a startup looking for your first hire or an
                      enterprise seeking highly skilled professionals, Job makes
                      it easy, fast, and effective.
                    </p>

                    <h2>Step-by-Step Guide to Finding Your Next Star Hire</h2>

                    <h3>1. Sign Up as an Employer</h3>
                    <p>
                      Begin by <strong>creating an employer account</strong>.
                      This gives you access to our intuitive dashboard where you
                      can manage job postings and review candidates. Signing up
                      only takes a few seconds.
                    </p>

                    <h3>2. Navigate to the Job Dashboard</h3>
                    <p>
                      Once logged in, go to your <code>/dashboard/jobs</code>{" "}
                      section. This is your control center — a place to post,
                      edit, and manage your job listings in one place.
                    </p>

                    <h3>3. Post a Job</h3>
                    <p>
                      Click the <strong>"Add Job"</strong> button. You’ll be
                      guided through a form to input your job details. Here’s
                      what to include:
                    </p>
                    <ul>
                      <li>Job Title & Description</li>
                      <li>Company Name & Location</li>
                      <li>Job Type (Full-time, Remote, Part-time, etc.)</li>
                      <li>Salary Range & Currency</li>
                      <li>Required Skills & Experience</li>
                      <li>Application Deadline & Contact Info</li>
                    </ul>
                    <p>
                      Once complete, hit <strong>"Post Job"</strong> to publish.
                      Your listing will go live instantly.
                    </p>

                    <h3>4. Review Applicants</h3>
                    <p>
                      As job seekers apply, their profiles will appear in your
                      dashboard. Each applicant includes a resume, cover letter,
                      and skill details so you can evaluate them quickly.
                    </p>

                    <h3>5. Shortlist and Interview</h3>
                    <p>
                      Use our filtering tools to{" "}
                      <strong>shortlist top candidates</strong>. From there, you
                      can message applicants, schedule interviews, and keep
                      track of every stage of the hiring process.
                    </p>

                    <h3>6. Hire and Grow</h3>
                    <p>
                      Found your ideal candidate? Great! Use our platform to
                      send the offer and mark the job as "Hired". You can also
                      leave feedback or keep the listing active if you're hiring
                      more than one role.
                    </p>

                    <h2>Why Use Job?</h2>
                    <ul>
                      <li>Access thousands of pre-vetted job seekers</li>
                      <li>Post jobs for free and pay only when you hire</li>
                      <li>Manage the entire hiring flow in one dashboard</li>
                      <li>Find real, skilled talent faster than ever</li>
                    </ul>

                    <p>
                      🚀 With Job, you’re not just filling roles — you’re{" "}
                      <strong>building a team</strong>. Ready to find your next
                      hire?
                    </p>
                  </article>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button onClick={() => setOpenModal(false)} color="gray">Got it, let's hire!</Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  Decline
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
