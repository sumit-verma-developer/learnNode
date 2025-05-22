const express = require("express");
const router = express.Router();
const { handleUserSignup } = require("../controllers/authuser");


router.post("/signup", handleUserSignup);


module.exports = router;