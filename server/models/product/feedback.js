const mongoose = require('mongoose');
const validator = require("validator");

const feedbackSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    review: {
        type: String,
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

}, { timestamps: true });

module.exports = mongoose.model("feedback", feedbackSchema);