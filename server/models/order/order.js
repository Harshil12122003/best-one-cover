const mongoose = require('mongoose');
const validator = require("validator");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        trim: true
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true,
                lowercase: true,
                trim: true
            },
            price: {
                type: Number,
                required: true,
                trim: true,
                min: 0
            },
            quantity: {
                type: Number,
                required: true,
                trim: true,
                min: 0,
                default: 1
            },
            itemPrice: {
                type: Number,
                required: true,
                trim: true,
                min: 0
            },
            image: {
                type: String,
                required: true,
                trim: true
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: true,
                trim: true
            }
        }
    ],
    shippingInfo: {
        name: {
            type: String,
            required: [true, "Please enter your name"],
            lowercase: true,
            trim: true,
            maxlength: [30, "Name cannot exceed 30 characters"],
            minlength: [2, "Name should have more than 2 characters"],
        },
        email: {
            type: String,
            required: [true, "Please enter your email"],
            lowercase: true,
            trim: true,
            validate: [validator.isEmail, "Please enter a valid email"]
        },
        mobile: {
            type: Number,
            required: [true, "Please enter your mobile"],
            trim: true
        },
        address: {
            type: String,
            required: [true, "Please enter your address"],
            lowercase: true,
            trim: true
        },
        landmark: {
            type: String,
            required: [true, "Please enter your landmark"],
            lowercase: true,
            trim: true
        },
        city: {
            type: String,
            required: [true, "Please enter your city"],
            lowercase: true,
            trim: true
        },
        state: {
            type: String,
            required: [true, "Please enter your state"],
            lowercase: true,
            trim: true
        },
        pinCode: {
            type: Number,
            required: [true, "Please enter your pincode"],
            trim: true
        },
    },
    totalQty: {
        type: Number,
        required: true,
        trim: true,
        min: 0,
    },
    itemsPrice: {
        type: Number,
        required: true,
        trim: true,
        min: 0
    },
    discount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "discount"
    },
    taxPrice: {
        type: Number,
        required: true,
        trim: true,
        default: 0
    },
    shippingPrice: {
        type: Number,
        required: true,
        trim: true,
        default: 0
    },
    totalPrice: {
        type: Number,
        required: true,
        trim: true,
        default: 0
    },
    rzp_orderId:{
        type: String,
        trim: true
    },
    paymentInfo: {
        id: {
            type: String,
            trim: true
        },
        status: {
            type: String,
            lowercase: true,
            trim: true,
            default: "processing"
        },
    },
    orderDate: {
        type: Date,
        required: true,
        trim: true,
        default: Date.now
    },
    shippingDate: {
        type: Date,
        required: true,
        trim: true
    },
    paymentMethod: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        default: "cod"
    },
    orderStatus: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        default: "pending"
    }
}, { timestamps: true });

module.exports = mongoose.model("order", orderSchema);