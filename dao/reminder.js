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
  return await Reminder.find({
    user: userId,
    reminderTime: { $gte: new Date() }
  }).sort({
    reminderTime: 1
  });
}

exports.deleteReminderById = async ({ id }) => {
  return await Reminder.findOneAndDelete({
    _id: id,
  });
}

exports.fetchDueReminders = async () => {
   const now = new Date();
  return await Reminder.find({
    reminderTime: { $lte: now },
    notified: false,
  }).populate("user");

}

exports.updateRemindersToNotified = async ({ reminderIds }) => {
  return await Reminder.updateMany(
    { _id: { $in: reminderIds } },
    { $set: { notified: true } }
  );
}