"use client";

import { Globe } from "lucide-react";
import Link from "next/link";
import { IoBrowsers } from "react-icons/io5";
import { LuLinkedin, LuTwitter } from "react-icons/lu";

const teamMembers = [
  {
    imgSrc: "/teamImg/alamin2.jpg",
    name: "MD Al-Amin Islam",
    title: "Founder and CEO",
    description:
      "Former co-founder of job-hive. Early staff at Spotify and Clearbit",
    twitter: "https://x.com/MDAlAmin0412",
    linkedin: "https://www.linkedin.com/in/alamin34/",
    portfolio: "https://alamin4.netlify.app/",
  },
  {
    imgSrc: "/teamImg/akash.PNG",
    name: "Akash Muhammad Abrrar",
    title: "Engineering Manager",
    description: "Lead engineering teams at Figma, Pitch, and Protocol Labs.",
    twitter: "https://x.com/akash_madbor9",
    linkedin: "https://www.linkedin.com/in/akash-muhammad-abrrar-764275228/",
    portfolio: "https://akashmabrrarnxtportfolio.netlify.app/",
  },
  {
    imgSrc: "/teamImg/rony.jpeg",
    name: "MD Rokonujjaman Rony",
    title: "Product Manager",
    description:
      "Former PM for Linear, Lambda School, and On Deck. Currently working on End-Game Project",
    twitter: "https://x.com/RoknujjamanRon2",
    linkedin: "https://www.linkedin.com/in/md-roknujjaman-rony-906780210/",
    portfolio: "https://courageous-llama-711917.netlify.app/",
  },
  {
    imgSrc: "/teamImg/rakib.jpg",
    name: "Rakib Gazi",
    title: "Frontend Developer",
    description:
      "Former frontend dev for Linear, Coinbase, and JavaScript. End-game developer.",
    twitter: "/#",
    linkedin: "https://www.linkedin.com/in/mohammed-rakib-gazi/",
    portfolio: "https://rakibgazi.netlify.app/",
  },
  {
    imgSrc: "/teamImg/mahedi.jpg",
    name: "Alvee Hasan",
    title: "Backend Developer",
    description:
      "Lead backend dev at Clearbit. Former Clearbit and NodeJs, now working on End-Game Project",
    twitter: "https://x.com/Dev_Hasan1",
    linkedin: "https://www.linkedin.com/in/web-developer-mehedihasan/",
    portfolio: "https://portfolio-gules-beta-59.vercel.app/",
  },
  {
    imgSrc: "fakeUser.jpg",
    name: "John Doe",
    title: "Product Manager",
    description:
      "Founding design team at Figma. Former Pelo, Stripe, and Tile, now he's disappeared.",
    twitter: "/#",
    linkedin: "/#",
    portfolio: "/#",
  },
];
const TeamCard = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map(
          (
            { imgSrc, name, title, description, twitter, linkedin, portfolio },
            index
          ) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg shadow-md hover:shadow-lg cursor-pointer border border-transparent hover:border-teal-500 p-6"
            >
              <Link
                href={{ pathname: "/about/name/", query: { name } }}
                className="inline-block flex-col justify-between "
              >
                <div>
                  <div className="w-28 h-28 border border-teal-500 bg-gray-300 rounded-full mx-auto mb-4 flex justify-center items-center overflow-hidden">
                    <img
                      className="object-cover bg-cover bg-center w-full h-full"
                      src={imgSrc || 'https:c.b'}
                      alt="Team member"
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-center">
                    {name}
                  </h3>
                  <p className="text-sm md:text-base text-center text-teal-600">
                    {title}
                  </p>
                  <p className="text-sm text-gray-600 text-center">
                    {description}
                  </p>
                </div>
              </Link>

              {/* Social Links moved outside Link */}
              <div className="flex justify-center items-center gap-4 w-full rounded-2xl mt-4">
                <a
                  href={twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 duration-300 rounded-full overflow-hidden flex items-center justify-center text-lg p-2 border border-teal-500 text-teal-600 hover:border-transparent hover:bg-teal-500 hover:text-white"
                >
                  <LuTwitter />
                </a>
                <a
                  href={portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 duration-300 rounded-full overflow-hidden flex items-center justify-center text-lg p-2 border border-teal-500 text-teal-600 hover:border-transparent hover:bg-teal-500 hover:text-white"
                >
                  <Globe />
                </a>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 duration-300 rounded-full overflow-hidden flex items-center justify-center text-lg p-2 border border-teal-500 text-teal-600 hover:border-transparent hover:bg-teal-500 hover:text-white"
                >
                  <LuLinkedin />
                </a>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TeamCard;
