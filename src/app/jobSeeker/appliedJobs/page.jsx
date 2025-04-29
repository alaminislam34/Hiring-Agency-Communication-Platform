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

// "use client";

// import { useAppContext } from "@/Providers/AppProviders";
// import { useState } from "react";
// import { FaRegCommentDots } from "react-icons/fa6";
// import { Dialog } from "@headlessui/react";

// const AppliedJobsPage = () => {
//   const { appliedJobsCollection } = useAppContext();
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isChatOpen, setIsChatOpen] = useState(false);

//   const handleStartChat = (job) => {
//     setSelectedJob(job);
//     setIsModalOpen(true);
//   };

//   const handleChatNow = () => {
//     setIsModalOpen(false);
//     setIsChatOpen(true);
//   };

//   const closeModals = () => {
//     setIsModalOpen(false);
//     setIsChatOpen(false);
//     setSelectedJob(null);
//   };

//   return (
//     <div className="px-4 lg:py-6">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">Applied Jobs</h2>

//       {appliedJobsCollection?.length === 0 ? (
//         <p className="text-gray-500">You haven’t applied for any jobs yet.</p>
//       ) : (
//         <div className="overflow-x-auto bg-white shadow rounded-lg">
//           <table className="min-w-full">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
//                   Job Title
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
//                 <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
//                   Chat
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {appliedJobsCollection?.map((job) => (
//                 <tr key={job._id} className="hover:bg-gray-50 *:border-b">
//                   <td className="px-6 py-4 text-sm text-gray-800">
//                     {job.title}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-800">
//                     {job.jobType}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-800">
//                     {new Date(job?.deadline).toLocaleDateString()}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-800">
//                     {job.minSalary} - {job.maxSalary} {job.salaryType}
//                   </td>
//                   <td className="px-6 py-4 text-sm">
//                     <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs">
//                       {job.status || "Applied"}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-center">
//                     <button
//                       onClick={() => handleStartChat(job)}
//                       className="text-blue-500 hover:text-blue-700"
//                     >
//                       <FaRegCommentDots size={20} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Modal: Employer Gmail and Start Chat */}
//       <Dialog
//         open={isModalOpen}
//         onClose={closeModals}
//         className="relative z-50"
//       >
//         <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//         <div className="fixed inset-0 flex items-center justify-center p-4">
//           <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-md">
//             <Dialog.Title className="text-lg font-bold mb-4">
//               Employer Details
//             </Dialog.Title>
//             <p className="mb-4">
//               Employer Gmail:{}
//               <span className="font-semibold">{selectedJob?.postedBy}</span>
//             </p>
//             <div className="flex justify-end space-x-4">
//               <button
//                 onClick={closeModals}
//                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleChatNow}
//                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//               >
//                 Start Chat
//               </button>
//             </div>
//           </Dialog.Panel>
//         </div>
//       </Dialog>

//       {/* Modal: Realtime Chat */}
//       <Dialog open={isChatOpen} onClose={closeModals} className="relative z-50">
//         <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//         <div className="fixed inset-0 flex items-center justify-center p-4">
//           <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-lg">
//             <Dialog.Title className="text-lg font-bold mb-4">
//               Chat with Employer
//             </Dialog.Title>

//             {/* Chat UI Placeholder */}
//             <div className="border rounded p-4 h-64 overflow-y-auto mb-4">
//               {/* Messages will come here */}
//               <p className="text-gray-500">Chat messages will appear here...</p>
//             </div>

//             {/* Message input */}
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 placeholder="Type your message..."
//                 className="flex-grow border rounded px-3 py-2 focus:outline-none"
//               />
//               <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//                 Send
//               </button>
//             </div>

//             <div className="flex justify-end mt-4">
//               <button
//                 onClick={closeModals}
//                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//               >
//                 Close
//               </button>
//             </div>
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default AppliedJobsPage;

//after added socket

"use client";

import { useAppContext } from "@/Providers/AppProviders";
import { useState } from "react";
import { FaRegCommentDots } from "react-icons/fa6";
import { Dialog } from "@headlessui/react";
import Chat from "../chatbox/components/chat";

const AppliedJobsPage = () => {
  const { appliedJobsCollection, currentUser } = useAppContext();
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleStartChat = (job) => {
    console.log("Selected Job for Chat:", job);
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleChatNow = () => {
    console.log("Starting chat with Employer Gmail:", selectedJob?.postedBy);
    setIsModalOpen(false);
    setIsChatOpen(true);
  };

  const closeModals = () => {
    setIsModalOpen(false);
    setIsChatOpen(false);
    setSelectedJob(null);
  };

  const generateRoomId = (email1, email2) => {
    console.log("Generating Room ID for:", email1, email2);
    return [email1, email2].sort().join("_");
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
                    {job.jobType}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {new Date(job?.deadline).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {job.minSalary} - {job.maxSalary} {job.salaryType}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs">
                      {job.status || "Applied"}
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
      {/* Modal: Employer Gmail and Start Chat */}
      <Dialog
        open={isModalOpen}
        onClose={closeModals}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-md">
            <Dialog.Title className="text-lg font-bold mb-4">
              Employer Details
            </Dialog.Title>
            <p className="mb-4">
              Employer Gmail:{" "}
              <span className="font-semibold">{selectedJob?.postedBy}</span>
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModals}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleChatNow}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Start Chat
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      {/* Chat Modal */}
      <Dialog open={isChatOpen} onClose={closeModals} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-lg">
            <Dialog.Title className="text-lg font-bold mb-4">
              Chat with Employer
            </Dialog.Title>

            <Chat
              roomId={generateRoomId(currentUser?.email, selectedJob?.postedBy)}
              userType="seeker"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModals}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default AppliedJobsPage;
