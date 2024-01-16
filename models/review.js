const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema({
    view: {
        type: String,
        required: true,
    },
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
})