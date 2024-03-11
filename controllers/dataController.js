const User = require("../models/user")
const University = require("../models/university")
const Review = require("../models/review")
const handleErrors = require("../utils/errorhandler")
const uploadOnCloudinary = require("../utils/cloudinary")
const flattenObject = require("../utils/usefuls")

module.exports.get_users = async (req, res) => {
    try {
        const users = await User.find()
        console.log(users)
        res.send(users)
    } catch (err) {
        ///////////////////////////////////////////////////////////////////
        // NEED WORK
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.get_user = async (req, res) => {
    try {
        const user = await User.find({ username: req.params.username })
        res.send(user)
    } catch (err) {
        ///////////////////////////////////////////////////////////////////
        // NEED WORK
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.add_uni = async (req, res) => {
    try {
        const imageLocalPath = req.files['image'][0]?.path;
        let url = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
        if (imageLocalPath) {
            const image = await uploadOnCloudinary(imageLocalPath)
            url = image.url
        }
        const logoLocalPath = req.files['logo'][0]?.path;
        let logoUrl = "wave_up.svg"
        if (logoLocalPath) {
            const logo = await uploadOnCloudinary(logoLocalPath)
            logoUrl = logo.url
        }
        const newUni = { ...req.body, subject_majors: JSON.parse(req.body.subject_majors), img: url, logo: logoUrl }
        console.log(newUni)
        const uni = await University.create(newUni)
        res.status(201).json(uni);
    } catch (err) {
        console.log(err)
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.get_unis = async (req, res) => {
    try {
        const unis = await University.find()
        console.log(unis)
        res.send(unis)
    } catch (err) {
        ///////////////////////////////////////////////////////////////////
        // NEED WORK
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}


module.exports.get_filtered_unis = async (req, res) => {
    try {
        const filter = { ...req.body }
        const flattenFilter = flattenObject(filter)
        const unis = await University.find(flattenFilter)
        console.log(filter)
        res.send(unis)
    } catch (err) {
        ///////////////////////////////////////////////////////////////////
        // NEED WORK
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}


module.exports.get_uni = async (req, res) => {
    try {
        const uni = await University.find({ identifier: req.params.id }).populate({
            path: 'reviews',
            populate: 'by'
        }).exec()
        res.send(uni)
    } catch (err) {
        ///////////////////////////////////////////////////////////////////
        // NEED WORK
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.add_review = async (req, res) => {

    try {
        const newRev = { ...req.body }
        const rev = await Review.create(newRev)

        const identi = req.params.id;
        const filter = { identifier: identi };
        const nuni = await University.find(filter);
        const uni = nuni[0]._doc;
        let currRev = uni.reviews;

        const all_revs = [rev._id, ...currRev];

        const updated = { ...uni, reviews: all_revs };
        await University.findByIdAndUpdate(uni._id, updated);

        const populatedUni = await University.findById(uni._id).populate({
            path: 'reviews',
            populate: 'by'
        }).exec();

        console.log(populatedUni.reviews);
        res.status(201).json(populatedUni.reviews);
    } catch (err) {
        console.log(err)
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.update_uni = async (req, res) => {
    try {
        const imageLocalPath = req.files['image']?.[0]?.path;
        let url = req.body.img
        if (imageLocalPath) {
            const image = await uploadOnCloudinary(imageLocalPath)
            url = image.url
        }
        const logoLocalPath = req.files['logo']?.[0]?.path;
        let logoUrl = req.body.logo
        if (logoLocalPath) {
            const logo = await uploadOnCloudinary(logoLocalPath)
            logoUrl = logo.url
        }
        const newRank = {
            qs: JSON.parse(req.body.rankings.qs),
            the: JSON.parse(req.body.rankings.the)
        }
        console.log("Below new Rank")
        console.log(newRank)

        const other = {
            rankings: {...newRank}, subject_majors: JSON.parse(req.body.subject_majors), img: url, logo: logoUrl
        }
        const newUni = { ...req.body, ...other }
        console.log("++++++++++++++++++++++++++++++++")
        console.log(newUni.name)
        console.log(newUni)
        console.log("++++++++++++++++++++++++++++++++")
        const uni = await University.findByIdAndUpdate(newUni._id, newUni)
        res.status(201).json(uni);
    } catch (err) {
        console.log(err)
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}


module.exports.get_all_reviews = async (req, res) => {
    try {
        const uni = await University.find({ identifier: req.params.id })
        res.send(uni.reviews)
    } catch (err) {
        ///////////////////////////////////////////////////////////////////
        // NEED WORK
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}
