const mongoose = require('mongoose');
const validator = require("validator");

const counterSchema = new mongoose.Schema({
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "shop",
        required: true,
        trim: true
    },
    totalAmount:{
        type: Number,
        required: true,
        trim: true,
        min: 0
    },
    counterDate: {
        type: Date,
        required: true,
        trim: true,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model("counter", counterSchema);