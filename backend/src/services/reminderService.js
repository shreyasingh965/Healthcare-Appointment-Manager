const cron = require("node-cron");
const prisma = require("../config/prisma");
const { sendBookingConfirmation } = require("./emailService");

const startReminderService = () => {

    cron.schedule("0 * * * *", async () => {

        console.log("Checking medication reminders...");

        const reminders = await prisma.medicationReminder.findMany({
            where: {
                nextReminder: {
                    lte: new Date()
                }
            },
            include: {
                appointment: true
            }
        });

        for (const reminder of reminders) {

            await sendBookingConfirmation(
                reminder.appointment.patientEmail,
                `Medication: ${reminder.medicine}`,
                reminder.nextReminder
            );

            // Schedule the next reminder for the next day
            await prisma.medicationReminder.update({
                where: {
                    id: reminder.id
                },
                data: {
                    nextReminder: new Date(
                        reminder.nextReminder.getTime() + 24 * 60 * 60 * 1000
                    )
                }
            });
        }

    });

};

module.exports = {
    startReminderService
};