"use client";

import dynamic from "next/dynamic";

// Dynamically import components that rely on client-side APIs
const ToastContainer = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  { ssr: false }
);
const Accordion = dynamic(
  () => import("./components/LandingPageComponents/Accordion"),
  { ssr: false }
);
const Banner = dynamic(
  () => import("./components/LandingPageComponents/Banner"),
  { ssr: false }
);
const CareerMove = dynamic(
  () => import("./components/LandingPageComponents/CareerMove"),
  { ssr: false }
);
const ConsultingSolutions = dynamic(
  () => import("./components/LandingPageComponents/ConsultingSolutions"),
  { ssr: false }
);
const TopCategories = dynamic(
  () => import("./components/TopCategories/Categories"),
  { ssr: false }
);
const FindJob = dynamic(
  () => import("./components/LandingPageComponents/FindJob"),
  { ssr: false }
);
const FindTalent = dynamic(
  () => import("./components/LandingPageComponents/FindTalent"),
  { ssr: false }
);
const GeminiComponent = dynamic(
  () => import("./components/LandingPageComponents/GeminiComponent"),
  { ssr: false }
);
const SeekKit = dynamic(
  () => import("./components/LandingPageComponents/SeekKit"),
  { ssr: false }
);
const Testimonials = dynamic(
  () => import("./components/LandingPageComponents/Testimonials"),
  { ssr: false }
);
const TrendsCarousel = dynamic(
  () => import("./components/LandingPageComponents/TrendsCarousel"),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="space-y-8 lg:space-y-12 w-full">
      <Banner />
      <br />
      <section className="max-w-7xl mx-auto w-11/12 space-y-8 md:space-y-12">
        <TopCategories></TopCategories>
        {/* <TrendsCarousel /> */}
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
