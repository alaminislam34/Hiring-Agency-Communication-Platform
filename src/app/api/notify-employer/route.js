app.post("/api/notify-employer", (req, res) => {
  const { jobId, message } = req.body;

  // Lookup job
  const job = mockJobDB.find((job) => job.jobId === jobId);
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  const employerSocketId = connectedUsers.get(job.employerEmail);

  if (employerSocketId) {
    io.to(employerSocketId).emit("jobApplicationNotification", {
      jobId,
      message,
    });

    return res.status(200).json({
      message: `Notification sent to ${job.employerEmail}`,
    });
  } else {
    return res.status(404).json({
      message: `Employer (${job.employerEmail}) not connected`,
    });
  }
});
