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

    // const sessionId = uuidv4(); // state full
    // setUser(sessionId, user);  //state full

    const token = setUser(user);
    res.cookie("token", token);
    return res.redirect("/");

    // res.cookie("uid",token,
    //   //   {
    //   //   domain:'', // dot  means any subdomain access  without dot (.) is run on specific
    //   // }
    // )

    // return res.json({ token });

    // res.cookie('uid', sessionId);
  } catch (error) {
    console.error("Login error:", error);
    return res.render("login", { error: "An error occurred during login" });
  }
}

module.exports = { handleUserSignup, handleUserLogin };
