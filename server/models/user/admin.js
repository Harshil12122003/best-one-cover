const mongoose = require('mongoose');
const validator = require("validator");

const adminSchema = new mongoose.Schema({
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "shop",
        // required: true,
        trim: true
    },
    fname:{
        type: String,
        // required: [true, "Please Enter Your First Name"],
        lowercase: true,
        trim: true,
        maxlength: [30, "Name cannot exceed 30 characters"],
        minlength: [2, "Name should have more than 2 characters"],
    },
    lname:{
        type: String,
        // required: [true, "Please Enter Your Last Name"],
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
        // required: [true, "Please Enter Your Mobile"],
        // default: 0,
        trim: true,
        // unique: true,
    },
    password:{
        type: String,
        // required: [true, "Please Enter Your Password"],
        trim: true,
        minlength: [8, "Password minimum 8 characters are long"]
    },
    role: {
        type: String,
        required: [true, "Please enter role"],
        lowercase: true,
        trim: true
    },
    avatar: {
        public_id: {
            type: String,
            trim: true,
        },
        url: {
            type: String,
            trim: true,
        },
    }
}, {timestamps: true});

module.exports = mongoose.model("admin", adminSchema);