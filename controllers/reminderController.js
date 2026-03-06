const ReminderDao = require("../dao/reminder");

// Create Reminder
exports.createReminder = async (req, res) => {
  try {
    const { title, description, date, time } = req.body;

    if(!title) res.status(500).json({ message: 'Please provide title!' });
    if(!date) res.status(500).json({ message: 'Please provide date!' });
    if(!time) res.status(500).json({ message: 'Please provide time!' });
    
    // Combine date + time
    const reminderTime = new Date(`${date}T${time}:00`);

    const reminder = await ReminderDao.createReminder({
      userId: req.userId,
      title,
      description,
      reminderTime,
    });

    res.status(201).json(reminder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Reminders
exports.getReminders = async (req, res) => {
  try {
    const reminders = await ReminderDao.getRemindersByUserId({ userId: req.userId })
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Reminder
exports.deleteReminder = async (req, res) => {
  try {
    const reminder = await ReminderDao.deleteReminderById({
      id: req.params.id,
    });

    if (!reminder)
      return res.status(404).json({ message: "Reminder not found" });

    res.json({ message: "Reminder deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};