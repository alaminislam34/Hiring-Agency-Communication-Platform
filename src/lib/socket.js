import { io } from "socket.io-client";

// const SOCKET_URL = "https://jobhive-server-1.onrender.com";
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL;

// Export a single socket instance to be shared across your app
export const socket = io(SOCKET_URL, {
  autoConnect: false, // prevents auto-connect on import, connect manually if needed
  transports: ["websocket"], // optional: for more stable connection
});
