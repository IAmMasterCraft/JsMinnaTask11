const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create People Schema
const Customer = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        index: { unique: true },
    },
    mobile_number: {
        type: String,
    },
    address: {
        type: String,
    },
    gender: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    dateGenerated: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model("Customer", Customer);