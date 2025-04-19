"use client";
// components/PortfolioBranding.jsx
import { Briefcase, UserCircle2, Linkedin } from "lucide-react";

export default function PortfolioBranding() {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-teal-50 to-white">
      <div className="px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-teal-600 text-center mb-4">
          Portfolio & Personal Branding
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Stand out in the job market with a powerful personal brand and a
          professional online presence.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Portfolio Section */}
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-teal-500">
            <div className="flex items-center gap-3 mb-4 text-teal-600">
              <Briefcase className="w-6 h-6" />
              <h3 className="text-xl font-semibold">
                How to Build a Portfolio that Gets Noticed
              </h3>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Showcase 3–5 real-world projects</li>
              <li>Highlight skills & technologies used</li>
              <li>Make it responsive and fast-loading</li>
              <li>Include a contact form or CTA</li>
              <li>Write short, clear project descriptions</li>
            </ul>
          </div>

          {/* Personal Branding Tips */}
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-teal-500">
            <div className="flex items-center gap-3 mb-4 text-teal-600">
              <UserCircle2 className="w-6 h-6" />
              <h3 className="text-xl font-semibold">
                Personal Branding Tips for Job Seekers
              </h3>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Create a consistent developer identity</li>
              <li>Use the same photo, username, and tagline</li>
              <li>Share your learning journey publicly</li>
              <li>Engage in communities like GitHub & Dev.to</li>
              <li>Stay active on platforms relevant to tech</li>
            </ul>
          </div>

          {/* LinkedIn Optimization */}
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-teal-500">
            <div className="flex items-center gap-3 mb-4 text-teal-600">
              <Linkedin className="w-6 h-6" />
              <h3 className="text-xl font-semibold">
                LinkedIn Optimization Tips for Developers
              </h3>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Write a powerful headline & summary</li>
              <li>List your tech skills & certifications</li>
              <li>Post content consistently (projects, blogs)</li>
              <li>Ask for recommendations from peers</li>
              <li>Enable "Open to Work" feature</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
