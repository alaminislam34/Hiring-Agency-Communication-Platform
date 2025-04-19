"use client";
// components/SkillDevelopment.jsx

import { BookOpenCheck, Github, Workflow, Layers } from "lucide-react";

export default function SkillDevelopment() {
  return (
    <section className="py-20 bg-gradient-to-bl from-white via-teal-50 to-white">
      <div className="px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-teal-600 text-center mb-4">
          Skill Development
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Build the skills that matter most in the job market. Learn, grow, and
          stand out as a developer in 2025 and beyond.
        </p>

        {/* Grid Section */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* In-demand skills */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-teal-500">
            <div className="flex items-center gap-3 mb-4 text-teal-600">
              <Layers className="w-6 h-6" />
              <h3 className="text-xl font-semibold">
                Top 5 In-Demand Skills in 2025
              </h3>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>JavaScript & Frameworks (React, Next.js)</li>
              <li>Cloud Computing (AWS, Azure)</li>
              <li>AI & Machine Learning</li>
              <li>DevOps & CI/CD Pipelines</li>
              <li>Cybersecurity Fundamentals</li>
            </ul>
          </div>

          {/* Online resources */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-teal-500">
            <div className="flex items-center gap-3 mb-4 text-teal-600">
              <BookOpenCheck className="w-6 h-6" />
              <h3 className="text-xl font-semibold">
                Best Online Resources to Learn Web Development
              </h3>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>freeCodeCamp</li>
              <li>MDN Web Docs</li>
              <li>JavaScript.info</li>
              <li>Frontend Masters</li>
              <li>CS50 by Harvard (free)</li>
            </ul>
          </div>

          {/* GitHub Profile Tips */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-teal-500">
            <div className="flex items-center gap-3 mb-4 text-teal-600">
              <Github className="w-6 h-6" />
              <h3 className="text-xl font-semibold">
                How to Build a Strong GitHub Profile
              </h3>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Contribute to open-source regularly</li>
              <li>Write clean and documented code</li>
              <li>Create and pin meaningful projects</li>
              <li>Maintain an active commit history</li>
              <li>Engage in GitHub Discussions and PRs</li>
            </ul>
          </div>

          {/* Roadmap */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-teal-500">
            <div className="flex items-center gap-3 mb-4 text-teal-600">
              <Workflow className="w-6 h-6" />
              <h3 className="text-xl font-semibold">
                Learning Roadmap: Frontend, Backend, Fullstack
              </h3>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                <span className="font-medium text-teal-600">Frontend:</span>{" "}
                HTML, CSS, JS, React, Tailwind, Next.js
              </li>
              <li>
                <span className="font-medium text-teal-600">Backend:</span>{" "}
                Node.js, Express, MongoDB, REST APIs
              </li>
              <li>
                <span className="font-medium text-teal-600">Fullstack:</span>{" "}
                MERN stack, JWT Auth, Deployment (Vercel, Netlify, Render)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
