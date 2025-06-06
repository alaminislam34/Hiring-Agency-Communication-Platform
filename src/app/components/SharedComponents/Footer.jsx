"use client";

import { Facebook, Linkedin } from "lucide-react";
import Link from "next/link";
import { FaGoogle, FaGooglePlay, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-base-300 text-[#333] pt-6 md:pt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 pb-6">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Link href="/">
              <img src="/JobHive.png" alt="logo" className="h-12" />
            </Link>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            JobHive is the heart of the design community and the best resource
            to discover and connect with designers and jobs worldwide.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5">
            <button className="btn btn-circle btn-sm bg-[#F2F4F7] hover:bg-teal-500 text-teal-500 hover:text-white">
              <Facebook size={18} />
            </button>
            <button className="btn btn-circle text-lg btn-sm bg-[#F2F4F7] hover:bg-teal-500 text-teal-500 hover:text-white">
              <FaXTwitter />
            </button>
            <button className="btn btn-circle btn-sm bg-[#F2F4F7] hover:bg-teal-500 text-teal-500 hover:text-white">
              <Linkedin size={18} />
            </button>
          </div>
        </div>

        {/* Resources */}
        <div>
          <h5 className="font-semibold mb-4">Resources</h5>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>
              <a href="#" className="hover:text-teal-500">
                About us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-teal-500">
                Our Team
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-teal-500">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-teal-500">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h5 className="font-semibold mb-4">Community</h5>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>
              <a href="#" className="hover:text-teal-500">
                Feature
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-teal-500">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-teal-500">
                Credit
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-teal-500">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="font-semibold mb-4">Quick links</h5>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>
              <a href="#" className="hover:text-teal-500">
                iOS
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-teal-500">
                Android
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-teal-500">
                Microsoft
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-teal-500">
                Desktop
              </a>
            </li>
          </ul>
        </div>

        {/* Download App */}
        <div>
          <h5 className="font-semibold mb-4">Download App</h5>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            Download our Apps and get extra 15% Discount on your first Order…!
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex justify-start">
              <a
                href="#"
                className="bg-teal-600 text-white hover:bg-teal-700 duration-300 flex flex-row gap-2 items-center py-2 px-4 border border-teal-500 rounded-lg"
              >
                <span>
                  <FaGooglePlay />
                </span>
                <div className="text-sm">
                  <span className="text-xs">Download on the</span> <br />
                  <span className="font-semibold">App Store</span>
                </div>
              </a>
            </div>
            <div className="flex justify-start">
              <a
                href="#"
                className="bg-teal-600 text-white hover:bg-teal-700 duration-300 flex flex-row gap-2 items-center py-2 px-4 border border-teal-500 rounded-lg"
              >
                <span>
                  <FaGoogle />
                </span>
                <div className="text-sm">
                  <span className="text-xs">Download on the</span> <br />
                  <span className="font-semibold">Google Store</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-300 py-6 ">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>Copyright © 2022. JobBox all right reserved</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-teal-500">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-teal-500">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-teal-500">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
