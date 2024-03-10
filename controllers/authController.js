const User = require("../models/user");
const uploadOnCloudinary = require("../utils/cloudinary");
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
        const imageLocalPath = req.file?.path;
        url = "https://i.stack.imgur.com/l60Hf.png"
        if(imageLocalPath) {
          const image = await uploadOnCloudinary(imageLocalPath)
          url = image.url
        }
        const newUser = { ...req.body, image: url}
        const user = await User.create(newUser)
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true });
        res.status(201).json({ user: user._id, image: url });
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
        res.status(200).json({ user: user._id, name: user.name, username: user.username, image: user.image });
    } catch(err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
  }

module.exports.current_user = (req, res) => {
  const token = req.cookies.jwt;
  console.log(token)
  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.send(user);
        console.log("Valo valo")
      }
    });
  } else {
    res.send({})
  }
}