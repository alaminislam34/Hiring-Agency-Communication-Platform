// import { createServer } from "node:http";
// import next from "next";
// import { Server } from "socket.io";

// const dev = process.env.NODE_ENV !== "production";
// const hostname = "localhost";
// const port = 3001;
// const app = next({ dev, hostname, port });
// const handler = app.getRequestHandler();

// app.prepare().then(() => {
//   const httpServer = createServer(handler);
//   const io = new Server(httpServer, {
//     cors: {
//       origin: "http://localhost:3000", // Allow frontend to connect
//       methods: ["GET", "POST"],
//       credentials: true,
//     },
//   });

//   io.on("connection", (socket) => {
//     console.log("A user connected:", socket.id);

//     socket.on("sendMessage", (message) => {
//       console.log("Received message:", message);

//       // Broadcast message to all clients EXCEPT sender
//       socket.broadcast.emit("receiveMessage", message);
//     });

//     socket.on("disconnect", () => {
//       console.log("A user disconnected:", socket.id);
//     });
//   });

//   httpServer.listen(port, () => {
//     console.log(`> Ready on http://${hostname}:${port}`);
//   });
// });

// const { socket } = require("@/app/chatbox/socket");
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;

//create http server
const server = createServer(app);

//setup cors
app.use(cors({ origin: "*" }));

//initialize socket io

const io = new Server(server, {
  cors: { origin: "*" },
});

server.listen(port, () => {
  console.log(`server started on port ${port}`);
});

//integrate socket io

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  //listen for msg and broadcast to all users
  socket.on("chat message", (message) => {
    console.log("💬 Message received:", message);
    socket.broadcast.emit("chat message", message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});
