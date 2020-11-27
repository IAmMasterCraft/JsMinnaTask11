const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create People Schema
const Item = new Schema({
    item_name: {
        type: String,
        required: true,
    },
    item_description: {
        type: String,
        required: true,
    },
    item_category: {
        type: String,
    },
    reasons: {
        type: String,
    },
    dateGenerated: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model("Item", Item);