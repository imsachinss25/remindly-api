const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    reminderTime: {
      type: Date,
      required: true,
    },
    notified: {
    type: Boolean,
    default: false,
  },
  },
  { timestamps: true }
);

reminderSchema.index({ reminderTime: 1, status: 1 });

module.exports = mongoose.model("Reminder", reminderSchema);