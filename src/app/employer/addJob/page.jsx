"use client";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const MultiStepJobForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    type: "",
    location: "",
    category: "",
    minSalary: "",
    maxSalary: "",
    deadline: "",
    experience: "",
    education: "",
    skills: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
    description: "",
  });
  // formData থেকে ঠিক কোন কোন প্রপার্টি কোন স্টেপে আছে তা জানানোর জন্য
  const stepFields = {
    1: ["title", "company", "location", "category", "type"],
    2: [
      "minSalary",
      "maxSalary",
      "deadline",
      "experience",
      "education",
      "skills",
    ],
    3: ["responsibilities", "requirements", "benefits", "description"],
  };

  // ➜ সব প্রয়োজনীয় ইনপুট ফাঁকা কি‑না চেক করা হেল্পার
  const isStepValid = (stepNo) =>
    stepFields[stepNo].every(
      (field) => formData[field]?.toString().trim().length > 0
    );

  // existing handleNext কে বদলে দিলাম ↓
  const handleNext = () => {
    if (!isStepValid(step)) {
      toast.error("⚠️  এই স্টেপের সব ঘর পূরণ করুন!");
      return;
    }
    setStep((prev) => prev + 1);
  };

  // submit‑এর আগে শেষ স্টেপও যাচাই

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isStepValid(3)) {
      alert("⚠️  শেষ স্টেপের সব ঘর পূরণ করুন!");
      return;
    }
    const formattedData = {
      title: formData.title,
      company: formData.company,
      type: formData.type,
      location: formData.location,
      salary: {
        min: parseInt(formData.minSalary),
        max: parseInt(formData.maxSalary),
      },
      qualifications: {
        experience: formData.experience,
        education: formData.education,
        skills: formData.skills.split(",").map((skill) => skill.trim()),
      },
      details: {
        category: formData.category,
        responsibilities: formData.responsibilities
          .split("\n")
          .map((r) => r.trim()),
        requirements: formData.requirements.split("\n").map((r) => r.trim()),
        benefits: formData.benefits.split("\n").map((b) => b.trim()),
        description: formData.description,
      },
      meta: {
        deadline: new Date(formData.deadline).toISOString(),
        createdAt: new Date().toISOString(),
        postedBy: "employerUserId",
        status: "open",
      },
    };

    console.log("Submitted Data:", formattedData);
    // API call or DB operation here
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Post a Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 mx-1 rounded-full ${
                step >= s ? "bg-teal-500" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Job Title"
              className="w-full border px-4 py-2 rounded"
              required
            />
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company Name"
              className="w-full border px-4 py-2 rounded"
              required
            />

            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Job Location (e.g. Remote)"
              className="w-full border px-4 py-2 rounded"
              required
            />
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Job Category (e.g. Web Development)"
              className="w-full border px-4 py-2 rounded"
              required
            />
            <select
              name="type"
              onChange={handleChange}
              defaultValue={""}
              className="w-full border px-4 py-2 rounded"
            >
              <option value={formData.type} disabled>
                --Select Job category--
              </option>
              <option value="Full Time">Software Development</option>
              <option value="Part Time">Part Time</option>
              <option value="Remote">Remote</option>
              <option value="Internship">Internship</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <input
              name="minSalary"
              value={formData.minSalary}
              onChange={handleChange}
              placeholder="Minimum Salary"
              className="w-full border px-4 py-2 rounded"
              required
            />
            <input
              name="maxSalary"
              value={formData.maxSalary}
              onChange={handleChange}
              placeholder="Maximum Salary"
              className="w-full border px-4 py-2 rounded"
              required
            />
            <input
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
            <input
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Experience (e.g. 2+ years)"
              className="w-full border px-4 py-2 rounded"
              required
            />
            <input
              name="education"
              value={formData.education}
              onChange={handleChange}
              placeholder="Education (e.g. Bachelor in CSE)"
              className="w-full border px-4 py-2 rounded"
              required
            />
            <input
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Skills (comma separated)"
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-4">
            <textarea
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleChange}
              placeholder="Responsibilities (one per line)"
              className="w-full border px-4 py-2 rounded"
              required
            />
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="Requirements (one per line)"
              className="w-full border px-4 py-2 rounded"
              required
            />
            <textarea
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              placeholder="Benefits (one per line)"
              className="w-full border px-4 py-2 rounded"
              required
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Job Description"
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>
        )}

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-teal-500 text-white rounded"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Submit
            </button>
          )}
        </div>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="colored"
        hideProgressBar={true}
      />
    </div>
  );
};

export default MultiStepJobForm;
