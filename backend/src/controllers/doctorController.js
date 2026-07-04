const prisma = require("../config/prisma");

// Create Doctor
const createDoctor = async (req, res) => {
    try {
        const doctor = await prisma.doctor.create({
            data: req.body
        });

        res.status(201).json({
            success: true,
            message: "Doctor created successfully",
            data: doctor
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Doctors
const getDoctors = async (req, res) => {
    try {
        const doctors = await prisma.doctor.findMany();

        res.json({
            success: true,
            data: doctors
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Doctor By ID
const getDoctorById = async (req, res) => {
    try {
        const doctor = await prisma.doctor.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }

        res.json({
            success: true,
            data: doctor
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Doctor
const updateDoctor = async (req, res) => {
    try {

        const doctor = await prisma.doctor.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        });

        res.json({
            success: true,
            message: "Doctor updated successfully",
            data: doctor
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Doctor
const deleteDoctor = async (req, res) => {
    try {

        await prisma.doctor.delete({
            where: {
                id: Number(req.params.id)
            }
        });

        res.json({
            success: true,
            message: "Doctor deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Search by Specialization
const searchDoctors = async (req, res) => {
    try {

        const { specialization } = req.query;

        const doctors = await prisma.doctor.findMany({
            where: {
                specialization: {
                    contains: specialization,
                    mode: "insensitive"
                }
            }
        });

        res.json({
            success: true,
            data: doctors
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createDoctor,
    getDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
    searchDoctors
};