const mongoose = require('mongoose');
const validator = require("validator");

const stockSchema = new mongoose.Schema({
    brand: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "brand",
            required: true,
            trim: true
        },
        name: {
            type: String,
            required: [true, "Please enter mobile brand name"],
            lowercase: true,
            trim: true,
            minlength: 1,
            maxlength: 100
        }
    },
    model: {
        id: {
            type: String,
            required: true,
            trim: true
        },
        name: {
            type: String,
            required: [true, "Please enter mobile model name"],
            lowercase: true,
            trim: true,
            minlength: 1,
            maxlength: 100
        }
    },
    category: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "category",
            required: true,
            trim: true
        },
        name: {
            type: String,
            required: [true, "Please enter category name"],
            lowercase: true,
            trim: true,
            minlength: 1,
            maxlength: 100
        }
    },
    coverBrand: {
        type: String,
        lowercase: true,
        trim: true,
        minlength: 0,
        maxlength: 100
    },
    color: {
        type: String,
        required: [true, "Please enter color"],
        lowercase: true,
        trim: true
    },
    buyPrice: {
        type: Number,
        required: [true, "Please enter buying price"],
        trim: true,
        min: 0
    },
    qty: {
        type: Number,
        required: [true, "Please enter quantity"],
        trim: true,
        min: 0,
        default: 0,
    },
    images: [
        {
            public_id: {
                type: String,
                // required: true,
                trim: true
            },
            url: {
                type: String,
                // required: true,
                trim: true
            },
        }
    ],
    active: {
        type: Boolean,
        lowercase: true,
        trim: true,
        default: true
    }
    
}, { timestamps: true });

module.exports = mongoose.model("stock", stockSchema);