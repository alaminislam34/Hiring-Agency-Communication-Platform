import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3002"; // Update with your backend URL

export const socket = io(SOCKET_URL);
