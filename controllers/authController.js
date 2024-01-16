const User = require("../models/user")
const handleErrors = require("../utils/errorhandler")

const jwt = require("jsonwebtoken")

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET);
};

module.exports.signup_get = (req, res) => {
  res.send({ name: null})
}

module.exports.login_get = (req, res) => {
  res.send(null)
}

module.exports.signup_post = async (req, res) => {
    try{
        const newUser = { ...req.body, image: req.file.filename}
        const user = await User.create(newUser)
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true });
        res.status(201).json({ user: user._id });
    } catch(err) {
      console.log(err)
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.login_post = async (req, res) => {
    try{
        const { username, password } = req.body
        const user = await User.login(username, password)
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true });
        res.status(200).json({ user: user._id, name: user.name, image: user.image });
    } catch(err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
  }