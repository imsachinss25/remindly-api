const Reminder = require("../models/reminder");
const sendEmail = require("../utils/sendEmail");

const checkReminders = async () => {
	try {
		const now = new Date();

		const dueReminders = await Reminder.find({
			reminderTime: { $lte: now },
			notified: false,
		}).populate("user");

		for (let reminder of dueReminders) {
			await sendEmail(
				reminder.user.email,
				`Reminder: ${reminder.title}`,
				`
Hello ${reminder.user.name},

This is a reminder for:

Title: ${reminder.title}
Description: ${reminder.description}
Time: ${reminder.reminderTime}

- Remindly
        `
			);

			reminder.notified = true;
			await reminder.save();
		}
	} catch (error) {
		console.error("Reminder check error:", error.message);
	}
};

module.exports = checkReminders;