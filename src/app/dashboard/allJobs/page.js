"use client";
import { useAppContext } from "@/Providers/AppProviders";
import ActionsButton from "../users/components/ActionsButton";

const AllJobs = () => {
  const { jobs } = useAppContext();
  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">All Jobs</h1>

      {/* Table */}
      <div className="overflow-x-auto border border-teal-600 rounded-xl shadow-xl ">
        <table className="table table-auto">
          <thead>
            <tr className="bg-teal-600 text-white text-left">
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
