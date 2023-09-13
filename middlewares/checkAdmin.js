const userModel = require('../models/userModel');

module.exports.isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found !"
            })
        }
        if (user.role !== 1) {
            return res.status(401).json({
                success: false,
                message: " Unauthorizised access"
            })
        } else {
            next();
        }
    } catch (error) {
        let errMsg = error.message;
        if (process.env.environment === "production") {
            errMsg = "Internal Server Error!";
        }
        return res.status(500).json({
            success: false,
            message: errMsg,
        });
    }
}