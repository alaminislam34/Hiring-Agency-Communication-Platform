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
import Categories from "./components/TopCategories/Categories";

export default function Home() {
  return (
    <div className="space-y-8 lg:space-y-12 w-full">
      <Banner />
      <br />
      <section className="max-w-7xl mx-auto w-11/12 space-y-8 md:space-y-12">
        <Categories />
        <TrendsCarousel />
        <FindJob />
        <GeminiComponent />
        <SeekKit />
        <FindTalent />
        <ConsultingSolutions />
        <CareerMove />
        <Testimonials />
        <Accordion />
      </section>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
