// Import dependencies
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow Next.js frontend
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.send("Real-time Chat Server is running!");
});

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // User joins a chat room
  socket.on("joinRoom", (roomId) => {
    if (roomId) {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room: ${roomId}`);
    }
  });

  // Handle sending messages
  socket.on("sendMessage", ({ roomId, message }) => {
    if (roomId && message) {
      console.log(`Message in ${roomId}:`, message);

      // Broadcast the message to the room
      io.to(roomId).emit("receiveMessage", message);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
