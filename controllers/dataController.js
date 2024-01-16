const User = require("../models/user")
const University = require("../models/university")
const handleErrors = require("../utils/errorhandler")

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
    try{
        const uni = await University.create(req.body)
        res.status(201).json({ uni: uni._id });
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