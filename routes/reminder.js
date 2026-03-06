const express = require("express");
const protect = require("../middleware/auth");
const {
  createReminder,
  getReminders,
  deleteReminder,
} = require("../controllers/reminderController");

const router = express.Router();

router.post("/", protect, createReminder);
router.get("/", protect, getReminders);
router.put("/:id", protect, deleteReminder);

module.exports = router;