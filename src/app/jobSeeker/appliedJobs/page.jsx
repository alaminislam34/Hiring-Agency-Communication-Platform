// "use client";
// import { useAppContext } from "@/Providers/AppProviders";
// import { useQuery } from "@tanstack/react-query";

// const AppliedJobsPage = () => {
//   const { appliedJobsCollection } = useAppContext();
//   return (
//     <div className="px-4 lg:py-6">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">Applied Jobs</h2>

//       {appliedJobsCollection?.length === 0 ? (
//         <p className="text-gray-500">You haven’t applied for any jobs yet.</p>
//       ) : (
//         <div className="overflow-x-auto bg-white shadow rounded-lg">
//           <table className="min-w-full  ">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
//                   Job Title
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
//                   Company
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
//                   Job Type
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
//                   Deadline
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
//                   Salary
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
//                   Status
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="">
//               {appliedJobsCollection?.map((job) => (
//                 <tr key={job._id} className="hover:bg-gray-50 *:border-b">
//                   <td className="px-6 py-4 text-sm text-gray-800">
//                     {job.title}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-800">
//                     {job?.company}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-800">
//                     {job.jobType}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-800">
//                     {new Date(job?.deadline).toLocaleDateString()}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-800">
//                     {job?.salary?.min}k - {job?.salary?.max}k
//                   </td>
//                   <td className="px-6 py-4 text-sm">
//                     <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs">
//                       {job?.status || "Applied"}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AppliedJobsPage;

//chat icon add korar por
"use client";

import { useAppContext } from "@/Providers/AppProviders";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FaRegCommentDots } from "react-icons/fa"; // ✅ Chat icon

const AppliedJobsPage = () => {
  const { appliedJobsCollection, currentUser } = useAppContext(); // ✅ currentUser from Context
  const router = useRouter();
  // applied job collection
  console.log(appliedJobsCollection);

  const handleStartChat = (job) => {
    const employerId = job.postedById;
    const jobseekerId = currentUser?.id; // 🔥 তোমার context/appProviders থেকে current user id নিবে
    if (!employerId || !jobseekerId) return;

    // 🔥 Create Unique Room ID (employerId + jobseekerId, sorted alphabetically)
    const sortedIds = [employerId, jobseekerId].sort();
    const roomId = sortedIds.join("_");

    router.push(`/chat/${roomId}`);
  };

  return (
    <div className="px-4 lg:py-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Applied Jobs</h2>

      {appliedJobsCollection?.length === 0 ? (
        <p className="text-gray-500">You haven’t applied for any jobs yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Job Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Job Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Deadline
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Salary
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Chat
                </th>
              </tr>
            </thead>
            <tbody>
              {appliedJobsCollection?.map((job) => (
                <tr key={job._id} className="hover:bg-gray-50 *:border-b">
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {job.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {job?.company}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {job.jobType}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {new Date(job?.deadline).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {job?.salary?.min}k - {job?.salary?.max}k
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs">
                      {job?.status || "Applied"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleStartChat(job)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaRegCommentDots size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AppliedJobsPage;
