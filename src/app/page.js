// import Image from "next/image";

<<<<<<< HEAD
import { ToastContainer } from "react-toastify";
import Chat from "./chatbox/components/chat";
=======
import ChatPage from "./chatbox/components/ChatPage";
>>>>>>> e0c04a75c8d1ce9e948a4d3f6de1d5fa0ef359de
import Accordion from "./components/Accordion";
import Banner from "./components/Banner";
import CareerMove from "./components/CareerMove";
import ConsultingSolutions from "./components/ConsultingSolutions";
import FindJob from "./components/FindJob";
import FindTalent from "./components/FindTalent";
import SeekKit from "./components/SeekKit";
import Testimonials from "./components/Testimonials";
import TrendsCarousel from "./components/TrendsCarousel";

export default async function Home() {
  return (
    <div className="space-y-8 lg:space-y-12 mb-8 lg:mb-12">
      <Banner></Banner>
      <TrendsCarousel />
      <FindJob></FindJob>
      <SeekKit />
      <FindTalent />
      <ConsultingSolutions />
      <CareerMove />
      <Testimonials />
      <Accordion />
<<<<<<< HEAD
      <Chat></Chat>

      <ToastContainer position="top-center" autoClose={3000} />
=======
      <ChatPage></ChatPage>
>>>>>>> e0c04a75c8d1ce9e948a4d3f6de1d5fa0ef359de
    </div>
  );
}
