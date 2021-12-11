// contain all routes of application
const express = require("express");
const router = express.Router();
const { time } = require("../controller/blog-path-controller");

router.get("/", time);

module.exports = router;
