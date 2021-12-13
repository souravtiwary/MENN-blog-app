const { check } = require("express-validator");

exports.userSignupValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Proper email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password shoud be atleast six character"),
];

exports.userSigninValidator = [
  check("email").isEmail().withMessage("Proper email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password shoud be atleast six character"),
];
