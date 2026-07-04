const express = require("express");

const router = express.Router();

const {
    addLeave,
    getLeaves,
    deleteLeave
} = require("../controllers/leaveController");

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

// Admin Only
router.post("/", protect, authorize("ADMIN"), addLeave);

router.delete("/:id", protect, authorize("ADMIN"), deleteLeave);

// Logged In Users
router.get("/", protect, getLeaves);

module.exports = router;