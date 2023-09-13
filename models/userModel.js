const mongoose = require('mongoose');

// schema for taking  user information (REGISTER/ SIGN_UP)
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unquie: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        unquie: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: Number,
        default: 0,
    },
    question: {
        type: String,
        required: true,
        trim: true
    }

},
    { timestamps: true }
)

const User = mongoose.model('users', userSchema);
module.exports = User;