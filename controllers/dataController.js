const User = require("../models/user")
const University = require("../models/university")
const Review = require("../models/review")
const handleErrors = require("../utils/errorhandler")
const uploadOnCloudinary = require("../utils/cloudinary")
const flattenObject = require("../utils/usefuls")

module.exports.get_users = async (req, res) => {
    try{
        const users = await User.find()
        console.log(users)
        res.send(users)
    } catch(err) {
        ///////////////////////////////////////////////////////////////////
        // NEED WORK
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.get_user = async (req, res) => {
    try{
        const user = await User.find({ username: req.params.username })
        res.send(user)
    } catch(err) {
        ///////////////////////////////////////////////////////////////////
        // NEED WORK
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.add_uni = async (req, res) => {
    // try{
    //     const uni = await University.create(req.body)
    //     res.status(201).json({ uni: uni._id });
    // } catch(err) {
    //   console.log(err)
    //     const errors = handleErrors(err)
    //     res.status(400).json({ errors })
    // }

    try{
        const imageLocalPath = req.img?.path;
        const url = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
        if(imageLocalPath) {
          const image = await uploadOnCloudinary(imageLocalPath)
          url = image.url
        }
        const logoLocalPath = req.logo?.path;
        const logoUrl = "wave_up.svg"
        if(logoLocalPath) {
          const logo = await uploadOnCloudinary(imageLocalPath)
          logoUrl = logo.url
        }
        const newUni = { ...req.body, img: url, logo: logoUrl}
        console.log(newUni)
        const uni = await University.create(newUni)
        res.status(201).json(uni);
    } catch(err) {
      console.log(err)
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.get_unis = async (req, res) => {
    try{
        const unis = await University.find()
        console.log(unis)
        res.send(unis)
    } catch(err) {
        ///////////////////////////////////////////////////////////////////
        // NEED WORK
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}


module.exports.get_filtered_unis = async (req, res) => {
    try{
        const filter = { ...req.body }
        const flattenFilter = flattenObject(filter)
        const unis = await University.find(flattenFilter)
        console.log(filter)
        res.send(unis)
    } catch(err) {
        ///////////////////////////////////////////////////////////////////
        // NEED WORK
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}


module.exports.get_uni = async (req, res) => {
    try{
        const uni = await University.find({ identifier: req.params.id })
        res.send(uni)
    } catch(err) {
        ///////////////////////////////////////////////////////////////////
        // NEED WORK
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.add_review = async (req, res) => {

    try{
        const newRev = { ...req.body }
        console.log("Areeey boddaaaa")
        console.log(newRev)


        const rev = await Review.create(newRev)
        res.status(201).json(rev);
    } catch(err) {
      console.log(err)
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.update_uni = async (req, res) => {
      try{
        const imageLocalPath = req.files[0]?.path;
        console.log(req.files[0])
        // console.log(req.tanvirMsg)
        console.log(imageLocalPath)
        const url = req.body.img
        if(imageLocalPath) {
          const image = await uploadOnCloudinary(imageLocalPath)
          url = image.url
        }
        const logoLocalPath = req.files[1]?.path;
        console.log(logoLocalPath)
        const logoUrl = req.body.logo
        if(logoLocalPath) {
          const logo = await uploadOnCloudinary(logoLocalPath)
          logoUrl = logo.url
        }
        const newUni = { ...req.body, img: url, logo: logoUrl}
        console.log("++++++++++++++++++++++++++++++++")
        console.log(newUni.name)
        console.log(newUni)
        console.log("++++++++++++++++++++++++++++++++")
        const uni = await University.findByIdAndUpdate(newUni._id, newUni)
        res.status(201).json(uni);
    } catch(err) {
      console.log(err)
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}
