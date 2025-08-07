"use client";

import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";

const categories = [
  "Software Engineering",
  "UI/UX & Product Design",
  "Digital Marketing & SEO",
  "Business Strategy & Consulting",
  "Mobile App Development",
  "Web Development & Frontend",
  "Accounting & Financial Analysis",
  "Sales & Business Development",
  "Customer Success & Support",
  "HR & Talent Acquisition",
  "Data Analytics & AI",
  "Content Creation & Copywriting",
  "Video Production & Animation",
  "Project & Product Management",
  "Mechanical & Civil Engineering",
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

const EditJob = ({ job, setEdit, refetchJobs }) => {
  const { control, handleSubmit, register } = useForm({
    defaultValues: {
      title: job.title,
      category: job.category,
      type: job.type,
      skills: job.skills.join(", "),
      description: job.description,
      requirements: job.requirements,
      benefits: job.benefits,
      minSalary: job.minSalary,
      maxSalary: job.maxSalary,
      salaryType: job.salaryType,
      location: job.location,
      experience: job.experience,
      industry: job.industry,
      educationLevel: job.educationLevel,
      languages: job.languages,
      deadline: job.deadline,
      vacancy: job.vacancy,
    },
  });
  console.log(job);

  const handleFormSubmit = async (data) => {
    try {
      const updatedJob = {
        ...data,
        skills: data.skills.split(",").map((s) => s.trim()),
      };
      const res = await axios.put(`/api/updateJob/${job._id}`, updatedJob);
      console.log("jobs update response:", res);
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          text: "Job updated successfully",
          showConfirmButton: false,
          timer: 1500,
          width: 350,
          background: "#D5F5F6",
          animation: true,
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "Job updated failed",
          showConfirmButton: false,
          timer: 1500,
          width: 350,
          background: "#D5F5F6",
          animation: true,
        });
      }
    } catch (error) {
      toast.error("Failed to update the job.");
    } finally {
      setEdit(null);
      refetchJobs();
    }
  };

  return (
    <section className="w-full">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-8 border-gray-200 relative"
      >
        <div className="flex justify-end">
          <button
            onClick={() => setEdit(null)}
            className="btn btn-sm border border-teal-500 absolute top-5 right-5"
          >
            <X />
          </button>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-center text-teal-600">
          Update Job
        </h2>

        {/* Job Title */}
        <div>
          <label className="form-label">Job Title</label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                placeholder="e.g., Frontend Developer"
                {...field}
                className="form-input"
              />
            )}
          />
        </div>

        {/* Category and Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Category</label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <select {...field} className="form-input" required>
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          <div>
            <label className="form-label">Job Type</label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <select {...field} className="form-input" required>
                  <option value="">Select Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Remote">Remote</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Freelance">Freelance</option>
                </select>
              )}
            />
          </div>
        </div>

        {/* Skills */}
        <div>
          <label className="form-label">Skills (comma separated)</label>
          <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                placeholder="e.g., React, Tailwind, Node.js"
                {...field}
                className="form-input"
              />
            )}
          />
        </div>

        {/* Job Description */}
        <div>
          <label className="form-label">Job Description</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <textarea
                placeholder="Enter job description"
                {...field}
                className="form-input"
              />
            )}
          />
        </div>

        {/* Job Requirements */}
        <div>
          <label className="form-label">Job Requirements</label>
          <Controller
            name="requirements"
            control={control}
            render={({ field }) => (
              <textarea
                placeholder="Enter job requirements"
                {...field}
                className="form-input"
                required
              />
            )}
          />
        </div>

        {/* Job Benefits */}
        <div>
          <label className="form-label">Job Benefits</label>
          <Controller
            name="benefits"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                className="form-input"
                placeholder="Enter job benefits"
                required
              />
            )}
          />
        </div>

        {/* Salary Range */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="form-label">Minimum Salary</label>
            <Controller
              name="minSalary"
              control={control}
              render={({ field }) => (
                <input
                  type="number"
                  placeholder="e.g., 30000"
                  {...field}
                  className="form-input"
                />
              )}
            />
          </div>
          <div>
            <label className="form-label">Maximum Salary</label>
            <Controller
              name="maxSalary"
              control={control}
              render={({ field }) => (
                <input
                  type="number"
                  placeholder="e.g., 70000"
                  {...field}
                  className="form-input"
                />
              )}
            />
          </div>

          {/* Salary Type */}
          <div>
            <label className="form-label">Salary Type</label>
            <Controller
              name="salaryType"
              control={control}
              render={({ field }) => (
                <select {...field} className="form-input" required>
                  <option value="" disabled>
                    Select Salary Type
                  </option>
                  <option value="Hourly">Hourly</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              )}
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="form-label">Location</label>
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                placeholder="e.g., Dhaka, Bangladesh"
                {...field}
                className="form-input"
                required
              />
            )}
          />
        </div>

        {/* Experience and Industry */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="form-label">Experience</label>
            <Controller
              name="experience"
              control={control}
              render={({ field }) => (
                <select {...field} className="form-input" required>
                  <option value="">Select Experience</option>
                  {[...Array(11)].map((_, i) => (
                    <option key={i} value={`${i} years`}>
                      {i === 0 ? "Fresher" : `${i} year${i > 1 ? "s" : ""}`}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>
          <div>
            <label className="form-label">Industry</label>
            <Controller
              name="industry"
              control={control}
              render={({ field }) => (
                <select {...field} className="form-input" required>
                  <option value="" disabled>
                    Select Industry
                  </option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          <div>
            <label className="form-label">Education Level</label>
            <input
              type="text"
              value={job.educationLevel}
              {...register("educationLevel")}
              className="form-input"
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
                  {...register("languages")}
                  className="accent-teal-500"
                />
                {lang}
              </label>
            ))}
          </div>
        </div>
        {/* Deadline */}
        <div>
          <label className="form-label">Deadline</label>
          <Controller
            name="deadline"
            control={control}
            render={({ field }) => (
              <input type="date" {...field} className="form-input" required />
            )}
          />
        </div>

        {/* Vacancy */}
        <div>
          <label className="form-label">Vacancy</label>
          <Controller
            name="vacancy"
            control={control}
            render={({ field }) => (
              <input type="number" {...field} className="form-input" required />
            )}
          />
        </div>

        <button type="submit" className="bg-teal-500 text-white btn">
          Update Job
        </button>
      </form>
    </section>
  );
};

export default EditJob;
