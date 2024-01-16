const mongoose = require('mongoose')

const subnmajorSchema = new mongoose.Schema({something: String})
const scholarshipListSchema = new mongoose.Schema({something: String})
const quotaListSchema = new mongoose.Schema({something: String})

const notableAlumniSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img: String,
})

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
    img: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    about: {
        type: {
            website: String,
            location: String,
            unitype: {
                type: String,
                enum: ["Public", "Private", "Other"]
            },
            unigenre: {
                type: String,
                enum: ["Engineering", "Medical", "Other"]
            },
            creditsystem: {
                type: String,
                enum: ["Open", "Closed"]
            },
            tutionfee: Number
        }
    },
    rankings: {
        type: String
    },
    admission_details: {
        type: {
            acceptancerate: Number,
            examsystem: {
                type: String,
                enum: ["Autonomus", "No exams"],
            },
            selectionprocedure: String,
            quota: Boolean,
            scholarship: String,
        }
    },
    application_details: {
        website: String,
        deadline: Date,
        fee: String,
        requirements: String,
    },
    subject_majors: [subnmajorSchema],
    
    quota_list:[quotaListSchema],
    scholarship_list:[scholarshipListSchema],

    campus_info: {
        type: {
            campus: {
                type: String,
                enum: ["Urban", "City?", "Dunno"]
            },
            permanent: Boolean,
            housing: Boolean,
        }
    },
    life_after_graduation: {
        type: {
            gradtime: Number,
            salary: Number,
            employment: String,
        }
    },
    eca_opportunity: {
        total_clubs: Number,
        clubs: [String],
    },
    reviews:[{

        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }],
    notable_alumni: [notableAlumniSchema]
})

module.exports = mongoose.model("University", UniSchema)