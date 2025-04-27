"use client";

const JobDetailsForm = ({ formData, setFormData, nextStep }) => {
  const jobCategories = {
    "IT and Developer": [
      // Programming Languages
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "Python",
      "Java",
      "C",
      "C++",
      "C#",
      "PHP",
      "Ruby",
      "Swift",
      "Kotlin",
      "Go",
      "Rust",
      // Frontend Libraries & Frameworks
      "React.js",
      "Vue.js",
      "Svelte",
      "Next.js",
      "Gatsby.js",
      "Nuxt.js",
      "Remix",
      // CSS Frameworks
      "Tailwind CSS",
      "Bootstrap",
      "Materialize CSS",
      "Bulma",
      // Backend Development
      "Node.js",
      "Express.js",
      "Django",
      "Flask",
      "Ruby on Rails",
      "Laravel",
      "Spring Boot",
      // Mobile Development
      "React Native",
      "Flutter",
      "Ionic",
      // Databases
      "MongoDB",
      "MySQL",
      "PostgreSQL",
      "SQLite",
      "Firebase",
      "Redis",
      // API
      "GraphQL",
      "REST API",
      "tRPC",
      // Tools
      "Redux",
      "React Query",
      "Zustand",
      "Prisma ORM",
      "Framer Motion",
      "Three.js",
      "Socket.IO",
      "Axios",
      "Vercel",
      "Netlify",
      "AWS",
      "Firebase Hosting",
      "Render",
    ],
    Designer: [
      "Photoshop",
      "Illustrator",
      "Figma",
      "UI/UX Design",
      "Canva",
      "Adobe XD",
      "Sketch",
    ],
    Marketing: [
      "SEO",
      "Content Writing",
      "Social Media Marketing",
      "Email Marketing",
      "Google Ads",
      "Facebook Ads",
      "Affiliate Marketing",
    ],
    Business: [
      "Sales",
      "Finance",
      "Consulting",
      "Business Strategy",
      "Project Management",
      "Customer Support",
      "HR Management",
    ],
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setFormData({ ...formData, category, skills: [] });
  };

  const handleSkillSelect = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Job Details</h2>
      {/* Job Title and Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Job Title"
          className="w-full border px-4 py-2 rounded border-gray-400 focus:outline-teal-500"
          required
        />

        {/* Job Category */}
        <select
          name="category"
          value={formData.category}
          onChange={handleCategoryChange}
          className="w-full border px-4 py-2 rounded border-gray-400 focus:outline-teal-500"
          required
        >
          <option value="">Select Job Category</option>
          {Object.keys(jobCategories).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      {/* Skill Suggestions */}
      {formData.category && (
        <div className="flex flex-wrap gap-2">
          {jobCategories[formData.category].map((skill) => (
            <button
              type="button"
              key={skill}
              onClick={() => handleSkillSelect(skill)}
              className={`px-1.5 py-0.5 rounded-full border text-xs cursor-pointer ${
                formData.skills.includes(skill)
                  ? "bg-teal-500 text-white"
                  : "bg-white"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Job Type */}
        <select
          name="type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full border px-4 py-2 rounded border-gray-400 focus:outline-teal-500"
          required
        >
          <option value="">Select Job Type</option>
          <option value="Full Time">Full Time</option>
          <option value="Contract">Contract</option>
          <option value="On Site">On Site</option>
          <option value="Part Time">Part Time</option>
          <option value="Remote">Remote</option>
          <option value="Freelance">Freelance</option>
          <option value="Volunteer">Volunteer</option>
          <option value="Temporary">Temporary</option>
          <option value="Internship">Internship</option>
          <option value="Seasonal">Seasonal</option>
        </select>

        {/* Salary Min - Max */}
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min Salary"
            value={formData.minSalary}
            onChange={(e) =>
              setFormData({ ...formData, minSalary: e.target.value })
            }
            className="w-1/2 border px-4 py-2 rounded border-gray-400 focus:outline-teal-500"
            required
          />
          <input
            type="number"
            placeholder="Max Salary"
            value={formData.maxSalary}
            onChange={(e) =>
              setFormData({ ...formData, maxSalary: e.target.value })
            }
            className="w-1/2 border px-4 py-2 rounded border-gray-400 focus:outline-teal-500"
            required
          />
        </div>
      </div>
      {/* Location */}
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        placeholder="Location"
        className="w-full border px-4 py-2 rounded border-gray-400 focus:outline-teal-500"
        required
      />

      {/* Button */}
      <button
        type="button"
        onClick={nextStep}
        className="px-6 py-2 bg-teal-500 text-white rounded"
      >
        Next
      </button>
    </div>
  );
};

export default JobDetailsForm;
