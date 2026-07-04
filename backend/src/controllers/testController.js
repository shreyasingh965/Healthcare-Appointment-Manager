const prisma = require("../config/prisma");

const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
    select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
    }
});
        res.json({
            success: true,
            data: users
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    getUsers
};