import dbConnect, { collection } from "@/lib/dbConnect";
import Link from "next/link";
import JobsFilterOptions from "./components/JobsFilterOptions";
import ApplyButton from "./components/ApplyButton";

const AllJobs = async () => {
  const jobsCollection = dbConnect(collection.jobsCollection);
  const jobs = await jobsCollection.find({}).toArray();

  return (
    <div className="bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        All Available Jobs
      </h1>
      <JobsFilterOptions />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job._id.toString()}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {job.jobTitle}
            </h2>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Company:</span> {job.companyName}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Location:</span> {job.location}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Type:</span> {job.jobType}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Salary:</span> {job.currency}{" "}
              {job.minSalary} - {job.maxSalary}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Posted:</span>{" "}
              {new Date(job.postDate).toLocaleDateString()}
            </p>

            <div className="flex justify-between mt-4">
              {/* Details Page Link */}
              <Link href={`/job/${job._id}`}>
                <button className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer">
                  View Details
                </button>
              </Link>

              {/* Apply Now (Modal or Link depending on your flow) */}
              <ApplyButton
                job={{
                  _id: job._id.toString(),
                  jobTitle: job.jobTitle,
                  companyName: job.companyName,
                  location: job.location,
                  jobType: job.jobType,
                  salary: {
                    currency: job.currency,
                    min: job.minSalary,
                    max: job.maxSalary,
                  },
                  postDate: job.postDate, // ✅ send actual Date or timestamp
                  deadline: job.deadline,
                  description: job.description,
                  skills: job.skills,
                  requirements: job.requirements,
                  // contactEmail: job.contactEmail,
                  // contactPhone: job.contactPhone,
                }}
                modalId={`apply_modal_${job._id}`}
              />
            </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <div className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">
                Press ESC key or click the button below to close
              </p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllJobs;
