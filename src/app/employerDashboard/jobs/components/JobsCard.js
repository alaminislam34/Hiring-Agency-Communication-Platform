import dbConnect, { collection } from "@/lib/dbConnect";

const JobsPage = async () => {
  const jobsCollection = dbConnect(collection.jobsCollection);
  const jobs = await jobsCollection.find().toArray();
  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-4">Job Listings</h1>
      <div className="overflow-x-auto">
        <table className="table table-auto w-full">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Salary Range</th>
              <th>Experience Level</th>
              <th>Posted Date</th>
              <th>Application Deadline</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.jobId}>
                <td>{job.jobTitle}</td>
                <td>{job.companyName}</td>
                <td>{job.location}</td>
                <td>{job.salaryRange}</td>
                <td>{job.experienceLevel}</td>
                <td>{new Date(job.postedDate).toLocaleDateString()}</td>
                <td>
                  {new Date(job.applicationDeadline).toLocaleDateString()}
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
