const express = require("express");
const router = express.Router();
const { handleUserSignup } = require("../controllers/authuser");

// GET routes
router.get("/", (req, res) => {
    return res.render("home");
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

// POST routes
router.post("/signup", handleUserSignup);

module.exports = router;