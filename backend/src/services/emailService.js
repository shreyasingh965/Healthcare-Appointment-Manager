const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendBookingConfirmation = async (email, doctorName, appointmentDate) => {

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Appointment Booked Successfully",
        html: `
            <h2>Healthcare Appointment Manager</h2>

            <p>Your appointment has been booked successfully.</p>

            <p><strong>Doctor:</strong> ${doctorName}</p>

            <p><strong>Date:</strong> ${appointmentDate}</p>

            <br>

            <p>Thank you.</p>
        `
    });

};

const sendCancellationEmail = async (email) => {

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Appointment Cancelled",
        html: `
            <h2>Healthcare Appointment Manager</h2>

            <p>Your appointment has been cancelled.</p>
        `
    });

};

module.exports = {
    sendBookingConfirmation,
    sendCancellationEmail
};