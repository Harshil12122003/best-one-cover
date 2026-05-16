const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const notification = new Schema({
    userId: {
        type: String,
        // required: true,
        // type: Schema.Types.ObjectId,
        // required: true,
        // ref: "user",
    },
    message: {
        type: String,
    },
    shop: {
        type: Boolean,
    },
    stockId:{
        type: Schema.Types.ObjectId,
        // required: true,
        ref: "stock",
    },  
    stock: {
        type: Boolean,
    }
}, { timestamps: true });

module.exports = mongoose.model("notification", notification);