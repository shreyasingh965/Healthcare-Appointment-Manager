require("dotenv").config();
const { startReminderService } = require("./src/services/reminderService");
const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

    // Start medication reminder scheduler
    startReminderService();
});