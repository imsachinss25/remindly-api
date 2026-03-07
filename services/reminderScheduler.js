const ReminderDao = require("../dao/reminder");
const sendEmail = require("../utils/sendEmail");
const cron = require("node-cron");


// runs every minute
const startReminderScheduler = () => {
  cron.schedule("* * * * *", async () => {
    try {
			const reminderIds = [];
      const reminders = await ReminderDao.fetchDueReminders();

			console.log("Reminders >>> ", reminders)

      for (let reminder of reminders) {
       await sendEmail(
  reminder.user.email,
  `Reminder: ${reminder.title}`,
  `
Hello ${reminder.user.name},

⏰ You have an upcoming reminder.

----------------------------------

Title       : ${reminder.title}
Description : ${reminder.description}
Time        : ${reminder.reminderTime}

----------------------------------

Please make sure to take the necessary action.

Thanks,  
Remindly
  `
);
				reminderIds.push(reminder._id);
      }
			console.log("updated reminder ids >>> ", reminderIds)
			await ReminderDao.updateRemindersToNotified({ reminderIds })
      console.log("Reminder cron executed at", new Date());
    } catch (err) {
      console.error("Scheduler error:", err);
    }
  });
};


module.exports = startReminderScheduler;