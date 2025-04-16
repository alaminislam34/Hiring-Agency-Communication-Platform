"use client";
import { useEffect, useRef } from "react";
import { useAppContext } from "@/Providers/AppProviders";
import { useParams } from "next/navigation";

export default function Room() {
  const { fullName } = useAppContext();
  const containerRef = useRef(null);
  const initializedRef = useRef(false); // Prevent multiple joins
  const { roomid } = useParams();

  useEffect(() => {
    const initializeMeeting = async () => {
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
        return;
      }

      const { ZegoUIKitPrebuilt } = await import(
        "@zegocloud/zego-uikit-prebuilt"
      );

      const generateUUID = () => {
        if (typeof crypto !== "undefined" && crypto.randomUUID) {
          return crypto.randomUUID();
        }
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
      };

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        Number(appID),
        serverSecret,
        roomid,
        generateUUID(),
        fullName || `User-${Date.now()}`,
        720
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: containerRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
      });
    };

    if (typeof window !== "undefined") {
      initializeMeeting();
    }
  }, [roomid, fullName]);

  return <div ref={containerRef} className="w-screen h-screen bg-black" />;
}
