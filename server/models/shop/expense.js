const mongoose = require('mongoose');
const validator = require("validator");

const expenseSchema = new mongoose.Schema({
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "shop",
        required: true,
        trim: true
    },
    expense: [
        {
            type: {
                type: String,
                required: true,
                lowercase: true,
                trim: true,
            },
            amount: {
                type: Number,
                required: true,
                trim: true,
                min: 0,
            }
        }
    ],
    totalAmount:{
        type: Number,
        required: true,
        trim: true,
        min: 0
    },
    expenseDate: {
        type: Date,
        required: true,
        trim: true,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model("expense", expenseSchema);