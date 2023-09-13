const userModel = require('../models/userModel');
const bcrypt = require('../helper/bcrypt');
const jwt = require('jsonwebtoken');

module.exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, address, question } = req.body;
        //validations
        if (!name) {
            res.send({ message: "Name is required !" });
        }
        if (!email) {
            res.send({ message: "Email is required !" });
        }
        if (!password) {
            res.send({ message: "Password is required !" });
        }
        if (!phone) {
            res.send({ message: "Phone is required !" });
        }
        if (!address) {
            res.send({ message: "Address is required !" });
        }
        if (!question) {
            res.send({ message: "Question is required !" });
        }

        //checking existing for user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(401).json({
                success: false,
                message: "User Already Exists! Please Go and Sign-in!"
            })
        } else {
            {
                //Encripting user password
                const hashedpassword = await bcrypt.creatHashPass(password);

                // creating newUser
                const newUser = await userModel.create({
                    name: name,
                    email: email,
                    password: hashedpassword,
                    phone: phone,
                    address: address,
                    question: question
                });
                await newUser.save();
                return res.status(200).json({
                    success: true,
                    message: "User registered successfully !!",
                    newUser
                })
            }
        }

    } catch (message) {
        let errMsg = message.message;
        if (process.env.environment === 'production') {
            return res.status(500).json({
                success: false,
                message: errMsg
            })
        } else {
            return res.status(500).json({
                success: false,
                message: errMsg
            })
        }

    }
}

module.exports.signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                success: flase,
                message: "Invalid email / password",
            })
        }
        // finding user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            })
        }
        const hashedpassword = user.password;
        const match = await bcrypt.comparePass(password, hashedpassword);
        if (!match) {
            return res.status(404).json({
                success: false,
                message: "Invalid email / password!"
            })
        }
        console.log(process.env.JWT_SECRET_KEY);
        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
        return res.status(200).json({
            success: true,
            message: "User logged_In successfully",
            user: user,
            token: token
        })


    } catch (message) {
        let errMsg = message.message;
        if (process.env.environment === 'production') {
            return res.status(500).json({
                success: false,
                message: "Internal server message"
            })
        } else {
            return res.status(500).json({
                success: false,
                message: errMsg
            })
        }
    }
}

//controller for testing only
module.exports.testing = (req, res) => {
    try {
        res.send('<h1> Testing okey </h1>');
    } catch (message) {
        console.log(message);
    }

}

module.exports.forgotPasswordController = async (req, res) => {
    try {
        const { email, question, newPassword } = req.body
        //validation
        if (!email) {
            return res.status(400).json({
                message: "Email is required!"
            })
        }
        if (!question) {
            return res.status(400).json({
                message: "Question is required!"
            })
        }
        if (!newPassword) {
            return res.status(400).json({
                message: "NewPassword is required!"
            })
        }

        //check user in database
        const user = await userModel.findOne({ email, question });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Wrong email / question!"
            })
        }
        // encripting password
        const hashed = await bcrypt.creatHashPass(newPassword);
        // updating password
        await userModel.findByIdAndUpdate(user._id, {
            password: hashed
        })
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Password updated successfully!"
        })
    } catch (error) {
        let errMsg = error.message;
        if (process.env.environment === 'production') {
            return res.status(500).json({
                success: false,
                message: "Internal server message"
            })
        } else {
            return res.status(500).json({
                success: false,
                message: errMsg
            })
        }
    }
}