const mongoose = require('mongoose');
const validator = require("validator");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter category name"],
        lowercase: true,
        trim: true
    },
    // images: [
    //     {
    //         public_id: {
    //             type: String,
    //             required: true,
    //             trim: true
    //         },
    //         url: {
    //             type: String,
    //             required: true,
    //             trim: true
    //         },
    //     }
    // ],
    active: {
        type: Boolean,
        lowercase: true,
        trim: true,
        default: true
    }
    
}, { timestamps: true });

module.exports = mongoose.model("category", categorySchema);