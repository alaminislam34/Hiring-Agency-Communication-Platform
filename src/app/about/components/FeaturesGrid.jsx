"use client";
import { FaRegMessage, FaConnectdevelop, FaPeopleLine } from "react-icons/fa6";
import { SlEnergy } from "react-icons/sl";
import { MdOutlineManageHistory } from "react-icons/md";
import { RiChatSmileAiLine } from "react-icons/ri";

export const FeatureCard = ({ Icon, title, description }) => {
  return (
    <div className="text-center rounded-2xl shadow-xl shadow-black/20 hover:shadow-black/40 hover:scale-105 transition duration-300 p-4 hover:-translate-y-3">
      <div className="flex justify-center items-center m-2">
        <Icon className="text-4xl" />
      </div>
      <p className="text-xl font-bold">{title}</p>
      <p className="text-center m-4">{description}</p>
    </div>
  );
};

const FeaturesGrid = () => {
  const features = [
    {
      Icon: FaRegMessage,
      title: "Streamline Candidate Communication",
      description:
        "Whether your team is small or scaling, our shared inboxes ensure every recruiter stays aligned. No missed emails, no confusion — just smooth collaboration and faster placements.",
    },
    {
      Icon: SlEnergy,
      title: "Respond Faster to Top Talent",
      description:
        "Speed is key in recruitment. Our system empowers you to deliver prompt, professional responses to candidates — helping you secure top talent before the competition does.",
    },
    {
      Icon: MdOutlineManageHistory,
      title: "Track Hiring with Actionable Reports",
      description:
        "Stay in control of your recruitment funnel. With real-time reports and insights, you can monitor progress, measure recruiter performance, and refine your hiring strategy.",
    },
    {
      Icon: RiChatSmileAiLine,
      title: "Build Stronger Candidate Relationships",
      description:
        "We help you stay connected with applicants through timely updates and personalized interactions — turning every application into a relationship and every touchpoint into trust.",
    },
    {
      Icon: FaConnectdevelop,
      title: "Integrate with Your Existing Tools",
      description:
        "Use what you love. Our platform integrates seamlessly with your ATS, calendars, and communication tools — so your team can recruit smarter, not harder.",
    },
    {
      Icon: FaPeopleLine,
      title: "Driven by People, Powered by Purpose",
      description:
        "At the heart of everything we do is people. We believe in hiring with intention — helping businesses grow and individuals thrive through meaningful career connections.",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 mt-8">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          Icon={feature.Icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
};

export default FeaturesGrid;
