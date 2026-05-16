const mongoose = require('mongoose');
const validator = require("validator");

const shopOrderSchema = new mongoose.Schema({
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "shop",
        required: true,
        trim: true
    },
    orderItems: [
        {
            brand:{
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "brand",
                    required: true,
                    trim: true
                },
                name: {
                    type: String,
                    required: true,
                    lowercase: true,
                    trim: true,
                    minlength: 1,
                    maxlength: 100
                }
            },
            model:{
                id: {
                    type: String,
                    required: true,
                    trim: true
                },
                name: {
                    type: String,
                    required: true,
                    lowercase: true,
                    trim: true,
                    minlength: 1,
                    maxlength: 100
                }
            },
            category:{
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "category",
                    required: true,
                    trim: true
                },
                name: {
                    type: String,
                    required: true,
                    lowercase: true,
                    trim: true,
                    minlength: 1,
                    maxlength: 100
                }
            },
            color: {
                type: String,
                required: [true, "Please enter color"],
                lowercase: true,
                trim: true
            },
            qty: {
                type: Number,
                required: true,
                trim: true,
                min: 0,
                default: 1
            },
            price: {
                type: Number,
                required: true,
                trim: true,
                min: 0,
            },
            totalPrice: {
                type: Number,
                required: true,
                trim: true,
                min: 0,
            },
            stock: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "stock",
                required: true,
                trim: true
            }
        }
    ],
    totalQty: {
        type: Number,
        required: true,
        trim: true,
        min: 0,
    },
    totalAmount: {
        type: Number,
        required: true,
        trim: true,
        min: 0,
    },
    orderDate: {
        type: Date,
        required: true,
        trim: true,
        default: Date.now
    },
    orderStatus: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        default: "processing"
    }
}, { timestamps: true });

module.exports = mongoose.model("shopOrder", shopOrderSchema);