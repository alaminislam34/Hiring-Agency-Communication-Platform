import { FaUserGraduate } from "react-icons/fa6";
import { LuMonitorCog } from "react-icons/lu";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { TbDeviceMobileCog } from "react-icons/tb";
import { GrUserWorker } from "react-icons/gr";
import { GrTechnology } from "react-icons/gr";
import { FaMountainCity } from "react-icons/fa6";
import { RiPagesLine } from "react-icons/ri";
const Categories = () => {
  return (
    <div className="py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10">
        Browse Top Categories
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {[
          { icon: <FaUserGraduate />, title: "Design & Creative", count: 699 },
          { icon: <LuMonitorCog />, title: "Design & Development", count: 655 },
          {
            icon: <FaFileInvoiceDollar />,
            title: "Sales & Marketing",
            count: 632,
          },
          {
            icon: <TbDeviceMobileCog />,
            title: "Mobile Application",
            count: 685,
          },
          { icon: <GrUserWorker />, title: "Construction", count: 665 },
          {
            icon: <GrTechnology />,
            title: "Information Technology",
            count: 658,
          },
          { icon: <FaMountainCity />, title: "Real Estate", count: 699 },
          { icon: <RiPagesLine />, title: "Content Writer", count: 685 },
        ].map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center border border-[#d4f5f8] space-y-2 py-12 px-6 rounded-lg transition-all hover:shadow-md hover:shadow-gray-400 hover:-translate-y-1 hover:text-red-500 group"
          >
            <div className="text-6xl font-sm mb-4 text-black transition-colors group-hover:text-red-500">
              <h2>{category.icon}</h2>
            </div>
            <h2 className="text-lg font-sm text-gray-800 transition-colors group-hover:text-red-500">
              {category.title}
            </h2>
            <p className="text-sm text-red-500 mt-1">{`(${category.count})`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
