// import dbConnect, { collection } from "@/lib/dbConnect";
"use client";
import { RiDeleteBin6Line } from "react-icons/ri";
import JobDetailsModal from "./JobDetailsModal";
import ModalShowButton from "./ModalShowButton";
import { useEffect, useState } from "react";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  // const jobsCollection = dbConnect(collection.jobsCollection);
  // const jobs = await jobsCollection.find({}).toArray();
  useEffect(() => {
    const getJobs = async () => {
      const res = await fetch(`/api/jobs`);
      const data = await res.json();
      console.log(data);
      setJobs(data);
    };
    getJobs();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-4">Job Listings</h1>
      {/* Jobs Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse text-sm table ">
          <thead className="bg-gray-100 text-gray-700 uppercase text-left">
            <tr>
              <th className="">Job Title</th>
              <th className="">Company</th>
              <th className="">Location</th>
              <th className="">Salary</th>
              <th className="">Job Type</th>
              <th className="">Posted</th>
              <th className="">Deadline</th>
              <th className=" text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {jobs.map((job) => (
              <tr key={job._id} className="hover:bg-gray-50">
                <td className=" font-medium">{job.jobTitle}</td>
                <td className="">{job.companyName}</td>
                <td className="">{job.location}</td>
                <td className="">
                  {job.minSalary} - {job.maxSalary} {job.currency}
                </td>
                <td className="">{job.jobType}</td>
                <td className="">
                  {new Date(job.postDate).toLocaleDateString()}
                </td>
                <td className="">
                  {new Date(job.deadline).toLocaleDateString()}
                </td>
                <td className="text-center flex flex-row gap-1">
                  {/* <ModalShowButton id={"my_modal_5"} /> */}
                  <button
                    onClick={() =>
                      document.getElementById(`my_modal_${job._id}`).showModal()
                    }
                    className="p-2 bg-blue-400 hover:bg-blue-500 text-white rounded-md cursor-pointer"
                  >
                    Details
                  </button>
                  <dialog
                    id={`my_modal_${job._id}`}
                    className="modal modal-middle"
                  >
                    <div className="modal-box relative max-w-5xl w-11/12">
                      <div className="modal-action absolute top-0 right-5">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn">Close</button>
                        </form>
                      </div>
                      <JobDetailsModal id={job._id} />
                    </div>
                  </dialog>
                  <button className="p-2 bg-red-400 hover:bg-red-500 text-white rounded-md cursor-pointer">
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobsPage;
