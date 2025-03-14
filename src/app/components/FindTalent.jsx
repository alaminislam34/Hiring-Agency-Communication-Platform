
import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function FindTalent() {
  return (
    <div className="flex items-center justify-center bg-gray-100 px-6 my-12 ">
      <div className="bg-white shadow-lg rounded-xl flex items-center  p-8 gap-10">
        
          <Image
            src="/talent-1.webp" 
            alt="Team working"
            width={500}
            height={400}
            className="rounded-lg shadow-md"
          />

        
        <div className="w-1/2">
          <h2 className="text-3xl font-semibold text-gray-900 leading-snug">
            Find talent to get more done
          </h2>
          <ul className="mt-4 space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
              <span>Access Robert Half’s large network of in-demand candidates for contract and permanent roles</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
              <span>Quickly match to professionals who have the right skills and industry experience</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
              <span>Let us recruit qualified candidates for you at every level from office support to C-suite</span>
            </li>
          </ul>

         
          <div className="mt-6 flex gap-4">
            <button className="bg-green-900 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-green-800 transition">
              Find your next hire
            </button>
            <button className="border border-gray-500 text-gray-900 px-6 py-3 rounded-full text-lg font-medium hover:bg-gray-200 transition">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

