const mongoose = require('mongoose');
const validator = require("validator");

const userSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: [true, "Please enter your first name"],
        lowercase: true,
        trim: true,
        maxlength: [30, "Name cannot exceed 30 characters"],
        minlength: [2, "Name should have more than 2 characters"],
    },
    lname:{
        type: String,
        required: [true, "Please enter your last name"],
        lowercase: true,
        trim: true,
        maxlength: [30, "Name cannot exceed 30 characters"],
        minlength: [2, "Name should have more than 2 characters"],
    },
    email:{
        type: String,
        required: [true, "Please enter your email"],
        lowercase: true,
        trim: true,
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"],
    },
    mobile:{
        type: Number,
        required: [true, "Please enter your mobile"],
        trim: true,
        unique: true 
    },
    password:{
        type: String,
        required: [true, "Please enter your password"],
        trim: true,
        minlength: [8, "Password minimum 8 characters are long"]
    },
    avatar: {
        public_id: {
            type: String,
            trim: true
        },
        url: {
            type: String,
            trim: true
        },
    },
    address: {
        address: {
            type: String,
            lowercase: true,
            trim: true
        },
        landmark: {
            type: String,
            lowercase: true,
            trim: true
        },
        city: {
            type: String,
            lowercase: true,
            trim: true
        },
        state: {
            type: String,
            lowercase: true,
            trim: true
        },
        pinCode: {
            type: Number,
            trim: true
        },
    }
}, {timestamps: true});

module.exports = mongoose.model("user", userSchema);