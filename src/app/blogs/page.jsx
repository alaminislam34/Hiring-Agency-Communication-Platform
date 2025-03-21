"use client";
import React from "react";
import { FaArrowDown } from "react-icons/fa6";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { LiaReadme } from "react-icons/lia";
import { IoHappyOutline } from "react-icons/io5";
import { IoBagAddSharp } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { useState } from "react";
const page = () => {
  const [showMore, setShowMore] = useState(false);
  const [seeMore, setSeeMore] = useState(false);
  const [learnMore, setLearnMore] = useState(false);

  const toggleSeeMore = () => {
    setSeeMore(!seeMore);
  };
  const toggleLearnMore = () => {
    setLearnMore(!learnMore);
  };
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <div>
      <div
        className="hero min-h-96"
        style={{
          backgroundImage:
            "url(https://i.ibb.co.com/2061QQJG/the-value-of-teamwork-in-the-workplace-blog-RH-05-23-24.webp)",
          borderBottomLeftRadius: "16px", // Round bottom left
          borderBottomRightRadius: "16px", // Round bottom right
          overflow: "hidden", // Ensures content stays within rounded corners
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Blogs</h1>
            <p className="mb-5">
              Our Team Moves Faster, Keeping you Current on What's Hot
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        {/* Post Card Container */}
        <div className="max-w-7xl w-11/12 mx-auto">
          <h1 className="text-4xl font-semibold flex items-center">
            <p>Recent Posts</p>{" "}
            <p className="text-xl ml-3">
              <FaArrowDown />
            </p>
          </h1>
          {/* Posts */}
          <div className="grid grid-cols-3">
            <div className="card bg-base-100 w-96 shadow-sm mt-8">
              <figure>
                <img
                  className="w-full h-52"
                  src="https://i.ibb.co.com/HfdMSYm3/side-view-man-talking-phone.jpg"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <div className="flex justify-between">
                  <h2 className="card-title">
                    Work-From-Home Jobs That Pay Well Role and Facilities
                  </h2>
                  <div className="badge badge-info">Event</div>
                </div>
                <p className="text-gray-700">
                  This is an example of a "See More" functionality. You can
                  toggle between showing a limited part of the content and the
                  full content...
                </p>
                {showMore && (
                  <p className="text-gray-700 mt-2">
                    This is the additional content that appears when you click
                    "See More." It can include anything you want, like detailed
                    explanations, extended descriptions, or extra data.
                  </p>
                )}
                <button
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={toggleShowMore}
                >
                  {showMore ? "See Less" : "See More"}
                </button>
              </div>
            </div>
            <div className="card bg-base-100 w-96 shadow-sm mt-8">
              <figure>
                <img
                  className="w-full h-52"
                  src="https://i.ibb.co.com/whwyC9WG/happy-man-looking-laptop.jpg"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <div className="flex justify-between">
                  <h2 className="card-title">
                    Recruiter and Land Your Dream Job Explore Nice Jobs
                  </h2>
                  <div className="badge badge-info">Tips</div>
                </div>
                <p className="text-gray-700">
                  This is an example of a "See More" functionality. You can
                  toggle between showing a limited part of the content and the
                  full content...
                </p>
                {learnMore && (
                  <p className="text-gray-700 mt-2">
                    This is the additional content that appears when you click
                    "See More." It can include anything you want, like detailed
                    explanations, extended descriptions, or extra data.
                  </p>
                )}
                <button
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={toggleLearnMore}
                >
                  {learnMore ? "See Less" : "See More"}
                </button>
              </div>
            </div>
            <div className="card bg-base-100 w-96 shadow-sm mt-8">
              <figure>
                <img
                  className="w-full h-52"
                  src="https://i.ibb.co.com/7JcHGrHG/medium-shot-man-working-laptop.jpg"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <div className="flex justify-between">
                  <h2 className="card-title">
                    How To Write an different Application Letter (With Examples)
                  </h2>
                  <div className="badge badge-info">Event</div>
                </div>
                <p className="text-gray-700">
                  This is an example of a "See More" functionality. You can
                  toggle between showing a limited part of the content and the
                  full content...
                </p>
                {seeMore && (
                  <p className="text-gray-700 mt-2">
                    This is the additional content that appears when you click
                    "See More." It can include anything you want, like detailed
                    explanations, extended descriptions, or extra data.
                  </p>
                )}
                <button
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={toggleSeeMore}
                >
                  {seeMore ? "See Less" : "See More"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl w-11/12 mx-auto mt-16">
          <h1 className="text-5xl mb-8 font-semibold flex items-center">
            <p>Latest Update</p>{" "}
            <p className="ml-3 text-4xl">
              <MdOutlineTipsAndUpdates />
            </p>
          </h1>
          {/* update Container */}
          <div>
            <div>
              <div>
                <img
                  className="rounded-md border border-gray-400 max-w-full"
                  src="https://i.ibb.co.com/0V25H7yZ/tech-team-working-AI-innovations-1.webp"
                  alt="Blog Photo"
                />
              </div>
              <div>
                <h2 className="my-4 text-4xl font-semibold">
                  Every man try to reach the top but why not be?
                </h2>
                <p>
                  Every man aspires to reach the pinnacle of success, driven by
                  dreams and ambition. However, the journey often tests
                  resilience, focus, and dedication. Success requires not just
                  effort but strategy and perseverance. The question is not why,
                  but how you choose to conquer your path and rise above
                  challenges.
                </p>
                <button className="flex items-center bg-[#084049] text-white py-3 px-5 rounded-md my-2 border border-[#084049] hover:bg-transparent hover:text-black cursor-pointer">
                  <p> Read Full Article</p>{" "}
                  <p className="text-xl ml-2">
                    <LiaReadme />
                  </p>
                </button>
              </div>
            </div>
            <div className="mt-10">
              <div>
                <img
                  className="rounded-md border border-gray-400 max-h-dvw"
                  src="https://i.ibb.co.com/0V25H7yZ/tech-team-working-AI-innovations-1.webp"
                  alt="Blog Photo"
                />
              </div>
              <div>
                <h2 className="my-4 text-4xl font-semibold">
                  Business are the most important way to success.
                </h2>
                <p>
                  Business is one of the most important paths to achieving
                  success, offering opportunities for financial growth and
                  independence. It encourages innovation, problem-solving, and
                  the ability to impact society. Through strategic planning and
                  hard work, businesses can create sustainable value. Success in
                  business also builds leadership skills and fosters long-term
                  personal and professional growth.
                </p>
                <button className="flex items-center bg-[#084049] text-white py-3 px-5 rounded-md my-2 border border-[#084049] hover:bg-transparent hover:text-black cursor-pointer">
                  <p> Read Full Article</p>{" "}
                  <p className="text-xl ml-2">
                    <LiaReadme />
                  </p>
                </button>
              </div>
            </div>
          </div>
          {/* Our Services */}
          <div className="mt-8">
            <h1 className="text-5xl font-semibold">Our Services</h1>
            {/* Image Container */}
            <div className="grid grid-cols-3 gap-5 my-5">
              <div>
                <img
                  className="rounded-md"
                  src="https://i.ibb.co.com/C3bc0S0B/Unlocking-Your-Career-Potential-A-Comprehensive-Guide-to-Job-Placement-Services-1.jpg"
                  alt="Service"
                />
              </div>
              <div>
                <img
                  className="rounded-md"
                  src="https://i.ibb.co.com/C3kwbmP6/recruitment-marketplace-banner.png"
                  alt="Service"
                />
              </div>
              <div>
                <img
                  className="rounded-md"
                  src="https://i.ibb.co.com/N6D0DbSb/Top-10-Recruitment-Agency-in-Bangladesh.jpg"
                  alt="Service"
                />
              </div>
              <div>
                <img
                  className="rounded-md"
                  src="https://i.ibb.co.com/sdKjYR7C/1716281465811.png"
                  alt="Service"
                />
              </div>

              <div>
                <img
                  className="rounded-md"
                  src="https://i.ibb.co.com/DfP5mdGF/1697633904468.png"
                  alt="Service"
                />
              </div>
              <div>
                <img
                  className="rounded-md"
                  src="https://i.ibb.co.com/F4JsbwBm/howdorecruitmentagencywork-240127113715-82dff607-thumbnail.webp"
                  alt="Service"
                />
              </div>
            </div>
          </div>
          {/* Our Impact */}
          <div className="bg-black rounded-tl-md rounded-tr-md mb-0.5">
            <h1 className="text-4xl font-semibold text-white p-4">
              Our Impact
            </h1>
            <div className="p-5">
              <div className="join p-5">
                <div>
                  <label className="input validator join-item">
                    <svg
                      className="h-[1em] opacity-50"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </g>
                    </svg>
                    <input type="email" placeholder="write email" required />
                  </label>
                  <div className="validator-hint hidden">
                    Enter valid email address
                  </div>
                </div>
                <button className="btn btn-success join-item">Subscribe</button>
                {/* Cards */}
                <div className="grid grid-cols-3">
                  <div className=" ml-2.5 p-1.5 rounded-md">
                    {/* <h2 className="text-white ml-8 text-2xl">245</h2> */}
                    <h2 className="text-white flex items-center text-2xl">
                      <span className="mr-2">
                        <IoHappyOutline />
                      </span>{" "}
                      <span>Happy Client</span>
                      <span className="ml-1.5">: 245</span>
                    </h2>
                  </div>
                  <div className=" ml-2.5 p-1.5 rounded-md">
                    {/* <h2 className="text-white ml-8 text-2xl">245</h2> */}
                    <h2 className="text-white flex items-center text-2xl">
                      <span className="mr-2">
                        <IoBagAddSharp />
                      </span>{" "}
                      <span>Job Posting</span>
                      <span className="ml-1.5">: 315</span>
                    </h2>
                  </div>
                  <div className=" ml-2.5 p-1.5 rounded-md">
                    {/* <h2 className="text-white ml-8 text-2xl">245</h2> */}
                    <h2 className="text-white flex items-center text-2xl">
                      <span className="mr-2">
                        <FaRegUser />
                      </span>{" "}
                      <span>Resume Post</span>
                      <span className="ml-1.5">: 850</span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
