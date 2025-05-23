const express = require("express");
const URL = require("../models/url");
const { restrictToLoggedinUserOnly } = require("../middlewares/auth");
const router = express.Router();

router.get("/", restrictToLoggedinUserOnly, async (req, res) => {
  const allurls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allurls,
    user: req.user
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
