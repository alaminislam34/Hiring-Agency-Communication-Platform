// app/job/[id]/page.jsx
import ApplyButton from "@/app/jobs/components/ApplyButton";

import { ObjectId } from "mongodb";
import BackButton from "./components/BackButton";
import dbConnect, { collection } from "@/lib/dbConnect";

const JobDetailsPage = async ({ params }) => {
  const jobsCollection = dbConnect(collection.jobsCollection);
  const job = await jobsCollection.findOne({ _id: new ObjectId(params.id) });

  if (!job)
    return <div className="text-center text-red-600">Job not found!</div>;

  return (
    <div className="min-h-screen p-6">
      <div className="w-11/12 mx-auto p-8 ">
        <BackButton />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {job.jobTitle}
        </h1>
        <div className="mb-4">
          <span className="text-gray-600 font-medium">Company: </span>
          <span className="text-gray-800">{job.companyName}</span>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
          <span>
            <strong>Location:</strong> {job.location}
          </span>
          <span>
            <strong>Type:</strong> {job.jobType}
          </span>
          <span>
            <strong>Salary:</strong> {job.currency} {job.minSalary} -{" "}
            {job.maxSalary}
          </span>
          <span>
            <strong>Posted:</strong>{" "}
            {new Date(job.postDate).toLocaleDateString()}
          </span>
          <span>
            <strong>Deadline:</strong>{" "}
            {new Date(job.deadline).toLocaleDateString()}
          </span>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Job Description</h2>
          <p className="text-gray-700">{job.description}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Skills Required</h2>
          <p className="text-gray-700">{job.skills}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Requirements</h2>
          <p className="text-gray-700">{job.requirements}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
          <p className="text-gray-700">📧 Email: {job.contactEmail}</p>
          <p className="text-gray-700">📞 Phone: {job.contactPhone}</p>
        </div>

        <ApplyButton />
      </div>

      {/* Reuse your Apply Modal here */}
      <dialog id="apply_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white p-6 rounded-lg max-w-xl mx-auto">
          <h3 className="font-bold text-xl mb-4">Apply for {job.jobTitle}</h3>
          <form method="dialog" className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
            <textarea
              rows="4"
              placeholder="Cover Letter"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            ></textarea>
            <div className="flex justify-end gap-2 pt-2">
              <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
                Cancel
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default JobDetailsPage;
