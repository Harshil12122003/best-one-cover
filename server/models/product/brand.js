const mongoose = require('mongoose');
const validator = require("validator");

const brandSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: [true, "Please enter mobile brand name"],
        lowercase: true,
        trim: true,
        minlength: 1,
        maxlength: 50
    },
    models: [
        { 
            name:{
                type: String,
                required: [true, "Please enter mobile model name"],
                lowercase: true,
                trim: true,
                minlength: 1,
                maxlength: 50
            },
            active: {
                type: Boolean,
                lowercase: true,
                trim: true,
                default: true
            }
        }
    ],
    active: {
        type: Boolean,
        lowercase: true,
        trim: true,
        default: true
    }

}, { timestamps: true });

module.exports = mongoose.model("brand", brandSchema);