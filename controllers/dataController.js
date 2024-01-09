const User = require("../models/user")
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