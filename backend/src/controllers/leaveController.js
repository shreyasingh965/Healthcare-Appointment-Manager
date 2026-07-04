const prisma = require("../config/prisma");

// Add Leave
const addLeave = async (req, res) => {
    try {

        const { doctorId, date } = req.body;

        const leave = await prisma.leave.create({
            data: {
                doctorId: Number(doctorId),
                date: new Date(date)
            }
        });

        res.status(201).json({
            success: true,
            message: "Leave added successfully",
            data: leave
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Leaves
const getLeaves = async (req, res) => {
    try {

        const leaves = await prisma.leave.findMany({
            include: {
                doctor: true
            }
        });

        res.json({
            success: true,
            data: leaves
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Leave
const deleteLeave = async (req, res) => {
    try {

        await prisma.leave.delete({
            where: {
                id: Number(req.params.id)
            }
        });

        res.json({
            success: true,
            message: "Leave deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    addLeave,
    getLeaves,
    deleteLeave
};