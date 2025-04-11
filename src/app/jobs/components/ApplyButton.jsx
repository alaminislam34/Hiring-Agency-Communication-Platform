"use client";
import { useState } from "react";

const ApplyButton = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: "",
    coverLetter: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    const result = fetch(`/api/job_apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log(result);
    document.getElementById("my_modal_5").close();
  };

  return (
    <div>
      <button
        onClick={() => document.getElementById("my_modal_5").showModal()}
        className="text-sm px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded cursor-pointer"
      >
        Apply Now
      </button>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto">
          <h3 className="font-bold text-2xl text-gray-800 mb-4">
            Apply for This Job
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600">
                Resume Link (Google Drive, etc.)
              </label>
              <input
                type="url"
                name="resume"
                value={formData.resume}
                onChange={handleChange}
                required
                placeholder="https://drive.google.com/..."
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600">
                Cover Letter
              </label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-300"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                onClick={() => document.getElementById("my_modal_5").close()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ApplyButton;
