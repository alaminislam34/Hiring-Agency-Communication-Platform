import dbConnect, { collection } from "@/lib/dbConnect";

const AllJobs = async () => {
  const jobsCollection = dbConnect(collection.jobsCollection);
  const jobs = await jobsCollection.find({}).toArray();
  return (
    <div className="bg-white p-6 mt-10 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">All Jobs</h1>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border-b">Job Title</th>
              <th className="border-b">Company Name</th>
              <th className="border-b">Location</th>
              <th className="border-b">Job Type</th>
              <th className="border-b">Salary</th>
              <th className="border-b">Contact Email</th>
              <th className="border-b">Contact Phone</th>
              <th className="border-b">Post Date</th>
              <th className="border-b">Deadline</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id} className="border-b hover:bg-gray-50">
                <td className="">{job.jobTitle}</td>
                <td className="">{job.companyName}</td>
                <td className="">{job.location}</td>
                <td className="">{job.jobType}</td>
                <td className="">
                  {job.currency} {job.minSalary} - {job.maxSalary}
                </td>
                <td className="">{job.contactEmail}</td>
                <td className="">{job.contactPhone}</td>
                <td className="">
                  {new Date(job.postDate).toLocaleDateString()}
                </td>
                <td className="">
                  {new Date(job.deadline).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllJobs;
