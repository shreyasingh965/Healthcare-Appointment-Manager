const express = require("express");

const router = express.Router();

const { getUsers } = require("../controllers/testController");

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

router.get(
    "/users",
    protect,
    authorize("ADMIN"),
    getUsers
);

module.exports = router;