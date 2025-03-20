"use client";
import React from "react";
import {
  FaConnectdevelop,
  FaLinkedin,
  FaPeopleLine,
  FaRegMessage,
} from "react-icons/fa6";
import { SlEnergy } from "react-icons/sl";
import { MdOutlineManageHistory } from "react-icons/md";
import { RiChatSmileAiLine, RiTwitterXFill } from "react-icons/ri";
import Link from "next/link";
import TabJob from "./TabJob/TabJob";
import EmployeeReview from "./employeeReview/EmployeeReview";

const Page = () => {
  return (
    <div className="w-[90%] mx-auto my-10">
      {/* Title Text Section-1 */}
      <div className="text-center py-6">
        <h2 className="text-2xl">About Us</h2>
        <h2 className="text-2xl font-semibold">We Do Things Differently...</h2>
        <p className="mt-2 text-center">
          We focus on the details of everything we do. All to help businesses
          around the world focus <br /> on what's most important to them. We
          take pride in this.
        </p>
      </div>

      {/* Responsive Stats Section-2 */}
      <div
        className="hero py-10 flex flex-col items-center justify-center"
        style={{
          backgroundImage:
            "url(https://i.ibb.co.com/HDm4vLzn/istockphoto-644335608-1024x1024.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className="hero-overlay bg-black bg-opacity-40"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl px-4">
          {/* Box 1 */}
          <div className="p-6 bg-white bg-opacity-80 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold">400+ Projects Completed</h3>
            <p className="mt-2 text-sm">
              We've helped build over 400 projects with great companies.
            </p>
          </div>
          {/* Box 2 */}
          <div className="p-6 bg-white bg-opacity-80 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold">600% Return on Investment</h3>
            <p className="mt-2 text-sm">
              Businesses saw a significant return with our expertise.
            </p>
          </div>
          {/* Box 3 */}
          <div className="p-6 bg-white bg-opacity-80 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold">10k Global Downloads</h3>
            <p className="mt-2 text-sm">
              Our free UI kit has been downloaded over 10,000 times globally.
            </p>
          </div>
        </div>
      </div>
      {/* Our values section */}
      <div>
        {/* text-contents */}
        <div className="text-center my-8">
          <h1 className="text-2xl">Our Values</h1>
          <p className="mt-2 text-center">
            We are an ambitious Team And. By leveraging these resources, you can
            create <br /> a professional and visually appealing "About Us" page
            that
          </p>
        </div>
        {/* contents-info container*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 ">
          {/* item-1 */}
          <div className="text-center border ">
            <div className="flex justify-center items-center m-2">
              <FaRegMessage className="text-4xl " />
            </div>
            <p className="text-xl font-semibold">Share team inboxes</p>
            <p className="text-center m-4">
              Whether you have a team of 2 or200. our shared team inboxes keep
              everyone on in the same page and in the loop
            </p>
          </div>
          {/* item-2 */}
          <div className="text-center border ">
            <div className="flex justify-center items-center m-2">
              <SlEnergy className="text-4xl bg-gray-200 p-2" />
            </div>
            <p className="text-xl font-semibold">Deliver Instant Answer</p>
            <p className="text-center m-4">
              Whether you have a team of 2 or200. our shared team inboxes keep
              everyone on in the same page and in the loop
            </p>
          </div>
          {/* item-3 */}
          <div className="text-center border ">
            <div className="flex justify-center items-center m-2">
              <MdOutlineManageHistory className="text-4xl " />
            </div>
            <p className="text-xl font-semibold">
              Manage Your Team With Reports
            </p>
            <p className="text-center m-4">
              Whether you have a team of 2 or200. our shared team inboxes keep
              everyone on in the same page and in the loop
            </p>
          </div>
          {/* item-4 */}
          <div className="text-center border ">
            <div className="flex justify-center items-center m-2">
              <RiChatSmileAiLine className="text-4xl " />
            </div>
            <p className="text-xl font-semibold">Connect With Customers</p>
            <p className="text-center m-4">
              Whether you have a team of 2 or200. our shared team inboxes keep
              everyone on in the same page and in the loop
            </p>
          </div>
          {/* item-5 */}
          <div className="text-center border ">
            <div className="flex justify-center items-center m-2">
              <FaConnectdevelop className="text-4xl " />
            </div>
            <p className="text-xl font-semibold">
              Connect The Tools You Already Use
            </p>
            <p className="text-center m-4">
              Whether you have a team of 2 or200. our shared team inboxes keep
              everyone on in the same page and in the loop
            </p>
          </div>
          {/* item-6 */}
          <div className="text-center border ">
            <div className="flex justify-center items-center m-2">
              <FaPeopleLine className="text-4xl " />
            </div>
            <p className="text-xl font-semibold">Our People Make Differences</p>
            <p className="text-center m-4">
              Whether you have a team of 2 or200. our shared team inboxes keep
              everyone on in the same page and in the loop
            </p>
          </div>
        </div>
      </div>

      {/* hiring section(meet out team section) */}
      {/* section -3 */}
      <div>
        {/* text-contents-div */}
        <div className="text-center my-10">
          <h2 className="text-sm md:text-xl lg:text-xl font-semibold text-purple-600">
            We Are Hiring!{" "}
          </h2>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl  p-2">
            __Meet Our Team__
          </h2>
          <p className=" text-center">
            Our Philosophy is simple__hire a team of diverse, passionate people
            and <br /> foster a culture that empowers you do your best work.
          </p>
        </div>
        {/* contents-section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* cards-1 */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex justify-center items-center">
              <img
                className=" object-cover rounded-full"
                src="/teamImg/al-amin.jpg"
                alt="Logo"
              />
            </div>
            <h3 className="text-lg font-semibold text-center">
              MD Al-Amin Ahmed
            </h3>
            <p className="text-lg text-center text-purple-600">
              Founder and CEO
            </p>
            <p className="text-sm  text-gray-600 text-center">
              Former co-founder of job-hive. Early <br /> staff at spotify and
              clearbit
            </p>
            {/* links-(socials) */}
            <div className="flex justify-around mt-4 bg-gray-300 w-full rounded-2xl p-2">
              <Link href={"https://x.com/MDAlAmin0412"} target="_blank">
                <RiTwitterXFill className="text-xl" />
              </Link>
              <Link
                href={"https://www.linkedin.com/in/alamin34/"}
                target="_blank">
                <FaLinkedin className="text-xl" />
              </Link>
              <Link href={"https://alamin4.netlify.app/"} target="_blank">
                <FaConnectdevelop className="text-xl"></FaConnectdevelop>
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex justify-center items-center">
              <img
                className=" object-cover rounded-full"
                src="/teamImg/akash.PNG"
                alt="Logo"
              />
            </div>
            <h3 className="text-lg font-semibold text-center">
              Akash Muhammad Abrrar
            </h3>
            <p className="text-lg text-center text-purple-600">
              Engineering Manager
            </p>

            <p className="text-sm text-gray-600 text-center">
              Lead engineering teams at Figma,Pitch, And Protocol Labs.
            </p>
            {/* links-(socials) */}
            <div className="flex justify-around mt-4 bg-gray-300 w-full rounded-2xl p-2">
              <Link href={"https://x.com/akash_madbor9"} target="_blank">
                <RiTwitterXFill className="text-xl" />
              </Link>
              <Link
                href={
                  "https://www.linkedin.com/in/akash-muhammad-abrrar-764275228/"
                }
                target="_blank">
                <FaLinkedin className="text-xl" />
              </Link>
              <Link
                href={"https://akashmabrrarnxtportfolio.netlify.app/"}
                target="_blank">
                <FaConnectdevelop className="text-xl"></FaConnectdevelop>
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex justify-center items-center">
              <img
                className="rounded-full object-cover"
                src="/teamImg/rony.jpeg"
                alt="Logo"
              />
            </div>
            <h3 className="text-lg font-semibold text-center">
              Rokonujjaman Rony(:)
            </h3>
            <p className="text-lg text-center text-purple-600">
              Product Manager
            </p>
            <p className="text-sm text-gray-600 text-center">
              Former PM for linear, Lambda school, and on Deck. Currently
              working on End-Game Project
            </p>
            {/* links-(socials) */}
            <div className="flex justify-around mt-4 bg-gray-300 w-full rounded-2xl p-2">
              <Link href={"https://x.com/RoknujjamanRon2"} target="_blank">
                <RiTwitterXFill className="text-xl" />
              </Link>
              <Link
                href={
                  "https://www.linkedin.com/in/md-roknujjaman-rony-906780210/"
                }
                target="_blank">
                <FaLinkedin className="text-xl" />
              </Link>
              <Link
                href={"https://courageous-llama-711917.netlify.app/"}
                target="_blank">
                <FaConnectdevelop className="text-xl"></FaConnectdevelop>
              </Link>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex justify-center items-center">
              <img
                className="rounded-full object-cover"
                src="/teamImg/rakib.jpg"
                alt="Logo"
              />
            </div>
            <h3 className="text-lg font-semibold text-center">Rakib Gazi</h3>
            <p className="text-lg text-center text-purple-600">
              Frontend Developer
            </p>
            <p className="text-sm text-gray-600 text-center">
              Former frontend dev for Linear Coinbase, and JavaScript. End-game
              developer.
            </p>
            {/* links-(socials) */}
            <div className="flex justify-around mt-4 bg-gray-300 w-full rounded-2xl p-2">
              <Link href={"/#"}>
                <RiTwitterXFill className="text-xl" />
              </Link>
              <Link
                href={"https://www.linkedin.com/in/mohammed-rakib-gazi/"}
                target="_blank">
                <FaLinkedin className="text-xl" />
              </Link>
              <Link href={"https://rakibgazi.netlify.app/"} target="_blank">
                <FaConnectdevelop className="text-xl"></FaConnectdevelop>
              </Link>
            </div>
          </div>

          {/* Card 5 */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex justify-center items-center">
              <img
                className="rounded-full object-cover"
                src="/teamImg/mahedi.jpg"
                alt="Logo"
              />
            </div>
            <h3 className="text-lg font-semibold text-center">Alvee Hasan</h3>
            <p className="text-lg text-center text-purple-600">
              Backend Developer
            </p>
            <p className="text-sm text-gray-600 text-center">
              Lead backend dev at Clearbit. Former Clearbit and NodeJs, now
              working on end-game project
            </p>
            {/* links-(socials) */}
            <div className="flex justify-around mt-4 bg-gray-300 w-full rounded-2xl p-2">
              <Link href={"https://x.com/Dev_Hasan1"} target="_blank">
                <RiTwitterXFill className="text-xl" />
              </Link>
              <Link
                href={"https://www.linkedin.com/in/web-developer-mehedihasan/"}
                target="_blank">
                <FaLinkedin className="text-xl" />
              </Link>
              <Link
                href={"https://portfolio-gules-beta-59.vercel.app/"}
                target="_blank">
                <FaConnectdevelop className="text-xl"></FaConnectdevelop>
              </Link>
            </div>
          </div>

          {/* Card 6 */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex justify-center items-center">
              <img
                className="w-12 h-12 object-cover"
                src="logo.png"
                alt="Logo"
              />
            </div>
            <h3 className="text-lg font-semibold text-center">I don't know</h3>
            <p className="text-lg text-center text-purple-600">
              <p className="text-lg text-center text-purple-600">
                Product Manager
              </p>
            </p>
            <p className="text-sm text-gray-600 text-center">
              Founding design team at Figma. Former pelo,stripe,and Tile, now
              he's disappear
            </p>
            {/* links-(socials) */}
            <div className="flex justify-around mt-4 bg-gray-300 w-full rounded-2xl p-2">
              <Link href={"/#"}>
                <RiTwitterXFill className="text-xl" />
              </Link>
              <Link href={"/#"}>
                <FaLinkedin className="text-xl" />
              </Link>
              <Link href={"/#"}>
                <FaConnectdevelop className="text-xl"></FaConnectdevelop>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs section-4 */}
      <TabJob></TabJob>
      {/* Employee Review Slider- section-5 */}
      <EmployeeReview></EmployeeReview>

      {/* newsletter section-6 */}

      <section className="my-10 bg-base-200 py-10 px-4 md:px-10 lg:px-20 rounded-lg">
        <div className="text-center max-w-xl mx-auto">
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold">
            Join our careers newsletter.
          </h2>

          {/* Subheading */}
          <p className="text-gray-600 mt-2">
            Be the first to know when new jobs are posted!
          </p>

          {/* Input Field and Button */}
          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full sm:w-auto max-w-sm"
            />
            <button className="btn btn-primary w-full sm:w-auto">
              Subscribe
            </button>
          </div>

          {/* Privacy Policy Link */}
          <p className="text-sm text-gray-500 mt-3">
            We care about your data in our{" "}
            <a
              href="/privacy-policy"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer">
              privacy policy
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default Page;
