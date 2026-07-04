const express = require("express");

const router = express.Router();

const {
    createDoctor,
    getDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
    searchDoctors
} = require("../controllers/doctorController");

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

// ADMIN
router.post("/", protect, authorize("ADMIN"), createDoctor);
router.put("/:id", protect, authorize("ADMIN"), updateDoctor);
router.delete("/:id", protect, authorize("ADMIN"), deleteDoctor);

// Logged in Users
router.get("/", protect, getDoctors);
router.get("/search", protect, searchDoctors);
router.get("/:id", protect, getDoctorById);

module.exports = router;