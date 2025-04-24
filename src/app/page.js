// import Image from "next/image";
"use client";

import { ToastContainer } from "react-toastify";
import Accordion from "./components/LandingPageComponents/Accordion";
import Banner from "./components/LandingPageComponents/Banner";
import CareerMove from "./components/LandingPageComponents/CareerMove";
import ConsultingSolutions from "./components/LandingPageComponents/ConsultingSolutions";
import FindJob from "./components/LandingPageComponents/FindJob";
import FindTalent from "./components/LandingPageComponents/FindTalent";
import GeminiComponent from "./components/LandingPageComponents/GeminiComponent";
import SeekKit from "./components/LandingPageComponents/SeekKit";
import Testimonials from "./components/LandingPageComponents/Testimonials";
import TrendsCarousel from "./components/LandingPageComponents/TrendsCarousel";
import ScheduleForm from "./components/scheduleInterview/ScheduleForm";
import ScheduleList from "./components/scheduleInterview/ScheduleList";

// import Chat from "./chatbox/components/chat";
// import ChatPage from "./chatbox/components/ChatPage";

export default function Home() {
  return (
    <div className="space-y-8 lg:space-y-12 w-full">
      <Banner></Banner>
      <br />
      <section className="max-w-7xl mx-auto w-11/12 space-y-8 md:space-y-12">
        <TrendsCarousel />
        <FindJob></FindJob>
        <GeminiComponent></GeminiComponent>
        <SeekKit />
        <FindTalent />
        <ConsultingSolutions />
        <CareerMove />
        <Testimonials />
        <Accordion />
        <ScheduleForm></ScheduleForm>
        <ScheduleList></ScheduleList>
      </section>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
