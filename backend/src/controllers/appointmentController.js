const prisma = require("../config/prisma");

const {
    generatePreVisitSummary,
    generatePostVisitSummary
} = require("../services/aiService");

const {
    sendBookingConfirmation,
    sendCancellationEmail
} = require("../services/emailService");

// =========================
// Create Appointment
// =========================
const createAppointment = async (req, res) => {
    try {

        const {
            patientName,
            patientEmail,
            doctorId,
            appointmentDate,
            symptoms
        } = req.body;

        // Check if doctor exists
        const doctor = await prisma.doctor.findUnique({
            where: {
                id: Number(doctorId)
            }
        });

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }

        // Check if doctor is on leave
        const leave = await prisma.leave.findFirst({
            where: {
                doctorId: Number(doctorId),
                date: new Date(appointmentDate)
            }
        });

        if (leave) {
            return res.status(400).json({
                success: false,
                message: "Doctor is on leave."
            });
        }

        // Prevent double booking
        const existingAppointment = await prisma.appointment.findFirst({
            where: {
                doctorId: Number(doctorId),
                appointmentDate: new Date(appointmentDate)
            }
        });

        if (existingAppointment) {
            return res.status(409).json({
                success: false,
                message: "Appointment slot already booked."
            });
        }

        // Generate AI Pre-Visit Summary
        const summary = await generatePreVisitSummary(symptoms);

        // Create appointment
        const appointment = await prisma.appointment.create({
            data: {
                patientName,
                patientEmail,
                doctorId: Number(doctorId),
                appointmentDate: new Date(appointmentDate),
                symptoms,
                preVisitSummary: summary
            }
        });

        // Send booking confirmation email
        await sendBookingConfirmation(
            patientEmail,
            doctor.name,
            appointmentDate
        );

        res.status(201).json({
            success: true,
            message: "Appointment booked successfully.",
            data: appointment
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// =========================
// Get All Appointments
// =========================
const getAppointments = async (req, res) => {

    try {

        const appointments = await prisma.appointment.findMany({
            include: {
                doctor: true
            }
        });

        res.status(200).json({
            success: true,
            data: appointments
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// =========================
// Get Appointment By ID
// =========================
const getAppointmentById = async (req, res) => {

    try {

        const appointment = await prisma.appointment.findUnique({
            where: {
                id: Number(req.params.id)
            },
            include: {
                doctor: true
            }
        });

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found."
            });
        }

        res.status(200).json({
            success: true,
            data: appointment
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// =========================
// Update Appointment
// =========================
const updateAppointment = async (req, res) => {

    try {

        const {
            prescription,
            postVisitNotes
        } = req.body;

        // Generate AI Post Visit Summary
        const summary = await generatePostVisitSummary(postVisitNotes);
        await prisma.medicationReminder.create({
    data: {
        medicine: prescription,
        frequency: "Daily",
        nextReminder: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        appointmentId: appointment.id
    }
});

        const appointment = await prisma.appointment.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                doctorNotes: postVisitNotes,
                prescription,
                postVisitSummary: summary,
                status: "COMPLETED"
            }
        });

        res.status(200).json({
            success: true,
            message: "Appointment updated successfully.",
            data: appointment
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// =========================
// Delete Appointment
// =========================
const deleteAppointment = async (req, res) => {

    try {

        // Find appointment first
        const appointment = await prisma.appointment.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found."
            });
        }

        // Send cancellation email
        await sendCancellationEmail(
            appointment.patientEmail
        );

        // Delete appointment
        await prisma.appointment.delete({
            where: {
                id: Number(req.params.id)
            }
        });

        res.status(200).json({
            success: true,
            message: "Appointment deleted successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
};