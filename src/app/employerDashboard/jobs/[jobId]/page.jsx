// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";

// const JobDetails = () => {
//   const { jobId } = useParams(); // Make sure it's named correctly
//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchJob = async () => {
//       try {
//         const res = await fetch(`/api/jobs/${jobId}`);
//         if (!res.ok) throw new Error("Job not found");
//         const data = await res.json();
//         setJob(data);
//       } catch (error) {
//         console.error("Error fetching job:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (jobId) fetchJob();
//   }, [jobId]);

//   if (loading) return <p>Loading...</p>;
//   if (!job) return <p>Job not found</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">{job.jobTitle}</h1>
//       <p>
//         <strong>Company:</strong> {job.companyName}
//       </p>
//       <p>
//         <strong>Job Type:</strong> {job.jobType}
//       </p>
//       <p>
//         <strong>Location:</strong> {job.location}
//       </p>
//       <p>
//         <strong>Deadline:</strong> {job.deadline}
//       </p>
//     </div>
//   );
// };

// export default JobDetails;
