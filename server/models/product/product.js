const mongoose = require('mongoose');
const validator = require("validator");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter cover name"],
        lowercase: true,
        trim: true,
        minlength: 1,
    },
    desc: {
        type: String,
        required: [true, "Please enter description"],
        lowercase: true,
        trim: true,
        minlength: 1,
    },
    brand: {
        type: String,
        required: [true, "Please enter mobile brand name"],
        lowercase: true,
        trim: true,
        minlength: 1,
        maxlength: 50
    },
    model:{
        type: String,
        required: [true, "Please enter mobile model name"],
        lowercase: true,
        trim: true,
        minlength: 1,
        maxlength: 50
    },
    category: {
        type: String,
        required: [true, "Please enter category name"],
        lowercase: true,
        trim: true,
        minlength: 1,
        maxlength: 50
    },
    coverBrand: {
        type: String,
        lowercase: true,
        trim: true,
        minlength: 0,
        maxlength: 50
    },
    price: {
        type: Number,
        required: [true, "Please enter price"],
        trim: true,
        min: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
                trim: true
            },
            url: {
                type: String,
                required: true,
                trim: true
            },
        }
    ],
    color: {
        type: String,
        required: [true, "Please enter color"],
        lowercase: true,
        trim: true
    },
    qty: {
        type: Number,
        required: [true, "Please enter quantity"],
        trim: true,
        min: 0,
        default: 0
    },
    discount:{
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "discount",
        type:{
            type: String,
            trim: true,
            default:"No Discount"
        },
        value: {
            type: Number,
            trim: true,
            default: 0
        }
    },
    finalPrice: {
        type: Number,
        required: [true, "Please enter final price"],
        trim: true,
        min: 0
    },
    stock: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stock",
        required: true,
        trim: true
    },
    active: {
        type: Boolean,
        lowercase: true,
        trim: true,
        default: true
    }

}, { timestamps: true });

module.exports = mongoose.model("product", productSchema);