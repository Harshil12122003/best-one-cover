const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const passwordToken = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    token: {
        type: String,
        required: true,
    },
}, {timestamps: true});

module.exports = mongoose.model("token", passwordToken);