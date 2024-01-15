const jwt = require("jsonwebtoken")
const User = require("../models/user")

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
  
    if (token) {
      jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.redirect('/login');
        } else {
          next();
        }
      });
    } else {
      res.status(401).json({ message: "You need to be logged in" })
      res.redirect('/login');
    }
  };
  
  const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          console.log("Decoded")
          let user = await User.findById(decodedToken.id);
          res.locals.user = user;
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  };
  
  
  module.exports = { requireAuth, checkUser };