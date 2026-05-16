const mongoose = require('mongoose');
const validator = require("validator");

const discountSchema = new mongoose.Schema({
    name:{
        type: String
    },
    active: {
        type: Boolean
    },
    couponCode:{
        type: String
    },
    per: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

module.exports = mongoose.model("discount", discountSchema);