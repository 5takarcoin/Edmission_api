const mongoose = require("mongoose");


const notableAlumniSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img: String,
})