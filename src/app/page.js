// import Image from "next/image";

// import Chat from "./chatbox/components/chat";
// import ChatPage from "./chatbox/components/ChatPage";
import { ToastContainer } from "react-toastify";
import Accordion from "./components/Accordion";
import Banner from "./components/Banner";
import CareerMove from "./components/CareerMove";
import ConsultingSolutions from "./components/ConsultingSolutions";
import FindJob from "./components/FindJob";
import FindTalent from "./components/FindTalent";
import SeekKit from "./components/SeekKit";
import Testimonials from "./components/Testimonials";
import TrendsCarousel from "./components/TrendsCarousel";
import GeminiComponent from "./components/GeminiComponent";
import ZegoHome from "./components/zegoBoom/ZegoHome";

export default async function Home() {
  return (
    <div className="space-y-8 lg:space-y-12 mb-8 lg:mb-12 w-full">
      <Banner></Banner>
      <TrendsCarousel />
      <FindJob></FindJob>
      <div className="">
        <GeminiComponent></GeminiComponent>
      </div>
      <SeekKit />
      <FindTalent />
      <ConsultingSolutions />
      <CareerMove />
      <Testimonials />
      <Accordion />
      <ZegoHome></ZegoHome>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
