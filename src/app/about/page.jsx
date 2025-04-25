"use client";

import { Nunito } from "next/font/google";
import TabJob from "./TabJob/TabJob";
import EmployeeReview from "./employeeReview/EmployeeReview";
import SectionTitle from "../components/SharedComponents/SectionTitle";
import FeaturesGrid from "./components/FeaturesGrid";
import TeamCard from "./components/TeamCard";
const nunito = Nunito({ subsets: ["latin"] });

const Page = () => {
  return (
    <div className={`max-w-7xl mx-auto my-10 ${nunito.className}`}>
      {/* Title Text Section-1 */}

      <div className="text-center py-6 space-y-4 lg:space-y-6">
        <SectionTitle
          title={"About Us"}
          subtitle={
            " We don’t just connect people to jobs — we craft futures. Our approach is personal, precise, and performance-driven. When you work with us, you feel the difference."
          }
        />
      </div>

      {/* Responsive Stats Section-2 */}
      <div
        className="hero py-10 flex flex-col items-center justify-center"
        style={{
          backgroundImage:
            "url(https://i.ibb.co.com/HDm4vLzn/istockphoto-644335608-1024x1024.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay bg-black bg-opacity-40"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
          {/* Box 1 */}
          <div className="p-6 bg-white bg-opacity-80 rounded-lg shadow-md text-center">
            <h3 className="text-3xl font-bold">400+ </h3>
            <p className="text-xl font-bold text-[#084049]">
              Proven Hiring Success
            </p>
            <p className={`mt-2 text-gray-800 ${nunito.className}`}>
              We’ve completed over 400 recruitment projects, delivering
              high-impact hires for companies of all sizes. From startups to
              global enterprises, our track record speaks for itself —
              consistent, strategic, and results-driven hiring.
            </p>
          </div>
          {/* Box 2 */}
          <div className="p-6 bg-white bg-opacity-80 rounded-lg shadow-md text-center">
            <h3 className="text-3xl font-bold">600% </h3>
            <p className="text-xl font-bold text-[#084049]">
              Exceptional Client ROI
            </p>
            <p className={`mt-2 text-gray-800 ${nunito.className}`}>
              Clients who partner with us experience measurable returns — up to
              600% ROI. Our tailored hiring strategies reduce turnover, speed up
              onboarding, and drive long-term performance gains across
              industries.
            </p>
          </div>
          {/* Box 3 */}
          <div className="p-6 bg-white bg-opacity-80 rounded-lg shadow-md text-center">
            <h3 className="text-3xl font-bold">10k </h3>
            <p className="text-xl font-bold text-[#084049]">
              Worldwide Recruiter Reach
            </p>
            <p className={`mt-2 text-gray-800 ${nunito.className}`}>
              Our free UI hiring toolkit has been downloaded over 10,000 times
              by recruiters and hiring professionals across the globe. It’s
              proof of our value, innovation, and the trust the industry places
              in our solutions.
            </p>
          </div>
        </div>
      </div>
      {/* Our values section */}
      <div className="my-12">
        {/* text-contents */}
        <SectionTitle
          title={"Our Values"}
          subtitle={
            "We don’t just connect people to jobs — we craft futures. Our approach is personal, precise, and performance-driven. When you work with us, you feel the difference."
          }
        />

        <FeaturesGrid />
      </div>

      {/* section -3 */}
      <div className="mb-12">
        {/* text-contents-div */}
        <div className="text-center my-10">
          <h2 className="text-sm md:text-xl lg:text-xl font-semibold text-purple-600 my-4">
            We Are Hiring!{" "}
          </h2>
          <SectionTitle
            title={"Meet Our Team"}
            subtitle={
              "Our Philosophy is simple hire a team of diverse, passionate people  and foster a culture that empowers you do your best work."
            }
          />
        </div>
        {/* contents-section */}
        <TeamCard />
      </div>

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
              rel="noopener noreferrer"
            >
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
