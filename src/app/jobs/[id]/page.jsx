const JobDetailsPage = async ({ params }) => {
  try {
    const resolvedParams = await params; // Await the params
    console.log("Params received:", resolvedParams); // Debugging

    if (!resolvedParams || !resolvedParams.id) {
      throw new Error("Invalid job ID received");
    }

    const res = await fetch(
      `http://localhost:3000/api/job/${resolvedParams.id}`
    );

    if (!res.ok) {
      throw new Error(`Error fetching job: ${res.status}`);
    }

    const job = await res.json();
    console.log("Fetched job data:", job); // Debugging

    return (
      <div className="mt-12 container mx-auto">
        <h2 className="text-4xl text-center">Details Of This Jobs</h2>
        {/* {JSON.stringify(job)} */}
        <div>
          <div className="my-4 flex justify-center items-center gap-4">
            <h2 className="text-2xl">Job Title: {job.jobTitle}</h2>
            <p>Company: {job.companyName}</p>
          </div>
          <hr className="mt-4 container mx-auto" />
          {/* job information container */}
          <div className="flex justify-evenly items-end">
            <div>
              <h2 className="text-xl">Requirements:-</h2>
              <p className="mt-2">{job.requirements}</p>
              <h2 className="text-xl">Skills:-</h2>
              <p className="mt-2">{job.skills}</p>
              <p className="mt-2">Location: {job.location}</p>
              <p>Type: {job.jobType}</p>
              <p className="mt-2">
                Salary: {job.minSalary}- {job.maxSalary} {job.currency}
              </p>
              <p className="mt-2">Description: {job.description}</p>
              <p className="mt-2">Contact Email: {job.contactEmail}</p>
              <p>Contact Phone: {job.contactPhone}</p>
              <p className="mt-2">Posted: {job.postDate}</p>
              <p className="mt-2">Deadline: {job.deadline}</p>
            </div>
            <div>
              <button className="btn btn-accent">Apply Now</button>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error:", error);
    return <div className="mt-20">Error fetching job details</div>;
  }
};
export default JobDetailsPage;
