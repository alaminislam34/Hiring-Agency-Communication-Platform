"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export default function CreateMeeting() {
  const router = useRouter();
  const [roomID, setRoomID] = useState(null);

  /* ─ generate a unique room id once, client‑side only ─ */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const uid =
      crypto?.randomUUID?.() ||
      Date.now().toString(36) + Math.random().toString(36).slice(2);
    setRoomID(uid);
  }, []);

  const copyToClipboard = (text) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    } else {
      // fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  };

  const handleCreateMeeting = () => {
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
        copyToClipboard(meetingLink);
        Swal.fire("Copied!", "Meeting link copied to clipboard.", "success");
      },
    }).then(() => router.push(`/room/${roomID}`));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Create a New Meeting
      </h1>

      <button
        onClick={handleCreateMeeting}
        disabled={!roomID}
        className="bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed
                   text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        {roomID ? "Create Meeting" : "Loading…"}
      </button>
    </div>
  );
}
