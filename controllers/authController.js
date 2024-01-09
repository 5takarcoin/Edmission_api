const User = require("../models/user")
const handleErrors = require("../utils/errorhandler")

const jwt = require("jsonwebtoken")

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET);
};

module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.send(process.env.SECRET)
  res.render('login');
}

module.exports.signup_post = async (req, res) => {
    try{
        const user = await User.create(req.body)
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true });
        res.status(201).json({ user: user._id });
    } catch(err) {
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
        res.status(200).json({ user: user._id });
    } catch(err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
  }