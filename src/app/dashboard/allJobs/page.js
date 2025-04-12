import dbConnect, { collection } from "@/lib/dbConnect";
import ActionsButton from "../users/components/ActionsButton";

const AllJobs = async () => {
  const jobsCollection = dbConnect(collection.jobsCollection);
  const jobs = await jobsCollection.find({}).toArray();
  return (
    <div className="bg-white p-6 mt-10 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">All Jobs</h1>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="">Job Title</th>
              <th className="">Job Type</th>
              <th className="">Salary</th>
              <th className="">Post Date</th>
              <th className="">Deadline</th>
              <th className="">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id} className=" hover:bg-gray-50">
                <td className="">{job.jobTitle}</td>
                <td className="">{job.jobType}</td>
                <td className="">
                  {job.currency} {job.minSalary} - {job.maxSalary}
                </td>
                <td className="">
                  {new Date(job.postDate).toLocaleDateString()}
                </td>
                <td className="">
                  {new Date(job.deadline).toLocaleDateString()}
                </td>

                <td>
                  <ActionsButton id={job._id} />
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
