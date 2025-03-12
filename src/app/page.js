import Image from "next/image";
import JobCandidate from "./components/JobCandidate";
import Alamin from "./components/Alamin";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl lg:text-5xl text-center py-6 font-bold">
        JobHive Agency
      </h1>
      <div className=" space-x-4">
        <button className="px-4 py-2 rounded-lg bg-[#E52020] hover:bg-[#A60029] border cursor-pointer text-white">
          Button Color
        </button>
        <button className="px-4 py-2 rounded-lg bg-[#084049] hover:bg-[#02282E] border cursor-pointer text-white">
          Button Color
        </button>
        <button className="px-4 py-2 rounded-lg bg-[#084049]/50 hover:bg-transparent border cursor-pointer hover:text-[#02282E]">
          Button Color
        </button>
      </div>
      <Alamin />
    </div>
  );
}
