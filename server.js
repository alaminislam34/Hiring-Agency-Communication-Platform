const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Replace with your Vercel frontend if needed
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// MongoDB Setup
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
let jobsCollection;

client.connect().then(() => {
  const db = client.db("jobHuntDB");
  jobsCollection = db.collection("jobs");
  console.log("✅ Connected to MongoDB");
});

// Store connected users
const connectedUsers = new Map();

// ========= SOCKET.IO EVENTS ==========
io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  // Register user for private notifications
  socket.on("registerUser", (email) => {
    connectedUsers.set(email, socket.id);
    console.log(`📌 Registered: ${email} with socket ID ${socket.id}`);
  });

  // Broadcast job posted
  socket.on("newJobPosted", (data) => {
    io.emit("newJobPosted", data);
    console.log("📢 Job broadcasted:", data.jobTitle);
  });

  // Notify employer of application
  socket.on("jobApplication", ({ employerEmail, jobTitle, applicantName }) => {
    const socketId = connectedUsers.get(employerEmail);
    if (socketId) {
      io.to(socketId).emit("jobApplicationNotification", {
        jobTitle,
        applicantName,
      });
      console.log(`📬 Notification sent to: ${employerEmail}`);
    } else {
      console.log(`❌ Employer not connected: ${employerEmail}`);
    }
  });

  socket.on("disconnect", () => {
    for (const [email, id] of connectedUsers.entries()) {
      if (id === socket.id) {
        connectedUsers.delete(email);
        console.log(`🔴 Disconnected: ${email}`);
      }
    }
  });
});

// ========== EXPRESS API ROUTES ==========

// 👉 POST a job and broadcast via socket
app.post("/api/jobs", async (req, res) => {
  const job = req.body;
  try {
    const result = await jobsCollection.insertOne(job);
    io.emit("newJobPosted", {
      jobTitle: job.jobTitle,
      companyName: job.companyName,
    });
    res.send({ success: true, insertedId: result.insertedId });
  } catch (error) {
    res.status(500).send({ error: "Failed to post job." });
  }
});

// 👉 Apply for a job (notify employer)
app.post("/api/apply", async (req, res) => {
  const { jobId, applicantName, employerEmail } = req.body;
  try {
    const job = await jobsCollection.findOne({ _id: new ObjectId(jobId) });
    if (!job) return res.status(404).send({ error: "Job not found" });

    io.to(connectedUsers.get(employerEmail)).emit(
      "jobApplicationNotification",
      {
        jobTitle: job.jobTitle,
        applicantName,
      }
    );

    res.send({ success: true, message: "Application notification sent" });
  } catch (err) {
    res.status(500).send({ error: "Failed to apply" });
  }
});

// misssing api
// ✅ POST /api/apply-job
app.post("/api/apply-job", (req, res) => {
  const { employerEmail, jobTitle, applicantName } = req.body;

  const socketId = connectedUsers.get(employerEmail);
  if (socketId) {
    io.to(socketId).emit("jobApplicationNotification", {
      jobTitle,
      applicantName,
    });
    console.log(`📨 Notified employer: ${employerEmail}`);
  } else {
    console.log(`❌ Employer not connected: ${employerEmail}`);
  }

  res.send({ success: true, message: "Application sent successfully" });
});

// ✅ POST /api/notify-employer
app.post("/api/notify-employer", (req, res) => {
  const { employerEmail, jobTitle, applicantName } = req.body;

  const socketId = connectedUsers.get(employerEmail);
  if (socketId) {
    io.to(socketId).emit("jobApplicationNotification", {
      jobTitle,
      applicantName,
    });
    console.log(`📨 Employer notified via /notify-employer`);
  }

  res.send({ success: true });
});

// ✅ POST /api/notify-job-post
app.post("/api/notify-job-post", (req, res) => {
  const { jobTitle, companyName } = req.body;

  io.emit("newJobPosted", {
    jobTitle,
    companyName,
  });

  console.log(`📢 Job posted notification sent: ${jobTitle}`);
  res.send({ success: true });
});

// ✅ POST /api/schedule
const schedules = []; // Temporary in-memory store. Replace with MongoDB if needed.

app.post("/api/schedule", (req, res) => {
  const schedule = req.body;
  schedule.id = Date.now().toString();
  schedules.push(schedule);
  res.send({ success: true, schedule });
});

// ✅ GET /api/schedules
app.get("/api/schedules", (req, res) => {
  res.send(schedules);
});

// Health check
app.get("/", (req, res) => {
  res.send("🚀 JobHive Backend Running with Express + Socket.IO");
});

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
