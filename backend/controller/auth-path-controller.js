const User = require("../models/user-model");
const shortId = require("shortid"); // used to generate username and profile
const jwt = require("jsonwebtoken"); // for jwt token
const expressJwt = require("express-jwt"); // to check if token is valid or not

exports.signup = (req, res) => {
  //check user already exist or not
  User.findOne({ email: req.body.email }).exec((err, user) => {
    // if user already exist
    if (user) {
      return res.status(400).json({ error: "Email already exist" });
    }

    // eles create new user
    const { name, email, password } = req.body;
    let username = shortId.generate();
    let profile = `${process.env.CLIENT_URL}/profile/${username}`;
    let newUser = new User({ name, email, password, profile, username });

    // save user to DB
    newUser.save((err, success) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json({
        //user: success,
        message: "Signup successful. Please Signin",
      });
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  // check if user exist
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res
        .status(404)
        .json({ error: "Email does not exist! Signup first!" });
    }

    //authenticate
    if (!user.authenticate(password)) {
      return res
        .status(404)
        .json({ error: "Email and password do not match!" });
    }

    // generate token and send to client
    // token will be valid till 1 day
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // store token in cookie for 1 day
    res.cookie("token", token, { expiresIn: "1d" });

    const { _id, username, name, email, role } = user;

    return res.json({
      token,
      user: { _id, username, name, email, role },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signout Success",
  });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});
