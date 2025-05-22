const Authuser = require("../models/authuser");

const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../services/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  const user = await Authuser.create({ name, email, password });
  // res.status(201).json(user)
  // res.render("home");
  return res.redirect("/user/login");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  
  try {
    const user = await Authuser.findOne({ email, password });
    console.log("Found user:", user);

    if (!user) {
      return res.render("login", { error: "Invalid email or password" });
    }

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie('uid', sessionId);
    return res.redirect("/static");
  } catch (error) {
    console.error("Login error:", error);
    return res.render("login", { error: "An error occurred during login" });
  }
}

module.exports = { handleUserSignup, handleUserLogin };
