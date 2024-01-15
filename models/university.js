const mongoose = require('mongoose')

const UniSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    identifier: {
        type: String,
        required: true,
        unique: true,
    },
    desc: {
        type: String
    },
    reviews:[ {

        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }
]
})