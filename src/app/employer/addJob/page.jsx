"use client";

import { useState } from "react";
// import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "@/Providers/AppProviders";

const categories = [
  "IT and Developer",
  "Designer",
  "Marketing",
  "Business",
  "Mobile and Web Dev",
  "Finance",
  "Sales",
  "Customer Support",
  "Human Resources (HR)",
  "Data Science",
  "Content Writing",
  "Video Editing",
  "Project Management",
  "Engineering",
];

const languagesList = [
  "Bangla",
  "English (Basic)",
  "English (Fluent)",
  "Japanese",
  "Chinese",
  "Hindi",
  "Spanish",
  "Arabic",
  "French",
  "German",
];

const JobPostForm = () => {
  const { currentUser } = useAppContext();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    skills: [],
    requirements: [],
    benefits: [],
    type: "",
    employmentStatus: "",
    minSalary: "",
    maxSalary: "",
    salaryType: "Monthly",
    location: "",
    experience: "",
    educationLevel: "",
    industry: "",
    languages: [],
    country: "",
    state: "",
    city: "",
    gender: "",
    vacancy: 1,
    attachment: "",
    meta: {
      postedBy: currentUser?.email,
      postedById: currentUser?._id,
      postedByName: currentUser?.name,
      postedByImage: currentUser?.image,
      createdAt: new Date().toISOString(),
      appliedCount: 0,
    },
  });

  const [imageLoading, setImageLoading] = useState(false);

  const handleChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  // const handleImageUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file)
  //     return Swal.fire("Warning", "Please select an image.", "warning");

  //   const imageData = new FormData();
  //   imageData.append("image", file);
  //   setImageLoading(true);

  //   try {
  //     const res = await axios.post(
  //       `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_API_KEY}`,
  //       imageData
  //     );
  //     if (res.status === 200) {
  //       handleChange("attachment", res.data.data.display_url);
  //     }
  //   } catch (err) {
  //     console.error("Image upload failed:", err);
  //     Swal.fire("Error", "Image upload failed!", "error");
  //   } finally {
  //     setImageLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.table(formData);
    Swal.fire("Success", "Job posted successfully!", "success");
    e.target.reset();
  };

  return (
    <section className="w-full lg:px-6 py-4 md:py-6 my-4 md:my-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white shadow-2xl rounded-3xl p-4 lg:p-6 border border-gray-200"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-teal-600">
          Post a New Job
        </h2>

        {/* Job Title */}
        <div>
          <label className="form-label">Job Title</label>
          <input
            type="text"
            placeholder="e.g., Frontend Developer"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="form-input"
            required
          />
        </div>

        {/* Category and Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Category</label>
            <select
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="form-input"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Job Type</label>
            <select
              value={formData.type}
              onChange={(e) => handleChange("type", e.target.value)}
              className="form-input"
              required
            >
              <option value="">Select Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Remote">Remote</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>
        </div>

        {/* Skills */}
        <div>
          <label className="form-label">Skills (comma separated)</label>
          <input
            type="text"
            placeholder="e.g., React, Tailwind, Node.js"
            value={formData.skills.join(", ")}
            onChange={(e) =>
              handleChange(
                "skills",
                e.target.value.split(",").map((s) => s.trim())
              )
            }
            className="form-input"
            required
          />
        </div>
        <div>
          <label className="form-label">Job Description</label>
          <textarea
            placeholder="Enter job description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="form-input"
            required
          />
        </div>
        {/* job requirements */}
        <div>
          <label htmlFor="" className="form-label">
            {" "}
            Job Requirements
          </label>
          <textarea
            placeholder="Enter job requirements"
            value={formData.requirements}
            onChange={(e) => handleChange("requirements", e.target.value)}
            className="form-input"
            required
          />
        </div>

        {/* job benefits */}
        <div>
          <label htmlFor="benefits" className="form-label">
            Job Benefits
          </label>
          <input
            type="text"
            name="benefits"
            className="form-input"
            placeholder="Enter job benefits"
            required
            onChange={(e) => handleChange("benefits", e.target.value)}
          />
        </div>
        {/* Salary Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Minimum Salary</label>
            <input
              type="number"
              placeholder="e.g., 30000"
              value={formData.minSalary}
              onChange={(e) => handleChange("minSalary", e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div>
            <label className="form-label">Maximum Salary</label>
            <input
              type="number"
              placeholder="e.g., 70000"
              value={formData.maxSalary}
              onChange={(e) => handleChange("maxSalary", e.target.value)}
              className="form-input"
              required
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="form-label">Location</label>
          <input
            type="text"
            placeholder="e.g., Dhaka, Bangladesh"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            className="form-input"
            required
          />
        </div>

        {/* Experience and Industry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Experience</label>
            <select
              value={formData.experience}
              onChange={(e) => handleChange("experience", e.target.value)}
              className="form-input"
              required
            >
              <option value="">Select Experience</option>
              {[...Array(11)].map((_, i) => (
                <option key={i} value={`${i} years`}>
                  {i === 0 ? "Fresher" : `${i} year${i > 1 ? "s" : ""}`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Industry</label>
            <input
              type="text"
              placeholder="e.g., Information Technology"
              value={formData.industry}
              onChange={(e) => handleChange("industry", e.target.value)}
              className="form-input"
              required
            />
          </div>
        </div>

        {/* Languages */}
        <div>
          <label className="form-label mb-2">Languages</label>
          <div className="flex flex-wrap gap-4">
            {languagesList.map((lang) => (
              <label
                key={lang}
                className="flex items-center text-xs gap-2 text-gray-600"
              >
                <input
                  type="checkbox"
                  value={lang}
                  checked={formData.languages.includes(lang)}
                  onChange={(e) => {
                    const updated = e.target.checked
                      ? [...formData.languages, lang]
                      : formData.languages.filter((l) => l !== lang);
                    handleChange("languages", updated);
                  }}
                  className="accent-teal-500"
                />
                {lang}
              </label>
            ))}
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="form-label">Address</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="text"
              placeholder="Country"
              value={formData.country}
              onChange={(e) => handleChange("country", e.target.value)}
              className="form-input"
              required
            />
            <input
              type="text"
              placeholder="State"
              value={formData.state}
              onChange={(e) => handleChange("state", e.target.value)}
              className="form-input"
              required
            />
            <input
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              className="form-input"
              required
            />
          </div>
        </div>

        {/* Deadline */}
        <div>
          <label className="form-label">Application Deadline</label>
          <input
            type="date"
            name="deadline"
            required
            className="form-input"
            onChange={(e) => handleChange("meta.deadline", e.target.value)}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="form-label">Attachment (Optional)</label>
          <input
            type="text"
            placeholder="Share your attachment link"
            accept="https://*"
            onChange={(e) => handleChange("attachment", e.target.value)}
            className="form-input cursor-pointer"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center w-full flex justify-center">
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-6 cursor-pointer rounded-lg shadow-md transition duration-300"
          >
            Post Job
          </button>
        </div>
      </form>
    </section>
  );
};

export default JobPostForm;
