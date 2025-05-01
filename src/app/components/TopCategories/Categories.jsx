import { FaUserGraduate } from "react-icons/fa6";
import { LuMonitorCog } from "react-icons/lu";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { TbDeviceMobileCog } from "react-icons/tb";
import { GrUserWorker } from "react-icons/gr";
import { GrTechnology } from "react-icons/gr";
import { FaMountainCity } from "react-icons/fa6";
import { RiPagesLine } from "react-icons/ri";
import SectionTitle from "../SharedComponents/SectionTitle";
import { useAppContext } from "@/Providers/AppProviders";
import { ChartNetwork } from "lucide-react";
import { CodeXml } from "lucide-react";
import { Palette } from "lucide-react";
const Categories = () => {
  const { jobs } = useAppContext();
  const uniqueJobCategory = Array.from(
    new Set(jobs?.map((job) => job.category))
  );
  const categoryJobsCount = uniqueJobCategory?.map(
    (cate) => jobs?.filter((job) => job.category === cate)?.length || 0
  );
  [
    "Software Engineering",
    "UI/UX & Product Design",
    "Digital Marketing & SEO",
    "Mobile App Development",
    "Web Development & Frontend",
    "Sales & Business Development",
    "Data Analytics & AI",
    "Content Creation & Copywriting",

    // "Accounting & Financial Analysis",
    // "Customer Success & Support",
    // "Business Strategy & Consulting",
    // "HR & Talent Acquisition",
    // "Video Production & Animation",
    // "Project & Product Management",
    // "Mechanical & Civil Engineering",
  ];

  return (
    <div className="py-10 px-4">
      <SectionTitle title={"Browse Top Categories"} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pt-4 md:pt-6">
        {[
          {
            icon: <FaUserGraduate />,
            title: "Software Engineering",
            count: 699,
          },
          {
            icon: <Palette size={56} />,
            title: "UI/UX & Product Design",
            count: 655,
          },
          {
            icon: <FaFileInvoiceDollar />,
            title: "Digital Marketing & SEO",
            count: 632,
          },
          {
            icon: <TbDeviceMobileCog />,
            title: "Mobile App Development",
            count: 685,
          },

          {
            icon: <ChartNetwork size={56} />,
            title: "Data Analytics & AI",
            count: 699,
          },
          {
            icon: <RiPagesLine />,
            title: "Content Creation & Copywriting",
            count: 685,
          },
        ].map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center border border-[#d4f5f8] space-y-2 p-4 rounded-xl transition-all hover:shadow-md hover:shadow-gray-400 hover:-translate-y-1 h-40 duration-300 hover:text-red-500 group"
          >
            <div className="text-6xl font-sm mb-4 text-black transition-colors group-hover:text-teal-500">
              <h2>{category.icon}</h2>
            </div>
            <h2 className="text-lg font-sm text-center text-gray-800 transition-colors group-hover:text-teal-500">
              {category.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
