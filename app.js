process.env.TZ = "Asia/Kolkata";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const reminderRoutes = require("./routes/reminder");

const startReminderScheduler = require("./services/reminderScheduler");

startReminderScheduler();

const app = express();
console.log(new Date().toLocaleString("en-IN", {
  timeZone: "Asia/Kolkata"
}));

// Connect Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Health
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reminders", reminderRoutes);

app.get("/", (req, res) => {
  res.send("Reminder API Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));