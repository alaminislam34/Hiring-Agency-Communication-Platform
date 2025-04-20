// 🔧 Load environment variables from .env at the VERY TOP
require("dotenv").config({ path: "./.env.local" });

// 🚀 Imports
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// 🛠️ Initialize Express App and HTTP Server
const app = express();
const server = http.createServer(app);

// 🔌 Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend origin
    methods: ["GET", "POST"],
  },
});

const connectedUsers = new Map(); // Key: email, Value: socket.id

// 🧩 Middleware
app.use(cors());
app.use(express.json());

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("Real-time Chat Server is running!");
});

// 🌐 MongoDB Connection Setup
const uri = process.env.MONGODB_URI;
console.log("🔍 MONGODB_URI:", uri); // Debug to ensure URI is loaded

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let jobsCollection;

client.connect().then(() => {
  const db = client.db(process.env.DB_NAME);
  jobsCollection = db.collection("jobs");
  console.log("✅ Connected to MongoDB in Socket.IO server");
});

// 📩 POST: Apply to Job (Notifies Employer in Real-time)
app.post("/api/apply-job", async (req, res) => {
  const { jobId, applicantName, applicantEmail } = req.body;

  try {
    const job = await jobsCollection.findOne({ _id: new ObjectId(jobId) });

    if (!job || !job.employerEmail) {
      return res.status(404).json({ message: "Job or employer not found" });
    }

    const employerSocketId = connectedUsers.get(job.employerEmail);

    const notification = {
      type: "job-applied",
      jobTitle: job.jobTitle,
      applicantName,
      applicantEmail,
      jobId,
      message: `${applicantName} applied to your job: ${job.jobTitle}`,
    };

    if (employerSocketId) {
      io.to(employerSocketId).emit("jobApplicationNotification", notification);
      console.log(`📬 Sent application notification to ${job.employerEmail}`);
    }

    res
      .status(200)
      .json({ message: "Application notification sent", notification });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🕒 In-Memory Interview Store
const scheduledInterviews = [];

// 📅 POST: Schedule Interview
app.post("/api/schedule", (req, res) => {
  const { title, dateTime, interviewer, candidateName, roomId } = req.body;

  if (!title || !dateTime || !candidateName || !roomId) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const interview = {
    id: Date.now().toString(),
    title,
    dateTime,
    interviewer,
    candidateName,
    roomId,
  };

  scheduledInterviews.push(interview);
  io.emit("newSchedule", interview);

  res.status(201).json({
    message: "Interview scheduled successfully",
    interview,
  });
});

// 📅 GET: All Scheduled Interviews
app.get("/api/schedules", (req, res) => {
  res.json(scheduledInterviews);
});

// 📢 POST: Notify All Users About New Job Post
app.post("/api/notify-job-post", (req, res) => {
  const { jobTitle, companyName, postDate } = req.body;

  const notification = {
    type: "job-posted",
    jobTitle,
    companyName,
    postDate,
    message: `New job posted: ${jobTitle} at ${companyName}`,
  };

  io.emit("newJobPosted", notification);

  res.status(200).json({ message: "Notification emitted", notification });
});

// ⚡ Socket.IO: Handle Real-time Events
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  // 🔐 Register user by email
  socket.on("registerUser", (email) => {
    if (email) {
      connectedUsers.set(email, socket.id);
      console.log(`📥 Registered user: ${email} with socket ID: ${socket.id}`);
    }
  });

  // 💬 Join a chat room
  socket.on("joinRoom", (roomId) => {
    if (roomId) {
      socket.join(roomId);
      console.log(`🏠 User ${socket.id} joined room: ${roomId}`);
    }
  });

  // 📨 Handle sending messages
  socket.on("sendMessage", ({ roomId, message }) => {
    if (roomId && message) {
      console.log(`✉️ Message in ${roomId}:`, message);
      io.to(roomId).emit("receiveMessage", message);
    }
  });

  // 🔌 Handle disconnection
  socket.on("disconnect", () => {
    for (let [email, id] of connectedUsers.entries()) {
      if (id === socket.id) {
        connectedUsers.delete(email);
        break;
      }
    }
    console.log("🔴 User disconnected:", socket.id);
  });
});

// 🚀 Start Server
const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`🌐 Server running on port ${PORT}`);
});
