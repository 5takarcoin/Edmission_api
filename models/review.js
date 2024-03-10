const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema({
    view: {
        type: String,
        required: true,
    },
    recommend: {
        type: Boolean,
        required: true,
    },
    stars: {
        type: Number,
        required: true,
    },
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Review", ReviewSchema)
