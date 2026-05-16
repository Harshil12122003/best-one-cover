const mongoose = require('mongoose');
const validator = require("validator");

const contactSchema = new mongoose.Schema({
    name: {  
        type: String,
        required: [true, "Please enter your name"],
        lowercase: true,
        trim: true
    },
    email:{
        type: String,
        required: [true, "Please enter your email"],
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, "Please enter a valid email"],
    },
    message: {
        type: String,
        required: [true, "Please enter your message"],
        lowercase: true,
        trim: true,
        minlength: 1,
    },

}, { timestamps: true });

module.exports = mongoose.model("contact", contactSchema);