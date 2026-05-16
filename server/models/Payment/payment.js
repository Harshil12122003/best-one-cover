const mongoose = require('mongoose');
const validator = require("validator");

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        trim: true
    },
    paymentId:{
        type: String,
        required: true,
        trim: true
    },
    orderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        trim: true,
        min: 0,
    },
    paymentDate: {
        type: Date,
        required: true,
        trim: true,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        default: "processing"
    }
}, { timestamps: true });

module.exports = mongoose.model("payment", paymentSchema);