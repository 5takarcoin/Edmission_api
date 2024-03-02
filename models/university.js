const mongoose = require('mongoose')

const subnmajorSchema = new mongoose.Schema({
    submaj: String,
    seats: Number,
    profs: Number,
    lects: Number,
    creds: Number,
    estlow: Number,
    esthigh: Number,
    syl: String,
})
const scholarshipListSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    noyears: Number,
    requirements: String,
    details: String,
})
const quotaListSchema = new mongoose.Schema({
    name: String,
    requirements: String,
    details: String,
})

// const notableAlumniSchema = new mongoose.Schema({
//     name: String,
//     desc: String,
//     img: String,
// })

const rankingSchema = new mongoose.Schema({
    position: string,
    ranking: string,
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
        // type: String
        type: {
            qs: {
                type: [rankingSchema]
            },
            the: {
                type: [rankingSchema]
            }
        }
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
    // notable_alumni: [notableAlumniSchema]
    notable_alumni: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Alumni"
    }]
})

// UniSchema.virtual()

module.exports = mongoose.model("University", UniSchema)