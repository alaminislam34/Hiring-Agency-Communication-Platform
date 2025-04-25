// ---- JSX সংস্করণ ----
"use client";

import { useEffect, useRef } from "react";
import { useAppContext } from "@/Providers/AppProviders";
import { useParams, useRouter } from "next/navigation";

export default function Room() {
  const { fullName, currentUser } = useAppContext();
  const { roomid } = useParams(); // generic সরালাম
  const router = useRouter();
  const containerRef = useRef(null); // <HTMLDivElement> সরালাম
  const initializedRef = useRef(false);

  useEffect(() => {
    const init = async () => {
      if (initializedRef.current) return;
      initializedRef.current = true;

      const appID = process.env.NEXT_PUBLIC_ZEGOCLOUD_APP_ID;
      const serverSecret = process.env.NEXT_PUBLIC_ZEGOCLOUD_SERVER_SECRET;
      if (!appID || !serverSecret) {
        console.error("Zego credentials missing!");
        return;
      }

      if (!roomid) {
        console.error("No room ID provided");
        router.push("/not-found");
        return;
      }

      const { ZegoUIKitPrebuilt } = await import(
        "@zegocloud/zego-uikit-prebuilt"
      );

      const uid =
        crypto?.randomUUID?.() ||
        Date.now().toString(36) + Math.random().toString(36).slice(2, 5);

      const userName = fullName || currentUser?.email || `Guest-${uid}`;

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        Number(appID),
        serverSecret,
        roomid,
        uid,
        userName,
        720
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      zp.joinRoom({
        container: containerRef.current,
        scenario: { mode: ZegoUIKitPrebuilt.VideoConference },
        sharedLinks: [
          {
            name: "Invite Link",
            url: typeof window !== "undefined" ? window.location.href : "",
          },
        ],
        showScreenSharingButton: true,
      });
    };

    if (typeof window !== "undefined") init();
  }, [roomid, fullName, currentUser, router]);

  return (
    <div className="min-h-[400px] md:h-[90vh] pt-6">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
