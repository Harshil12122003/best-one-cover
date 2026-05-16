const mongoose = require('mongoose');
const validator = require("validator");

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        trim: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
        trim: true
    },
    total: {
        type: Number,
        required: true,
        trim: true,
        min: 0,
        default: 0
    },
    qty: {
        type: Number,
        required: true,
        trim: true,
        min: 0,
        default: 0,
    },
}, { timestamps: true });

module.exports = mongoose.model("cart", cartSchema);