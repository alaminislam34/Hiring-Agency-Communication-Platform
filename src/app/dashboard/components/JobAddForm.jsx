"use client";

const AddJobForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const jobTitle = form.jobTitle.value.trim();
    const companyName = form.companyName.value.trim();
    const location = form.location.value.trim();
    const jobType = form.jobType.value;
    const minSalary = parseInt(form.minSalary.value) || 0; // ফাঁকা হলে 0 ধরে নেবে
    const maxSalary = parseInt(form.maxSalary.value) || 0;
    const currency = form.currency.value;
    const description = form.jobDetails.value.trim();
    const requirements = form.requirements.value.trim();
    const skills = form.skills.value.trim();
    const contactEmail = form.contactEmail.value.trim();
    const contactPhone = form.contactPhone.value.trim();
    const postDate = new Date().toISOString(); // ISO format
    const deadline = new Date(form.deadline.value).toISOString();

    const jobData = {
      jobTitle,
      companyName,
      location,
      jobType,
      minSalary,
      maxSalary,
      currency,
      description,
      skills,
      requirements,
      contactEmail,
      contactPhone,
      postDate,
      deadline,
    };

    try {
      const res = await fetch("/api/postJob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      const data = await res.json();

      console.log("Job Post Response:", data);
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Job Title & Company */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Location & Job Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="input input-bordered w-full"
            required
          />
          <select
            name="jobType"
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Job Type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Remote">Remote</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        {/* Salary Range & Currency */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="number"
            name="minSalary"
            placeholder="Min Salary ($)"
            className="input input-bordered w-full"
          />
          <input
            type="number"
            name="maxSalary"
            placeholder="Max Salary ($)"
            className="input input-bordered w-full"
          />
          <select name="currency" className="select select-bordered w-full">
            <option value="USD">$ USD</option>
            <option value="BDT">৳ BDT</option>
            <option value="EUR">€ EUR</option>
            <option value="GBP">£ GBP</option>
            <option value="INR">₹ INR</option>
          </select>
        </div>

        {/* Job Details & Required Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <textarea
            name="jobDetails"
            placeholder="Job Description"
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
          <textarea
            name="skills"
            placeholder="Required Skills"
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>

        {/* Job Requirements */}
        <textarea
          name="requirements"
          placeholder="Job Requirements & Responsibilities"
          className="textarea textarea-bordered w-full"
          required
        ></textarea>

        {/* Application Deadline & Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="date"
            name="deadline"
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            name="contactEmail"
            placeholder="Contact Email"
            className="input input-bordered w-full"
            required
          />
        </div>

        <input
          type="text"
          name="contactPhone"
          placeholder="Contact Phone"
          className="input input-bordered w-full"
          required
        />

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Submit Job
        </button>
      </form>
    </div>
  );
};

export default AddJobForm;
