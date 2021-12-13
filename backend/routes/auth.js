// this file be used for authentication
const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  signout,
  requireSignin,
} = require("../controller/auth-path-controller");

// validators
const { runValidation } = require("../validator/index");
const {
  userSignupValidator,
  userSigninValidator,
} = require("../validator/auth-validator");

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/signin", userSigninValidator, runValidation, signin);
router.get("/signout", signout);

// just for test
router.get("/secret", requireSignin, (req, res) => {
  res.json({
    message: "Secret page",
  });
});

// export to "../server.js"
module.exports = router;
