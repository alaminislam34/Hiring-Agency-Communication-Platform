"use client";

import ContactForm from "./components/ContactForm";
import FAQSection from "./components/FAQSection";
import GoogleMapComponent from "./components/GoogleMap";
import TeamMembers from "./components/TeamMembers";

const ContactUsPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 space-y-6">
      <div
        className="min-h-[400px] bg-cover bg-center rounded-lg flex items-center justify-center relative"
        style={{
          backgroundImage: "url('/contactUs.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
        <div className="flex items-center justify-center z-10">
          <h1 className="text-teal-400 text-xl md:text-2xl lg:text-4xl font-semibold border-b-2 py-2">
            Contact Us
          </h1>
        </div>
      </div>
      <section className="max-w-7xl mx-auto w-11/12 space-y-6">
        <div>
          <TeamMembers />
        </div>
        <div>
          <GoogleMapComponent />
        </div>
        <div>
          <FAQSection />
        </div>
        <div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;
