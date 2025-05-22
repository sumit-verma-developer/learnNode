const Authuser = require("../models/authuser");


async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    const user = await Authuser.create({ name, email, password });
    // res.status(201).json(user)
    // res.render("home");
   return res.redirect("/home");
}

module.exports = { handleUserSignup };