"use client";
import React from "react";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { LiaReadme } from "react-icons/lia";

import CareerTips from "./components/CareerTips";
import InterviewPrep from "./components/InterviewTips";
import FreelancingRemote from "./components/FreelancingRemote";
import SkillDevelopment from "./components/SkillDevelopment";
import PortfolioBranding from "./components/PortfolioBranding";
import PlatformRelated from "./components/PlatformRelated";
import SectionTitle from "../components/SharedComponents/SectionTitle";
const page = () => {
  return (
    <div className="mt-8 max-w-7xl mx-auto">
      <CareerTips />
      <InterviewPrep />
      <FreelancingRemote />
      <SkillDevelopment />
      <PortfolioBranding />
      <PlatformRelated />

      <div className="mt-8">
        <div className="max-w-7xl w-11/12 mx-auto mt-8 md:mt-16">
          {/* Our Services */}
          <div className="mt-8">
            <SectionTitle title={"Our Services"} />
            {/* Image Container */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 my-5">
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
        </div>
      </div>
    </div>
  );
};

export default page;
