"use client";
// components/PlatformRelated.jsx
import { UserPlus, FileText, Briefcase, Star } from "lucide-react";

export default function PlatformRelated() {
  return (
    <section className="py-20 bg-gradient-to-br from-teal-50 via-white to-teal-50">
      <div className="px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-teal-600 text-center mb-4">
          Platform Related – How to Maximize JobHive
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Discover how to use JobHive to accelerate your career, post jobs, and
          read success stories.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* How to Get Hired Faster */}
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-teal-500">
            <div className="flex items-center gap-3 mb-4 text-teal-600">
              <UserPlus className="w-6 h-6" />
              <h3 className="text-xl font-semibold">
                How to Use JobHive to Get Hired Faster
              </h3>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Complete your profile with accurate information</li>
              <li>Upload a portfolio or work samples</li>
              <li>Keep your skills and certifications updated</li>
              <li>Actively apply to relevant job listings</li>
              <li>Set up job alerts to receive new openings</li>
            </ul>
          </div>

          {/* Build Your Profile */}
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-teal-500">
            <div className="flex items-center gap-3 mb-4 text-teal-600">
              <FileText className="w-6 h-6" />
              <h3 className="text-xl font-semibold">
                How to Build Your JobHive Profile (Step-by-Step)
              </h3>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Start with a professional headline</li>
              <li>Write a compelling summary showcasing your skills</li>
              <li>Fill in your previous work experience and achievements</li>
              <li>Link your social profiles and portfolio</li>
              <li>Include your top skills and certifications</li>
            </ul>
          </div>

          {/* Post Jobs as Employer */}
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-teal-500">
            <div className="flex items-center gap-3 mb-4 text-teal-600">
              <Briefcase className="w-6 h-6" />
              <h3 className="text-xl font-semibold">
                How Employers Can Post Jobs on JobHive
              </h3>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Create an employer account on JobHive</li>
              <li>Click on "Post a Job" and fill in the required fields</li>
              <li>Specify the job role, skills required, and location</li>
              <li>Review and publish your job posting</li>
              <li>
                Track applicants and manage the hiring process directly from
                your dashboard
              </li>
            </ul>
          </div>

          {/* Success Stories */}
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-teal-500">
            <div className="flex items-center gap-3 mb-4 text-teal-600">
              <Star className="w-6 h-6" />
              <h3 className="text-xl font-semibold">
                Success Stories of JobHive Users
              </h3>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Hear from developers who found jobs within weeks</li>
              <li>Discover how JobHive helped employers hire top talent</li>
              <li>
                Read inspiring success stories from both job seekers and
                employers
              </li>
              <li>
                Learn from their experiences to get hired or hire successfully
              </li>
              <li>
                Join a growing community of professionals leveraging JobHive
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
