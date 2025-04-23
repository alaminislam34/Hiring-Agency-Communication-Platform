// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";

// const MySwal = withReactContent(Swal);

// export default function CreateMeeting() {
//   const router = useRouter();
//   const [roomID, setRoomID] = useState("");

//   useEffect(() => {
//     const generateUUID = () => {
//       if (typeof crypto !== "undefined" && crypto.randomUUID) {
//         return crypto.randomUUID();
//       }
//       return Date.now().toString(36) + Math.random().toString(36).substr(2);
//     };
//     setRoomID(generateUUID());
//   }, []);

//   const handleCreateMeeting = () => {
//     if (!roomID) return;

//     const meetingLink = `${window.location.origin}/room/${roomID}`;

//     MySwal.fire({
//       title: "✅ Meeting Created!",
//       html: `
//         <p class="mb-2">Share this link to invite others:</p>
//         <input id="meeting-link" class="swal2-input" value="${meetingLink}" readonly />
//       `,
//       confirmButtonText: "Copy Link",
//       showCancelButton: true,
//       cancelButtonText: "Go to Room",
//       didOpen: () => {
//         const input = document.getElementById("meeting-link");
//         input?.select();
//       },
//       preConfirm: () => {
//         navigator.clipboard.writeText(meetingLink);
//         Swal.fire("Copied!", "Meeting link copied to clipboard.", "success");
//       },
//     }).then(() => {
//       router.push(`/room/${roomID}`);
//     });
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center px-4">
//       <h1 className="text-3xl font-bold mb-4 text-center">
//         Create a New Meeting
//       </h1>
//       <button
//         onClick={handleCreateMeeting}
//         className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
//       >
//         Create Meeting
//       </button>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function CreateMeeting() {
  const router = useRouter();
  const [roomID, setRoomID] = useState("");

  // 🔒 run only in browser
  useEffect(() => {
    if (typeof window === "undefined") return;

    const generateUUID = () =>
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Date.now().toString(36) + Math.random().toString(36).slice(2);

    setRoomID(generateUUID());
  }, []);

  const handleCreateMeeting = () => {
    // guard against SSR & empty id
    if (!roomID || typeof window === "undefined") return;

    const meetingLink = `${window.location.origin}/room/${roomID}`;

    MySwal.fire({
      title: "✅ Meeting Created!",
      html: `
        <p class="mb-2">Share this link to invite others:</p>
        <input id="meeting-link" class="swal2-input" value="${meetingLink}" readonly />
      `,
      confirmButtonText: "Copy Link",
      showCancelButton: true,
      cancelButtonText: "Go to Room",
      didOpen: () => {
        const input = document.getElementById("meeting-link");
        input?.select();
      },
      preConfirm: () => {
        // clipboard API check with fallback for older browsers
        if (navigator?.clipboard?.writeText) {
          navigator.clipboard.writeText(meetingLink);
          Swal.fire("Copied!", "Meeting link copied to clipboard.", "success");
        } else {
          // Fallback for browsers that don't support Clipboard API
          const textarea = document.createElement("textarea");
          textarea.value = meetingLink;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
          Swal.fire("Copied!", "Meeting link copied to clipboard.", "success");
        }
      },
    }).then(() => router.push(`/room/${roomID}`));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Create a New Meeting
      </h1>
      <button
        onClick={handleCreateMeeting}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Create Meeting
      </button>
    </div>
  );
}
