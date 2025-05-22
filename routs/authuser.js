const express = require("express");
const router = express.Router();
const { handleUserSignup, handleUserLogin } = require("../controllers/authuser");

// GET routes for rendering pages
router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.get("/login", (req, res) => {
    return res.render("login");
});

// POST routes for handling form submissions
router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);

module.exports = router;
