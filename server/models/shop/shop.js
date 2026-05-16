const mongoose = require('mongoose');
const validator = require("validator");

const shopSchema = new mongoose.Schema({
    shopName: {  
        type: String,
        required: [true, "Please enter branch name"],
        lowercase: true,
        trim: true
    },
    shopAddress: {
        address: {
            type: String,
            required: [true, "Please enter address"],
            lowercase: true,
            trim: true
        },
        landmark: {
            type: String,
            required: [true, "Please enter landmark"],
            lowercase: true,
            trim: true
        },
        city: {
            type: String,
            required: [true, "Please enter city"],
            lowercase: true,
            trim: true
        },
        state: {
            type: String,
            required: [true, "Please enter state"],
            lowercase: true,
            trim: true
        },
        pincode: {
            type: Number,
            required: [true, "Please enter pincode"],
            trim: true
        }
    },
    active: {
        type: Boolean,
        lowercase: true,
        trim: true,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model("shop", shopSchema);