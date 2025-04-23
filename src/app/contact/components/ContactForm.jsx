"use client";

import FeedbackRating from "./FeedBackRating";

const ContactForm = () => {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-teal-700 mb-2">
            Get in Touch
          </h2>
          <p className="text-gray-600">
            If you have any questions or need help, feel free to contact us.
          </p>
        </div>

        <div className="bg-teal-50 rounded-2xl shadow-lg p-6 sm:p-10 transition duration-300">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-teal-800 mb-1"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-teal-800 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-semibold text-teal-800 mb-1"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Subject of your message"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-teal-800 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                className="w-full px-4 py-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
                placeholder="Type your message here..."
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-teal-600 text-white font-medium px-8 py-3 rounded-lg hover:bg-teal-700 transition-all duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
        <div>
          <FeedbackRating />
        </div>

        <div className="mt-10 text-sm text-gray-600 text-center">
          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:alaminislam43.bd@gmail.com"
              className="underline hover:text-teal-600"
            >
              alaminislam43.bd@gmail.com
            </a>
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            <a
              href="tel:+8801234567890"
              className="underline hover:text-teal-600"
            >
              +880 18 2185 8917
            </a>
          </p>
          <p>
            <strong>Working Hours:</strong> Sun - Thu, 9:00AM - 6:00PM
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
