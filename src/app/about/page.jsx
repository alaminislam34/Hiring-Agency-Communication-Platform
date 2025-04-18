"use client";
import React from "react";
import {
  FaConnectdevelop,
  FaLinkedin,
  FaPeopleLine,
  FaRegMessage,
} from "react-icons/fa6";
import { Nunito } from 'next/font/google'
import { SlEnergy } from "react-icons/sl";
import { MdOutlineManageHistory } from "react-icons/md";
import { RiChatSmileAiLine, RiTwitterXFill } from "react-icons/ri";
import Link from "next/link";
import TabJob from "./TabJob/TabJob";
import EmployeeReview from "./employeeReview/EmployeeReview";
const nunito = Nunito({ subsets: ['latin'] })

const Page = () => {
  return (
    <div className= {`w-[90%] mx-auto my-10 ${nunito.className}`}>
      {/* Title Text Section-1 */}
      <div className="text-center py-6">
        <h2 className="text-4xl font-bold text-[#084049]">About Us</h2>
        <h2 className="text-xl font-semibold text-[#084049] py-2">We Do Things Differently...</h2>
        <p className= {`mt-2 text-center ${nunito.className} font-semibold`}>
        We don’t just connect people to jobs — we craft futures. Our approach is personal, precise, and performance-driven. When you work with us, you feel the difference.
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
          {/* Box 1 */}
          <div className="p-6 bg-white bg-opacity-80 rounded-lg shadow-md text-center">
            <h3 className="text-3xl font-bold">400+ </h3>
            <p className="text-xl font-bold text-[#084049]">Proven Hiring Success</p>
            <p className={`mt-2 text-gray-800 ${nunito.className}`}>
            We’ve completed over 400 recruitment projects, delivering high-impact hires for companies of all sizes. From startups to global enterprises, our track record speaks for itself — consistent, strategic, and results-driven hiring.
            </p>
          </div>
          {/* Box 2 */}
          <div className="p-6 bg-white bg-opacity-80 rounded-lg shadow-md text-center">
            <h3 className="text-3xl font-bold">600% </h3>
            <p className="text-xl font-bold text-[#084049]">Exceptional Client ROI</p>
            <p className={`mt-2 text-gray-800 ${nunito.className}`}>
            Clients who partner with us experience measurable returns — up to 600% ROI. Our tailored hiring strategies reduce turnover, speed up onboarding, and drive long-term performance gains across industries.
            </p>
          </div>
          {/* Box 3 */}
          <div className="p-6 bg-white bg-opacity-80 rounded-lg shadow-md text-center">
            <h3 className="text-3xl font-bold">10k </h3>
            <p className="text-xl font-bold text-[#084049]">Worldwide Recruiter Reach</p>
            <p className={`mt-2 text-gray-800 ${nunito.className}`}>
            Our free UI hiring toolkit has been downloaded over 10,000 times by recruiters and hiring professionals across the globe. It’s proof of our value, innovation, and the trust the industry places in our solutions.
            </p>
          </div>
        </div>
      </div>
      {/* Our values section */}
      <div className="my-12">
        {/* text-contents */}
        <div className="text-center my-8">
          <h1 className="text-3xl font-bold text-[#084049]">Our Values</h1>
          <p className={`mt-2 text-center w-full md:w-[90%] lg:w-[80%] xl:w-[70%] ${nunito.className} mx-auto font-semibold`}>
          We’re not just a team — we’re a collective of bold thinkers, builders, and connectors. Our values drive everything we do, from how we collaborate internally to how we deliver real, lasting results for our clients. These principles guide our mission to revolutionize hiring, one meaningful match at a time.
          </p>
        </div>
        {/* contents-info container*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 ">
          {/* item-1 */}
          <div className="text-center bg-[#084049] rounded-3xl shadow-md p-4 text-white">
            <div className="flex justify-center items-center m-2">
              <FaRegMessage className="text-4xl " />
            </div>
            <p className="text-xl font-bold">Streamline Candidate Communication</p>
            <p className="text-center m-4">
            Whether your team is small or scaling, our shared inboxes ensure every recruiter stays aligned. No missed emails, no confusion — just smooth collaboration and faster placements.
            </p>
          </div>
          {/* item-2 */}
          <div className="text-center bg-[#084049] rounded-3xl shadow-md p-4 text-white">
            <div className="flex justify-center items-center m-2">
              <SlEnergy className="text-4xl bg-gray-200 p-2" />
            </div>
            <p className="text-xl font-bold"> Respond Faster to Top Talent</p>
            <p className="text-center m-4">
            Speed is key in recruitment. Our system empowers you to deliver prompt, professional responses to candidates — helping you secure top talent before the competition does.
            </p>
          </div>
          {/* item-3 */}
          <div className="text-center bg-[#084049] rounded-3xl shadow-md p-4 text-white">
            <div className="flex justify-center items-center m-2">
              <MdOutlineManageHistory className="text-4xl " />
            </div>
            <p className="text-xl font-bold">
            Track Hiring with Actionable Reports
            </p>
            <p className="text-center m-4">
            Stay in control of your recruitment funnel. With real-time reports and insights, you can monitor progress, measure recruiter performance, and refine your hiring strategy.
            </p>
          </div>
          {/* item-4 */}
          <div className="text-center bg-[#084049] rounded-3xl shadow-md p-4 text-white">
            <div className="flex justify-center items-center m-2">
              <RiChatSmileAiLine className="text-4xl " />
            </div>
            <p className="text-xl font-bold">Build Stronger Candidate Relationships</p>
            <p className="text-center m-4">
            We help you stay connected with applicants through timely updates and personalized interactions — turning every application into a relationship and every touchpoint into trust.
            </p>
          </div>
          {/* item-5 */}
          <div className="text-center bg-[#084049] rounded-3xl shadow-md p-4 text-white">
            <div className="flex justify-center items-center m-2">
              <FaConnectdevelop className="text-4xl " />
            </div>
            <p className="text-xl font-bold">
            Integrate with Your Existing Tools
            </p>
            <p className="text-center m-4">
            Use what you love. Our platform integrates seamlessly with your ATS, calendars, and communication tools — so your team can recruit smarter, not harder.
            </p>
          </div>
          {/* item-6 */}
          <div className="text-center bg-[#084049] rounded-3xl shadow-md p-4 text-white">
            <div className="flex justify-center items-center m-2">
              <FaPeopleLine className="text-4xl " />
            </div>
            <p className="text-xl font-bold">Driven by People, Powered by Purpose</p>
            <p className="text-center m-4">
            At the heart of everything we do is people. We believe in hiring with intention — helping businesses grow and individuals thrive through meaningful career connections.
            </p>
          </div>
        </div>
      </div>

      {/* hiring section(meet out team section) */}
      {/* section -3 */}
      <div className="mb-12">
        {/* text-contents-div */}
        <div className="text-center my-10">
          <h2 className="text-sm md:text-xl lg:text-xl font-semibold text-purple-600 my-2">
            We Are Hiring!{" "}
          </h2>
          <h2 className="text-3xl font-bold text-[#084049]">
            Meet Our Team
          </h2>
          <p className={`mt-2 text-center w-full md:w-[90%] lg:w-[80%] xl:w-[60%]  mx-auto font-semibold`}>
            Our Philosophy is simple hire a team of diverse, passionate people
            and  foster a culture that empowers you do your best work.
          </p>
        </div>
        {/* contents-section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* cards-1 */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex justify-center items-center">
              <img
                className=" object-cover rounded-full"
                src="/teamImg/al-amin.jpg"
                alt="Logo"
              />
            </div>
            <h3 className="text-xl font-semibold text-center text-[#084049]">
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
            <div className="flex justify-around mt-4 bg-[#084049] w-full rounded-2xl p-2">
              <Link href={"https://x.com/MDAlAmin0412"} target="_blank">
                <RiTwitterXFill className="text-xl text-white" />
              </Link>
              <Link
                href={"https://www.linkedin.com/in/alamin34/"}
                target="_blank">
                <FaLinkedin className="text-xl text-white" />
              </Link>
              <Link href={"https://alamin4.netlify.app/"} target="_blank">
                <FaConnectdevelop className="text-xl text-white"></FaConnectdevelop>
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex justify-center items-center">
              <img
                className=" object-cover rounded-full"
                src="/teamImg/akash.PNG"
                alt="Logo"
              />
            </div>
            <h3 className="text-xl font-semibold text-center text-[#084049]">
              Akash Muhammad Abrrar
            </h3>
            <p className="text-lg text-center text-purple-600">
              Engineering Manager
            </p>

            <p className="text-sm text-gray-600 text-center">
              Lead engineering teams at Figma,Pitch, And Protocol Labs.
            </p>
            {/* links-(socials) */}
            <div className="flex justify-around mt-4 bg-[#084049] w-full rounded-2xl p-2">
              <Link href={"https://x.com/akash_madbor9"} target="_blank">
                <RiTwitterXFill className="text-xl text-white" />
              </Link>
              <Link
                href={
                  "https://www.linkedin.com/in/akash-muhammad-abrrar-764275228/"
                }
                target="_blank">
                <FaLinkedin className="text-xl text-white" />
              </Link>
              <Link
                href={"https://akashmabrrarnxtportfolio.netlify.app/"}
                target="_blank">
                <FaConnectdevelop className="text-xl text-white"></FaConnectdevelop>
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex justify-center items-center">
              <img
                className="rounded-full object-cover"
                src="/teamImg/rony.jpeg"
                alt="Logo"
              />
            </div>
            <h3 className="text-xl font-semibold text-center text-[#084049]">
              Rokonujjaman Rony
            </h3>
            <p className="text-lg text-center text-purple-600">
              Product Manager
            </p>
            <p className="text-sm text-gray-600 text-center">
              Former PM for linear, Lambda school, and on Deck. Currently
              working on End-Game Project
            </p>
            {/* links-(socials) */}
            <div className="flex justify-around mt-4 bg-[#084049] w-full rounded-2xl p-2">
              <Link href={"https://x.com/RoknujjamanRon2"} target="_blank">
                <RiTwitterXFill className="text-xl text-white" />
              </Link>
              <Link
                href={
                  "https://www.linkedin.com/in/md-roknujjaman-rony-906780210/"
                }
                target="_blank">
                <FaLinkedin className="text-xl text-white" />
              </Link>
              <Link
                href={"https://courageous-llama-711917.netlify.app/"}
                target="_blank">
                <FaConnectdevelop className="text-xl text-white"></FaConnectdevelop>
              </Link>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex justify-center items-center">
              <img
                className="rounded-full object-cover"
                src="/teamImg/rakib.jpg"
                alt="Logo"
              />
            </div>
            <h3 className="text-xl font-semibold text-center text-[#084049]">Rakib Gazi</h3>
            <p className="text-lg text-center text-purple-600">
              Frontend Developer
            </p>
            <p className="text-sm text-gray-600 text-center">
              Former frontend dev for Linear Coinbase, and JavaScript. End-game
              developer.
            </p>
            {/* links-(socials) */}
            <div className="flex justify-around mt-4 bg-[#084049] w-full rounded-2xl p-2">
              <Link href={"/#"}>
                <RiTwitterXFill className="text-xl text-white" />
              </Link>
              <Link
                href={"https://www.linkedin.com/in/mohammed-rakib-gazi/"}
                target="_blank">
                <FaLinkedin className="text-xl text-white" />
              </Link>
              <Link href={"https://rakibgazi.netlify.app/"} target="_blank">
                <FaConnectdevelop className="text-xl text-white"></FaConnectdevelop>
              </Link>
            </div>
          </div>

          {/* Card 5 */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex justify-center items-center">
              <img
                className="rounded-full object-cover"
                src="/teamImg/mahedi.jpg"
                alt="Logo"
              />
            </div>
            <h3 className="text-xl font-semibold text-center text-[#084049]">Alvee Hasan</h3>
            <p className="text-lg text-center text-purple-600">
              Backend Developer
            </p>
            <p className="text-sm text-gray-600 text-center">
              Lead backend dev at Clearbit. Former Clearbit and NodeJs, now
              working on end-game project
            </p>
            {/* links-(socials) */}
            <div className="flex justify-around mt-4 bg-[#084049] w-full rounded-2xl p-2">
              <Link href={"https://x.com/Dev_Hasan1"} target="_blank">
                <RiTwitterXFill className="text-xl text-white" />
              </Link>
              <Link
                href={"https://www.linkedin.com/in/web-developer-mehedihasan/"}
                target="_blank">
                <FaLinkedin className="text-xl text-white" />
              </Link>
              <Link
                href={"https://portfolio-gules-beta-59.vercel.app/"}
                target="_blank">
                <FaConnectdevelop className="text-xl text-white"></FaConnectdevelop>
              </Link>
            </div>
          </div>

          {/* Card 6 */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex justify-center items-center">
              <img
                className="w-12 h-12 object-cover"
                src="JobHive.png"
                alt="Logo"
              />
            </div>
            <h3 className="text-xl font-semibold text-center text-[#084049]">John Doe</h3>
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
            <div className="flex justify-around mt-4 bg-[#084049] w-full rounded-2xl p-2">
              <Link href={"/#"}>
                <RiTwitterXFill className="text-xl text-white" />
              </Link>
              <Link href={"/#"}>
                <FaLinkedin className="text-xl text-white" />
              </Link>
              <Link href={"/#"}>
                <FaConnectdevelop className="text-xl text-white"></FaConnectdevelop>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs section-4 */}
      {/* <TabJob></TabJob> */}
      {/* Employee Review Slider- section-5 */}
      <EmployeeReview></EmployeeReview>

      {/* newsletter section-6 */}

      <section className="my-10 bg-[#084049] py-10 px-4 md:px-10 lg:px-20 rounded-lg">
        <div className="text-center  mx-auto">
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-white">
            Join our careers newsletter.
          </h2>

          {/* Subheading */}
          <p className="text-gray-100 mt-2">
            Be the first to know when new jobs are posted!
          </p>

          {/* Input Field and Button */}
          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-[300px] sm:w-auto "
            />
            <button className="btn bg-white text-black hover:text-white hover:bg-red-600 w-full sm:w-auto">
              Subscribe
            </button>
          </div>

          {/* Privacy Policy Link */}
          <p className="text-sm text-gray-100 mt-3">
            We care about your data in our{" "}
            <a
              href="/privacy-policy"
              className="text-blue-500 hover:underline"
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
