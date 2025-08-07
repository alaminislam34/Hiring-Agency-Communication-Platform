import Image from "next/image";
import cv from "../../../../public/cvTemplate.png";
import coverLetter from "../../../../public/coverLetter.png";
import interview from "../../../../public/interview.png";
import resignationL from "../../../../public/resignationL.png";
import notification from "../../../../public/notification.png";
import Link from "next/link";
import SectionTitle from "../SharedComponents/SectionTitle";

const SeekKit = () => {
  return (
    <div className="">
      {/* section title */}
      <SectionTitle title={"Job seeker tool kit."} />
      {/* section description */}
      <p className="max-w-2xl mx-auto text-center">
        If you’re considering changing jobs or switching careers but don’t know
        where to start, visit our Job Resource Centre or explore some of our
        essential job-seeking tools below.
      </p>
      {/* cv, cover letter, resignation letter or interview guide template */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 mt-8 lg:mt-12">
        <Link
          href={
            "https://drive.google.com/file/d/1EiWWwW5o5C0eTdt8q26wezTOiEzGW7SV/view?usp=sharing"
          }
          className="flex flex-col items-center justify-start gap-4 px-4 py-6 rounded-md bg-white hover:-translate-y-2 duration-300 cursor-pointer text-center hover:shadow-[0px_0px_25px_0px_rgb(0,0,0,0.3)] shadow-[0px_0px_20px_0px_rgb(0,0,0,0.2)]"
        >
          <div className="p-3 rounded-full border-4 border-teal-400">
            <Image src={cv} alt="CV Template" width={50} height={50} />
          </div>
          <div>
            <p className="text-lg text-teal-950 md:text-xl lg:text-2xl font-semibold">
              CV Template
            </p>
          </div>
        </Link>
        <Link
          href={
            "https://drive.google.com/file/d/1HoFlIpyR2b8xgGOeDqpD2-_Lpwmu_bJJ/view?usp=sharing"
          }
          className="flex flex-col items-center justify-start gap-4 px-4 py-6 rounded-md bg-white hover:-translate-y-2 duration-300 cursor-pointer text-center hover:shadow-[0px_0px_25px_0px_rgb(0,0,0,0.3)] shadow-[0px_0px_20px_0px_rgb(0,0,0,0.2)]"
        >
          <div className="p-3 rounded-full border-4 border-teal-400">
            <Image src={coverLetter} alt="CV Template" width={50} height={50} />
          </div>
          <div>
            <p className="text-lg text-teal-950 md:text-xl lg:text-2xl font-semibold">
              Cover Letter Template
            </p>
          </div>
        </Link>
        <Link
          href={
            "https://drive.google.com/file/d/1vs5ScG_Eqxxq2sVy6lBco2VRr7UaM4ZT/view?usp=sharing"
          }
          className="flex flex-col items-center justify-start gap-4 px-4 py-6 rounded-md bg-white hover:-translate-y-2 duration-300 cursor-pointer text-center hover:shadow-[0px_0px_25px_0px_rgb(0,0,0,0.3)] shadow-[0px_0px_20px_0px_rgb(0,0,0,0.2)]"
        >
          <div className="p-3 rounded-full border-4 border-teal-400">
            <Image
              src={resignationL}
              alt="CV Template"
              width={50}
              height={50}
            />
          </div>
          <div>
            <p className="text-lg text-teal-950 md:text-xl lg:text-2xl font-semibold">
              Resignation Letter Template
            </p>
          </div>
        </Link>
        <Link
          href={
            "https://drive.google.com/file/d/1Gm28igpIkwlvgezOl8P9r86WSjA2ofmP/view?usp=sharing"
          }
          className="flex flex-col items-center justify-start gap-4 px-4 py-6 rounded-md bg-white hover:-translate-y-2 duration-300 cursor-pointer text-center hover:shadow-[0px_0px_25px_0px_rgb(0,0,0,0.3)] shadow-[0px_0px_20px_0px_rgb(0,0,0,0.2)]"
        >
          <div className="p-3 rounded-full border-4 border-teal-400">
            <Image src={interview} alt="CV Template" width={50} height={50} />
          </div>
          <div>
            <p className="text-lg text-teal-950 md:text-xl lg:text-2xl font-semibold">
              Interview Guide Template
            </p>
          </div>
        </Link>
        <div className="flex flex-col items-center justify-start gap-4 px-4 py-6 rounded-md bg-white hover:-translate-y-2 duration-300 cursor-pointer text-center hover:shadow-[0px_0px_25px_0px_rgb(0,0,0,0.3)] shadow-[0px_0px_20px_0px_rgb(0,0,0,0.2)]">
          <div className="p-3 rounded-full border-4 border-teal-400">
            <Image
              src={notification}
              alt="CV Template"
              width={50}
              height={50}
            />
          </div>
          <div>
            <p className="text-lg text-teal-950 md:text-xl lg:text-2xl font-semibold">
              Sign up for alerts
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-8 lg:mt-12">
        {/* This is a tool kit explore button */}
        <Link
          href={"/jobtoolkit"}
          className="py-2 px-4 rounded-full bg-teal-500 hover:bg-teal-600 text-white duration-300 cursor-pointer"
        >
          Explore our tool kit
        </Link>
      </div>
    </div>
  );
};

export default SeekKit;
