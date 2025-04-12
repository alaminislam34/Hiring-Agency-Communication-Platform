import Image from "next/image";
import image from "../../../public/image.webp";
import { FaLocationDot, FaSearchengin } from "react-icons/fa6";
export default function FindJob() {
  return (
    <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 w-11/12">
      {/* text  */}
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-950 py-6">
          Find top candidates to  get the job done
        </h2>
        <p className="text-base text-gray-400 font-sm">
          Tell us about your open role, and instantly see highly skilled
          candidates with the in-demand skills and experience you're looking
          for.
        </p>
        {/* input field */}
        <div className="flex flex-col gap-2 mt-12">
          <div className="">
            <h5 className="text-black font-base text-lg">
              I am looking For a{" "}
            </h5>
            <label className="input w-full mt-4">
              <FaSearchengin></FaSearchengin>
              <input type="search" required placeholder="Job title"  className=""/>
            </label>
          </div>
          <div>
            <h5 className="text-black font-base text-lg">Located in</h5>
            <label className="input w-full mt-4">
              <FaLocationDot></FaLocationDot>
              <input type="search" required placeholder="Location" />
            </label>
          </div>
          <button className="px-4 max-w-md lg:max-w-[325px] mt-3  py-2 rounded-lg bg-[#084049] hover:bg-[#02282E] border cursor-pointer text-white">
            Preview Candidates
          </button>
        </div>
      </div>

      {/* image */}
      <div>
        <Image src={image} alt="image"></Image>
      </div>
    </div>
  );
}
