const express = require("express");

const router = express.Router();

const {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
} = require("../controllers/appointmentController");

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

// Patient - Book Appointment
router.post("/", protect, authorize("PATIENT"), createAppointment);

// All Logged-in Users - View All Appointments
router.get("/", protect, getAppointments);

// All Logged-in Users - View Appointment by ID
router.get("/:id", protect, getAppointmentById);

// Doctor - Update Appointment
router.put("/:id", protect, authorize("DOCTOR"), updateAppointment);

// Admin - Delete Appointment
router.delete("/:id", protect, authorize("ADMIN"), deleteAppointment);

module.exports = router;