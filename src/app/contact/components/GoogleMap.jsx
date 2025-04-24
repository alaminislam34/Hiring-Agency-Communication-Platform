"use client";

import React from "react";

const GoogleMapComponent = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-teal-700 mb-6 text-center">
          Our Office Location
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side: Office Info */}
          <div>
            <p className="text-gray-600 mb-4">
              You're always welcome to visit us at our physical office. Here's
              where we’re located and when we’re available:
            </p>

            <div className="space-y-4 text-sm text-teal-800">
              <div>
                <strong>📍 Address:</strong>
                <p>House #10, Road #2, Mirpur 10, Dhaka, Bangladesh</p>
              </div>
              <div>
                <strong>🕒 Office Hours:</strong>
                <p>Sunday to Thursday, 9:00 AM - 6:00 PM</p>
              </div>
              <div>
                <strong>📞 Phone:</strong>
                <p>+880 1234-567890</p>
              </div>
              <div>
                <strong>📧 Email:</strong>
                <p>support@yourwebsite.com</p>
              </div>
            </div>
          </div>

          {/* Right Side: Google Map */}
          <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-md border border-teal-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8999948749774!2d90.391466214323!3d23.75087629474524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b895dccc15cb%3A0x3f715de3a4e01294!2sMirpur%2010%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1713872269937!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleMapComponent;
