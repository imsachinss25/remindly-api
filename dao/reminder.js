const Reminder = require("../models/reminder");

exports.createReminder = async ({ userId, title, description, reminderTime }) => {
  return await Reminder.create({
    user: userId,
    title,
    description,
    reminderTime,
  });
}

exports.getRemindersByUserId = async ({ userId }) => {
  return await Reminder.find({ user: userId }).sort({
    reminderTime: 1,
  });
}

exports.deleteReminderById = async ({ id }) => {
  return await Reminder.findOneAndDelete({
    _id: id,
  });

}