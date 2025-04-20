"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppContext } from "@/Providers/AppProviders";

export default function ZegoHome() {
  const { fullName, setFullName, roomID, setRoomID } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    setFullName(""); // Reset name on component mount
  }, [setFullName]);

  return (
    <div className="flex items-center justify-center p-4 min-h-[500px]">
      <div className="w-full max-w-2xl backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-700/30">
        <div className="text-center space-y-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-teal-400 to-teal-500 bg-clip-text text-transparent">
            Join Virtual Meeting
          </h1>

          <p className="text-gray-500 text-lg mt-2 mb-8">
            Connect with your team members in high-quality video meetings
          </p>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-left text-gray-500 mb-2">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-teal-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              />
            </div>
            {fullName && fullName.length >= 3 && (
              <>
                <div className="space-y-2">
                  <label className="block text-left text-gray-500 mb-2">
                    Meeting ID
                  </label>
                  <div className="flex flex-col md:flex-row gap-4">
                    <input
                      type="text"
                      placeholder="Enter meeting ID"
                      value={roomID}
                      onChange={(e) => setRoomID(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 outline-none transition-all text-white placeholder-gray-400"
                    />
                    <button
                      onClick={() => router.push(`/room/${roomID}`)}
                      disabled={!roomID || !fullName}
                      className="w-full md:w-auto px-8 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Join Now
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mt-8 border-t border-gray-500 pt-6">
            <p className="text-gray-500 text-sm">
              Don't have a meeting ID?{" "}
              <button
                className="text-teal-500 hover:text-teal-600 cursor-pointer transition-colors"
                onClick={() => router.push("/create-meeting")}
              >
                Create new meeting
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
